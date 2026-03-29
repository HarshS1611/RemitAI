# RemitAI — Cross-Border Remittance API

A FastAPI backend for cross-border money transfers with JWT auth, role-based access control, idempotent transactions, and Gemini-powered fraud detection.

---

## Features

- **JWT Authentication** — token-based auth with `python-jose`, issued on login
- **RBAC** — role-based access control (`admin`, `retail`) enforced per route
- **Idempotent Transactions** — duplicate payment requests are safely deduplicated via idempotency keys
- **AI Fraud Detection** — Gemini 1.5 Flash scores every transaction for risk before it is saved
- **Async PostgreSQL** — async SQLAlchemy with `asyncpg` driver
- **Dockerized Database** — PostgreSQL runs via Docker Compose
- **Test Suite** — 11 pytest tests with async fixtures and mock patching

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI |
| Database | PostgreSQL (Docker) |
| ORM | SQLAlchemy (async) + asyncpg |
| Auth | JWT via python-jose |
| AI | Google Gemini 1.5 Flash |
| Testing | pytest + pytest-asyncio + httpx |
| Containerisation | Docker + Docker Compose |

---

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app, routes, JWT helpers
│   ├── database.py          # Async engine, session, Base
│   ├── models.py            # SQLAlchemy models (Transaction)
│   ├── schemas.py           # Pydantic schemas
│   ├── middleware.py        # Request logging middleware
│   └── services/
│       ├── transaction_service.py   # DB transaction logic
│       └── ai_service.py            # Gemini anomaly detection
├── tests/
│   └── test_main.py         # Full test suite
├── docker-compose.yml       # PostgreSQL container
├── Dockerfile               # App container
├── requirements.txt
└── .env.example
```

---

## Quickstart

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/remitai.git
cd remitai/backend
```

### 2. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=postgresql://remitai:remitai@localhost:5432/remitai
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the database

```bash
docker compose up -d
```

### 5. Run the API

```bash
uvicorn app.main:app --reload
```

API is now running at `http://localhost:8000`  
Docs at `http://localhost:8000/docs`

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/login` | None | Get a JWT token |
| POST | `/transactions` | Required | Create a transaction (with AI risk check) |
| GET | `/transactions` | Required | List your transactions |
| GET | `/admin-data` | Admin only | Admin protected route |

### Example: Login

```bash
curl -X POST http://localhost:8000/login
```

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiJ9...",
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Example: Create Transaction

```bash
curl -X POST http://localhost:8000/transactions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "idempotency-key: unique-key-123" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "500.00",
    "currency": "USD",
    "recipient_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }'
```

```json
{
  "transaction": {
    "id": "557d6e96-0f08-4f4b-833a-d92b0ffefc9e",
    "amount": 500.0,
    "currency": "USD",
    "status": "pending"
  },
  "risk_analysis": {
    "risk_score": 0.2,
    "reason": "Normal transaction"
  }
}
```

---

## How the AI Fraud Detection Works

Every transaction goes through a Gemini risk check **before** being saved to the database.

```
POST /transactions
      │
      ▼
 detect_anomaly()          ← Gemini 1.5 Flash
      │
      ├── risk_score < 0.5 → save transaction → return response
      │
      └── risk_score ≥ 0.5 → flag in response (still saved as pending)
```

If the Gemini API is unavailable, a rule-based fallback triggers automatically:
- Transactions over $10,000 → `risk_score: 0.7`
- All others → `risk_score: 0.2`

---

## Running Tests

```bash
pytest app/tests/test_main.py -v
```

Expected output:

```
PASSED  test_login_returns_token
PASSED  test_login_generates_unique_user_ids
PASSED  test_missing_token_returns_401
PASSED  test_invalid_token_returns_401
PASSED  test_wrong_role_returns_403
PASSED  test_admin_role_granted
PASSED  test_create_transaction_success
PASSED  test_create_transaction_missing_idempotency_key
PASSED  test_idempotency_returns_cached_response
PASSED  test_high_risk_transaction_flagged
PASSED  test_list_transactions_filters_by_user

11 passed in ~1s
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `GEMINI_API_KEY` | Google Gemini API key |

---

## Design Decisions

**Idempotency keys** — Payment APIs must handle duplicate requests (network retries, double-clicks). Each `POST /transactions` requires a client-supplied `idempotency-key` header. Duplicate keys return the cached response without hitting the database.

**AI as advisory** — The fraud detection score is returned in the response but does not block the transaction. This keeps latency predictable and lets downstream systems act on the risk score.

**Async SQLAlchemy** — All DB operations use `async/await` with `asyncpg` to keep the event loop non-blocking under concurrent load.