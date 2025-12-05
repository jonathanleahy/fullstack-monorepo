#!/bin/bash
# stop-all.sh - Stop all development services

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Stopping development services..."

# Stop Docker containers
cd "$PROJECT_ROOT/infra"
docker compose down 2>/dev/null || true

# Kill any processes using the development ports
echo "Cleaning up ports..."
lsof -ti:8082 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Kill any lingering Go processes from dev
pkill -9 -f "go run.*cmd/api" 2>/dev/null || true
pkill -9 -f "air" 2>/dev/null || true

echo "All services stopped."
