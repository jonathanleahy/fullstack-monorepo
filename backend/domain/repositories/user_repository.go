package repositories

import (
	"context"

	"github.com/project/backend/domain/entities"
)

// UserRepository defines the interface for user data access
type UserRepository interface {
	// Create stores a new user and returns the created user with ID
	Create(ctx context.Context, user *entities.User) (*entities.User, error)

	// GetByID retrieves a user by their ID
	GetByID(ctx context.Context, id string) (*entities.User, error)

	// GetByEmail retrieves a user by their email
	GetByEmail(ctx context.Context, email string) (*entities.User, error)

	// Update modifies an existing user
	Update(ctx context.Context, user *entities.User) (*entities.User, error)

	// Delete removes a user by ID
	Delete(ctx context.Context, id string) error

	// List retrieves all users with pagination
	List(ctx context.Context, limit, offset int) ([]*entities.User, int, error)
}
