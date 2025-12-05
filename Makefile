# Makefile for fullstack monorepo

.PHONY: dev test lint build clean install help

# Default target
help:
	@echo "Available targets:"
	@echo "  make dev        - Start development environment with hot reload"
	@echo "  make stop       - Stop development environment"
	@echo "  make test       - Run all tests"
	@echo "  make lint       - Run all linters"
	@echo "  make build      - Build all services"
	@echo "  make clean      - Clean build artifacts"
	@echo "  make install    - Install all dependencies"
	@echo "  make precommit  - Run pre-commit checks"
	@echo "  make storybook  - Start Storybook"
	@echo "  make codegen    - Generate GraphQL types"

# Development
dev:
	./scripts/dev-all.sh

stop:
	./scripts/stop-all.sh

# Install dependencies
install:
	pnpm install
	cd backend && go mod download

# Testing
test:
	pnpm -r test
	cd backend && go test ./...

test-frontend:
	pnpm --filter @repo/frontend test

test-backend:
	cd backend && go test ./...

# Linting
lint:
	pnpm -r lint
	@if command -v golangci-lint >/dev/null 2>&1; then \
		cd backend && golangci-lint run; \
	else \
		echo "golangci-lint not installed, skipping backend linting"; \
	fi

lint-frontend:
	pnpm --filter @repo/frontend lint

lint-backend:
	cd backend && golangci-lint run

# Building
build:
	./scripts/build-all.sh

build-frontend:
	pnpm --filter @repo/design-tokens build
	pnpm --filter @repo/shared build
	pnpm --filter @repo/playbook build
	pnpm --filter @repo/frontend build

build-backend:
	cd backend && go build -o bin/api ./cmd/api

# GraphQL
codegen:
	pnpm --filter @repo/frontend codegen

gqlgen:
	cd backend/adapters/graphql && go run github.com/99designs/gqlgen generate

# Storybook
storybook:
	pnpm --filter @repo/playbook storybook

build-storybook:
	pnpm --filter @repo/playbook build-storybook

# Pre-commit
precommit:
	./scripts/precommit-check.sh

# Cleaning
clean:
	rm -rf node_modules
	rm -rf frontend/node_modules frontend/dist
	rm -rf playbook/node_modules playbook/dist playbook/storybook-static
	rm -rf design-tokens/node_modules design-tokens/dist
	rm -rf shared/node_modules shared/dist
	rm -rf backend/bin backend/tmp
	cd infra && docker-compose down -v --rmi local

# Docker
docker-up:
	cd infra && docker-compose up --build

docker-down:
	cd infra && docker-compose down

docker-logs:
	cd infra && docker-compose logs -f
