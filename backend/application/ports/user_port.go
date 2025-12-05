package ports

import (
	"context"

	"github.com/project/backend/domain/entities"
)

// CreateUserInput represents the input for creating a user
type CreateUserInput struct {
	Email    string
	Name     string
	Password string
}

// UpdateUserInput represents the input for updating a user
type UpdateUserInput struct {
	Name  *string
	Email *string
}

// PaginationInput represents pagination parameters
type PaginationInput struct {
	Page  int
	Limit int
}

// UserListOutput represents a paginated list of users
type UserListOutput struct {
	Users   []*entities.User
	Total   int
	Page    int
	Limit   int
	HasMore bool
}

// UserPort defines the interface for user use cases
type UserPort interface {
	// CreateUser creates a new user
	CreateUser(ctx context.Context, input CreateUserInput) (*entities.User, error)

	// GetUser retrieves a user by ID
	GetUser(ctx context.Context, id string) (*entities.User, error)

	// UpdateUser updates an existing user
	UpdateUser(ctx context.Context, id string, input UpdateUserInput) (*entities.User, error)

	// DeleteUser removes a user
	DeleteUser(ctx context.Context, id string) error

	// ListUsers retrieves users with pagination
	ListUsers(ctx context.Context, pagination PaginationInput) (*UserListOutput, error)
}
