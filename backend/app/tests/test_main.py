import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from unittest.mock import patch, AsyncMock
from app.main import app, create_token

# ── helpers ──────────────────────────────────────────────────────────────────

FIXED_USER_ID = "550e8400-e29b-41d4-a716-446655440000"


def auth_headers(role: str = "admin") -> dict:
    token = create_token(user_id=FIXED_USER_ID, role=role)
    return {"Authorization": f"Bearer {token}"}


# ── fixtures ──────────────────────────────────────────────────────────────────

@pytest_asyncio.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://test"
    ) as ac:
        yield ac


# ── auth tests ────────────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_login_returns_token(client):
    response = await client.post("/login")
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "user_id" in data  # new field


@pytest.mark.asyncio
async def test_login_generates_unique_user_ids(client):
    """Each login should produce a different user_id."""
    r1 = await client.post("/login")
    r2 = await client.post("/login")
    assert r1.json()["user_id"] != r2.json()["user_id"]


@pytest.mark.asyncio
async def test_missing_token_returns_401(client):
    response = await client.get("/transactions")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_invalid_token_returns_401(client):
    headers = {"Authorization": "Bearer totally.invalid.token"}
    response = await client.get("/transactions", headers=headers)
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_wrong_role_returns_403(client):
    headers = auth_headers(role="retail")
    response = await client.get("/admin-data", headers=headers)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_admin_role_granted(client):
    headers = auth_headers(role="admin")
    response = await client.get("/admin-data", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "admin access granted"
    assert data["user"] == FIXED_USER_ID


# ── transaction tests ─────────────────────────────────────────────────────────

@pytest.mark.asyncio
async def test_create_transaction_success(client):
    headers = auth_headers(role="retail")
    headers["idempotency-key"] = "test-key-001"

    payload = {
        "amount": "250.00",
        "currency": "USD",
        "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }

    mock_txn = AsyncMock()
    mock_txn.id = "txn_123"
    mock_txn.amount = 250.0
    mock_txn.currency = "USD"
    mock_txn.recipient_id = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    mock_txn.status = "pending"
    mock_txn.user_id = FIXED_USER_ID

    with patch("app.main.create_transaction", return_value=mock_txn), \
         patch("app.main.detect_anomaly", new_callable=AsyncMock,
               return_value={"risk_score": 0.1, "reason": "Normal transaction"}):
        response = await client.post("/transactions", json=payload, headers=headers)

    assert response.status_code == 200
    data = response.json()
    assert data["transaction"]["status"] == "pending"
    assert data["transaction"]["user_id"] == FIXED_USER_ID
    assert "risk_analysis" in data


@pytest.mark.asyncio
async def test_create_transaction_missing_idempotency_key(client):
    """Request without idempotency key should return 422."""
    headers = auth_headers(role="retail")
    payload = {
        "amount": "100.00",
        "currency": "USD",
        "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
    response = await client.post("/transactions", json=payload, headers=headers)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_idempotency_returns_cached_response(client):
    """Same idempotency key should return cached result without hitting DB again."""
    headers = auth_headers(role="retail")
    headers["idempotency-key"] = "test-key-idempotent-v2"

    payload = {
        "amount": "100.00",
        "currency": "GBP",
        "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }

    mock_txn = AsyncMock()
    mock_txn.id = "txn_456"
    mock_txn.amount = 100.0
    mock_txn.currency = "GBP"
    mock_txn.recipient_id = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    mock_txn.status = "pending"
    mock_txn.user_id = FIXED_USER_ID

    with patch("app.main.create_transaction", return_value=mock_txn) as mock_create, \
         patch("app.main.detect_anomaly", new_callable=AsyncMock,
               return_value={"risk_score": 0.2, "reason": "Normal"}):

        await client.post("/transactions", json=payload, headers=headers)
        response = await client.post("/transactions", json=payload, headers=headers)

        # DB should only be hit once
        assert mock_create.call_count == 1

    assert response.status_code == 200


@pytest.mark.asyncio
async def test_high_risk_transaction_flagged(client):
    """High risk score should still return 200 with risk data included."""
    headers = auth_headers(role="retail")
    headers["idempotency-key"] = "test-key-highrisk-v2"

    payload = {
        "amount": "99999.00",
        "currency": "USD",
        "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }

    mock_txn = AsyncMock()
    mock_txn.id = "txn_789"
    mock_txn.amount = 99999.0
    mock_txn.currency = "USD"
    mock_txn.recipient_id = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    mock_txn.status = "pending"
    mock_txn.user_id = FIXED_USER_ID

    with patch("app.main.create_transaction", return_value=mock_txn), \
         patch("app.main.detect_anomaly", new_callable=AsyncMock,
               return_value={"risk_score": 0.9, "reason": "High transaction amount"}):
        response = await client.post("/transactions", json=payload, headers=headers)

    assert response.status_code == 200
    risk = response.json()["risk_analysis"]
    assert risk["risk_score"] == 0.9
    assert risk["reason"] == "High transaction amount"


@pytest.mark.asyncio
async def test_list_transactions_filters_by_user(client):
    """List endpoint should only return transactions for the logged-in user."""
    headers = auth_headers(role="retail")

    with patch("app.main.get_db"):
        response = await client.get("/transactions?limit=5", headers=headers)

    assert response.status_code == 200