import os


class WorkerSettings:
    # Read Redis host/port from environment so containers can reference the `redis` service.
    redis_settings = {"host": os.environ.get("REDIS_HOST", "redis"), "port": int(os.environ.get("REDIS_PORT", 6379))}

    # functions to expose to the worker
    functions = [
        "app.workers.tasks.audit_payments",
        "app.workers.tasks.finalize_auctions",
    ]

    # schedule periodic jobs (run audit_payments every 5 minutes)
    cron_jobs = [
        ("*/5 * * * *", "app.workers.tasks.audit_payments"),
    ]
