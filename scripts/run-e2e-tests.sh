#!/bin/bash
# run-e2e-tests.sh - Run E2E tests with clean environment
#
# This script ensures a clean test environment by:
# 1. Killing any existing processes on test ports
# 2. Running Playwright tests (which starts backend and frontend automatically)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Preparing E2E test environment...${NC}"

# Kill any processes on test ports
echo "Cleaning up ports 8082 and 3001..."
lsof -ti:8082 | xargs -r kill -9 2>/dev/null || true
lsof -ti:3001 | xargs -r kill -9 2>/dev/null || true
sleep 1

# Navigate to frontend and run tests
cd "$PROJECT_ROOT/frontend"

echo -e "${YELLOW}Running Playwright E2E tests...${NC}"
echo ""

# Run tests (Playwright will start backend and frontend automatically via webServer config)
if pnpm test:e2e "$@"; then
    echo ""
    echo -e "${GREEN}All E2E tests passed!${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}Some E2E tests failed. Check the output above for details.${NC}"
    echo -e "Run with --ui for interactive debugging: pnpm test:e2e:ui"
    exit 1
fi
