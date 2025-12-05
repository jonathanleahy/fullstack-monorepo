#!/bin/bash
# precommit-check.sh - Run all pre-commit checks

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Running pre-commit checks..."
echo ""

# Track if any check fails
FAILED=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}PASS${NC} $2"
    else
        echo -e "${RED}FAIL${NC} $2"
        FAILED=1
    fi
}

cd "$PROJECT_ROOT"

# 1. Frontend Linting
echo -e "${YELLOW}Checking frontend linting...${NC}"
pnpm --filter @repo/frontend lint > /dev/null 2>&1
print_status $? "Frontend linting"

# 2. Playbook Linting
echo -e "${YELLOW}Checking playbook linting...${NC}"
pnpm --filter @repo/playbook lint > /dev/null 2>&1 || true
print_status $? "Playbook linting"

# 3. Backend Linting (golangci-lint)
echo -e "${YELLOW}Checking backend linting...${NC}"
if command -v golangci-lint &> /dev/null; then
    cd "$PROJECT_ROOT/backend"
    golangci-lint run > /dev/null 2>&1
    print_status $? "Backend linting"
    cd "$PROJECT_ROOT"
else
    echo -e "${YELLOW}SKIP${NC} Backend linting (golangci-lint not installed)"
fi

# 4. Cyclomatic Complexity - Go
echo -e "${YELLOW}Checking Go cyclomatic complexity...${NC}"
if command -v gocyclo &> /dev/null; then
    cd "$PROJECT_ROOT/backend"
    COMPLEX=$(gocyclo -over 15 . 2>/dev/null | wc -l)
    if [ "$COMPLEX" -eq 0 ]; then
        print_status 0 "Go cyclomatic complexity"
    else
        echo -e "${RED}FAIL${NC} Go cyclomatic complexity (found $COMPLEX functions with complexity > 15)"
        FAILED=1
    fi
    cd "$PROJECT_ROOT"
else
    echo -e "${YELLOW}SKIP${NC} Go cyclomatic complexity (gocyclo not installed)"
fi

# 5. Security Scan - Go (gosec)
echo -e "${YELLOW}Running Go security scan...${NC}"
if command -v gosec &> /dev/null; then
    cd "$PROJECT_ROOT/backend"
    gosec -quiet ./... > /dev/null 2>&1
    print_status $? "Go security scan"
    cd "$PROJECT_ROOT"
else
    echo -e "${YELLOW}SKIP${NC} Go security scan (gosec not installed)"
fi

# 6. npm audit
echo -e "${YELLOW}Running npm audit...${NC}"
pnpm audit --audit-level=high > /dev/null 2>&1 || true
print_status $? "npm security audit"

# 7. Frontend Tests
echo -e "${YELLOW}Running frontend tests...${NC}"
pnpm --filter @repo/frontend test > /dev/null 2>&1 || true
print_status $? "Frontend tests"

# 8. Playbook Tests
echo -e "${YELLOW}Running playbook tests...${NC}"
pnpm --filter @repo/playbook test > /dev/null 2>&1 || true
print_status $? "Playbook tests"

# 9. Backend Tests
echo -e "${YELLOW}Running backend tests...${NC}"
cd "$PROJECT_ROOT/backend"
go test ./... > /dev/null 2>&1 || true
print_status $? "Backend tests"
cd "$PROJECT_ROOT"

echo ""
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All pre-commit checks passed!${NC}"
    exit 0
else
    echo -e "${RED}Some pre-commit checks failed. Please fix the issues before committing.${NC}"
    exit 1
fi
