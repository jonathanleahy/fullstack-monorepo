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
docker-compose up --build -d

# Show logs
echo ""
echo "Services started successfully!"
echo ""
echo "  Backend:    http://localhost:8082"
echo "  GraphQL:    http://localhost:8082/graphql"
echo "  Frontend:   http://localhost:3001"
echo ""
echo "To view logs: docker-compose -f infra/docker-compose.yml logs -f"
echo "To stop:      ./scripts/stop-all.sh"
echo ""

# Follow logs
docker-compose logs -f
