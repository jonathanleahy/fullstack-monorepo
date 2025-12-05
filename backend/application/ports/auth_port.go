package ports

import (
	"context"

	"github.com/project/backend/domain/entities"
)

// RegisterInput represents the input for user registration
type RegisterInput struct {
	Email    string
	Name     string
	Password string
}

// LoginInput represents the input for user login
type LoginInput struct {
	Email    string
	Password string
}

// AuthResult represents the result of auth operations
type AuthResult struct {
	User         *entities.User
	AccessToken  string
	RefreshToken string
}

// AuthPort defines the interface for authentication use cases
type AuthPort interface {
	// Register creates a new user account
	Register(ctx context.Context, input RegisterInput) (*AuthResult, error)

	// Login authenticates a user
	Login(ctx context.Context, input LoginInput) (*AuthResult, error)

	// RefreshToken generates new tokens from a refresh token
	RefreshToken(ctx context.Context, refreshToken string) (*AuthResult, error)

	// GetCurrentUser returns the authenticated user
	GetCurrentUser(ctx context.Context, userID string) (*entities.User, error)
}
