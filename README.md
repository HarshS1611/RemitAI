
# RemitAI

AI-powered remittance dashboard demonstrating modern full stack fintech architecture.

RemitAI simulates a cross-border payments system where transactions are validated, risk-scored using an LLM, and stored securely in PostgreSQL.

Built as an interview-ready project to showcase backend architecture, async APIs, and AI integration into real workflows.

---

# Demo

Landing page → Dashboard → Send transfer → AI risk evaluation → Transaction stored → Analytics updated

---

# Key Features

### Full Stack Architecture
Production-style project structure with clear separation of concerns.

### AI Fraud Detection
Transactions are evaluated using Gemini LLM before execution.

### JWT Authentication
Stateless authentication with role-based access control.

### Idempotent Payment API
Duplicate transaction requests are safely handled using idempotency keys.

### Async Backend
FastAPI + Async SQLAlchemy ensures scalable request handling.

### Transaction Analytics Dashboard
Visualize transaction volume and metrics using charts.

### Neon PostgreSQL
Serverless Postgres database for persistent storage.

---

# Tech Stack

## Frontend

React (Vite)
TypeScript
TailwindCSS v4
shadcn/ui
Recharts
Geist Font

## Backend

FastAPI
Async SQLAlchemy
PostgreSQL (Neon)
Pydantic validation
JWT authentication

## AI Integration

Google Gemini API
LLM-based anomaly detection
risk scoring before transaction execution

---

# Architecture Diagram

```

Browser (React + Vite + shadcn UI)
│
│ HTTPS API requests
▼
FastAPI Backend
│
├── JWT Authentication Middleware
│
├── Transaction Service Layer
│
├── AI Risk Evaluation (Gemini)
│
└── Async SQLAlchemy ORM
│
▼
PostgreSQL (Neon DB)

```

---

# Request Flow

```

User sends transfer request
↓
JWT token validated
↓
Idempotency key checked
↓
AI risk scoring executed
↓
Transaction saved in DB
↓
Response returned with risk analysis
↓
Dashboard updates analytics

```

---

# Project Structure

```

frontend
src/
api/client.ts
components/
pages/
App.tsx

backend
app/
main.py
database.py
models.py
schemas.py

services/
transaction_service.py
ai_service.py

middleware/
logging.py

```

---

# API Endpoints

## POST /login

returns JWT token

response:

```

{
"access_token": "jwt_token"
}

```

---

## POST /transactions

creates a new transfer

headers:

Authorization: Bearer token

idempotency-key: unique_key

request:

```

{
"recipient_id": "uuid",
"amount": 500,
"currency": "USD"
}

```

response:

```

{
"transaction": {
"id": "uuid",
"status": "pending"
},
"risk_analysis": {
"risk_score": 0.12,
"reason": "Normal transaction"
}
}

```

---

## GET /transactions

returns transactions for authenticated user

---

## GET /admin-data

admin protected route

---

# Local Setup

## 1. Clone repo

```

git clone https://github.com/yourusername/remitai

cd remitai

```

---

## 2. Backend setup

```

cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload

```

Run postgreSQL from docker 
```
docker compose up -d
```

backend runs on:

http://127.0.0.1:8000

---

## 3. Frontend setup

```

cd frontend

npm install

npm run dev

```

frontend runs on:

http://localhost:5173

---

# Environment Variables

## frontend .env

```

VITE_API_URL=http://127.0.0.1:8000

```

## backend .env

```

DATABASE_URL=DATABASE_URL=postgresql+asyncpg://remitai:remitai@localhost:5432/remitai

GEMINI_API_KEY=...

SECRET_KEY=your_secret

```

---

# Engineering Concepts Demonstrated

layered backend architecture

async database operations

JWT based authentication

idempotent API design

LLM integration into business logic

separation of concerns

type-safe schema validation

RESTful API design

frontend API client pattern

state persistence via localStorage

---

# Future Improvements

OAuth login integration

webhook retry system

background job queue

Redis idempotency store

multi-currency FX conversion

fraud rules engine

observability (logging + tracing)

Docker deployment

CI/CD pipeline

rate limiting




