#!/bin/bash
# dev-all.sh - Start all services in development mode with hot reload

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Starting development environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Navigate to project root
cd "$PROJECT_ROOT"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    pnpm install
fi

# Build shared packages first
echo "Building shared packages..."
pnpm --filter @repo/design-tokens build
pnpm --filter @repo/shared build

# Start Docker services
echo "Starting Docker services..."
cd "$PROJECT_ROOT/infra"
docker compose up --build -d

# Wait for services to be healthy
echo ""
echo "Waiting for services to be healthy..."

# Wait for backend health (max 60 seconds)
BACKEND_HEALTHY=false
for i in {1..60}; do
    if curl -s http://localhost:8082/health > /dev/null 2>&1; then
        BACKEND_HEALTHY=true
        echo "✓ Backend is healthy"
        break
    fi
    echo -n "."
    sleep 1
done

if [ "$BACKEND_HEALTHY" = false ]; then
    echo ""
    echo "✗ Backend failed to become healthy within 60 seconds"
    echo "Check logs with: docker compose logs backend"
    exit 1
fi

# Wait for frontend (max 30 seconds)
FRONTEND_HEALTHY=false
for i in {1..30}; do
    if curl -s http://localhost:3001 > /dev/null 2>&1; then
        FRONTEND_HEALTHY=true
        echo "✓ Frontend is healthy"
        break
    fi
    echo -n "."
    sleep 1
done

if [ "$FRONTEND_HEALTHY" = false ]; then
    echo ""
    echo "✗ Frontend failed to become healthy within 30 seconds"
    echo "Check logs with: docker compose logs frontend"
    exit 1
fi

# Show success message
echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✓ All services started successfully!"
echo "═══════════════════════════════════════════════════"
echo ""
echo "  Backend:    http://localhost:8082"
echo "  GraphQL:    http://localhost:8082/graphql"
echo "  Frontend:   http://localhost:3001"
echo ""
echo "  Commands:"
echo "    View logs:  docker compose -f infra/docker-compose.yml logs -f"
echo "    Stop:       ./scripts/stop-all.sh"
echo ""

# Follow logs
docker compose logs -f
