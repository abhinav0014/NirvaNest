NirvaNest Backend

This folder contains the FastAPI backend scaffold for the NirvaNest project.

Quick start (development):

1. Create a `.env` from `.env.example` and set `DATABASE_URL`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run the app: `uvicorn app.main:app --reload --port 8000 --app-dir backend`

Database migrations
-------------------
This project uses Alembic for migrations. To create and apply migrations:

1. Install alembic: `pip install alembic`
2. From repository root run (from the `backend` folder):

```bash
alembic -c alembic.ini revision --autogenerate -m "create initial tables"
alembic -c alembic.ini upgrade head
```

Or run the quick-create script for development:

```bash
python backend/scripts/create_db.py
```

Payments
--------
This scaffold includes payment stubs and webhook handlers for development. Providers are stubbed in `app/services/payment_provider.py`.

Important rules implemented:
- Webhook-only state changes: frontend callbacks are ignored; only server-side webhooks update payment state.
- Payments are idempotent and webhook handling is defensive.
- Orders are locked while payment is pending to avoid race conditions.

Webhook testing
---------------
To simulate a payment provider webhook against the local server, send a `POST` with the following shape to `/api/v1/payments/webhook`:

```bash
curl -X POST http://localhost:8000/api/v1/payments/webhook \
	-H "Content-Type: application/json" \
	-d '{"provider":"esewa", "provider_payment_id":"esewa_...", "status":"paid", "amount":1000, "currency":"NPR"}'
```

The webhook handler is defensive and idempotent: unknown payments are ignored and repeated notifications are safe.

To reconcile stuck payments manually, run the worker or call the `audit_payments` task via ARQ; the worker will also run this periodically.


Workers
-------
Background jobs use `arq` with Redis. A simple worker scaffold is provided at `app/workers/worker.py` with task implementations in `app/workers/tasks.py`.

Run a worker locally (from repo root):

```bash
pip install arq redis
# then
arq worker backend.app.workers.worker.WorkerSettings
```

The worker runs `audit_payments` periodically and exposes `finalize_auctions` for auction finalization.



