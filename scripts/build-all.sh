#!/bin/bash
# build-all.sh - Build all services for production

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Building all services..."

cd "$PROJECT_ROOT"

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build shared packages
echo "Building design-tokens..."
pnpm --filter @repo/design-tokens build

echo "Building shared utilities..."
pnpm --filter @repo/shared build

echo "Building playbook..."
pnpm --filter @repo/playbook build

# Build frontend
echo "Building frontend..."
pnpm --filter @repo/frontend build

# Build backend
echo "Building backend..."
cd "$PROJECT_ROOT/backend"
go build -o bin/api ./cmd/api

echo ""
echo "Build complete!"
echo "  Backend binary: backend/bin/api"
echo "  Frontend dist:  frontend/dist/"
