#!/bin/bash
# stop-all.sh - Stop all development services

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Stopping development services..."

cd "$PROJECT_ROOT/infra"
docker-compose down

echo "All services stopped."
