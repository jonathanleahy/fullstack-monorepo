#!/bin/bash
# test-docker.sh - Test Docker environment end-to-end
#
# This script tests that the Docker setup works correctly:
# 1. Starts all services via Docker
# 2. Verifies health checks pass
# 3. Tests that frontend can fetch data from backend (GraphQL)
# 4. Cleans up

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Testing Docker environment...${NC}"

cd "$PROJECT_ROOT"

# Stop any existing containers
echo "Stopping existing containers..."
cd "$PROJECT_ROOT/infra"
docker compose down 2>/dev/null || true

# Start services
echo "Starting Docker services..."
docker compose up --build -d

# Wait for backend health
echo -n "Waiting for backend..."
BACKEND_OK=false
for i in {1..60}; do
    if curl -s http://localhost:8082/health > /dev/null 2>&1; then
        BACKEND_OK=true
        echo -e " ${GREEN}OK${NC}"
        break
    fi
    echo -n "."
    sleep 1
done

if [ "$BACKEND_OK" = false ]; then
    echo -e " ${RED}FAILED${NC}"
    echo "Backend logs:"
    docker compose logs backend | tail -20
    exit 1
fi

# Wait for frontend
echo -n "Waiting for frontend..."
FRONTEND_OK=false
for i in {1..30}; do
    if curl -s http://localhost:3001 > /dev/null 2>&1; then
        FRONTEND_OK=true
        echo -e " ${GREEN}OK${NC}"
        break
    fi
    echo -n "."
    sleep 1
done

if [ "$FRONTEND_OK" = false ]; then
    echo -e " ${RED}FAILED${NC}"
    echo "Frontend logs:"
    docker compose logs frontend | tail -20
    exit 1
fi

# Test GraphQL endpoint from host
echo -n "Testing GraphQL endpoint..."
GRAPHQL_RESPONSE=$(curl -s http://localhost:8082/graphql \
    -H "Content-Type: application/json" \
    -d '{"query":"{ __typename }"}')

if echo "$GRAPHQL_RESPONSE" | grep -q '"data"'; then
    echo -e " ${GREEN}OK${NC}"
else
    echo -e " ${RED}FAILED${NC}"
    echo "Response: $GRAPHQL_RESPONSE"
    exit 1
fi

# Test that frontend can reach backend (check for CORS/network issues)
# This simulates what the browser does
echo -n "Testing frontend GraphQL connectivity..."

# Make a request that mimics what the browser would do
BROWSER_TEST=$(curl -s http://localhost:8082/graphql \
    -H "Content-Type: application/json" \
    -H "Origin: http://localhost:3001" \
    -d '{"query":"{ __typename }"}')

if echo "$BROWSER_TEST" | grep -q '"data"'; then
    echo -e " ${GREEN}OK${NC}"
else
    echo -e " ${RED}FAILED (CORS or connectivity issue)${NC}"
    echo "Response: $BROWSER_TEST"
    exit 1
fi

# All tests passed
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ Docker environment tests passed!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"

# Optionally keep containers running or stop them
if [ "$1" = "--keep" ]; then
    echo ""
    echo "Containers are still running. Stop with: ./scripts/stop-all.sh"
else
    echo ""
    echo "Stopping containers..."
    docker compose down
fi
