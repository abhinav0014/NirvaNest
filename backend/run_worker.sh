#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export PYTHONPATH=backend
export ARQ_SETTINGS=app.workers.worker.WorkerSettings
# log to backend/worker.log
mkdir -p backend/logs
nohup python3 -m arq.cli worker --verbose > backend/logs/worker.log 2>&1 &
echo $! > backend/worker.pid
echo "worker started, pid=$(cat backend/worker.pid), logs=backend/logs/worker.log"
