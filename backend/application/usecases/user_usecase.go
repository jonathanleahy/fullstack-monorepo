package usecases

import (
	"context"

	"github.com/project/backend/application/ports"
	"github.com/project/backend/domain/entities"
	"github.com/project/backend/domain/repositories"
)

// UserUseCase implements the UserPort interface
type UserUseCase struct {
	userRepo repositories.UserRepository
}

// NewUserUseCase creates a new UserUseCase
func NewUserUseCase(userRepo repositories.UserRepository) *UserUseCase {
	return &UserUseCase{
		userRepo: userRepo,
	}
}

// CreateUser creates a new user
func (uc *UserUseCase) CreateUser(ctx context.Context, input ports.CreateUserInput) (*entities.User, error) {
	// Check if email already exists
	existing, _ := uc.userRepo.GetByEmail(ctx, input.Email)
	if existing != nil {
		return nil, entities.ErrEmailExists
	}

	// Create user entity
	user, err := entities.NewUser(input.Email, input.Name, input.Password)
	if err != nil {
		return nil, err
	}

	// TODO: Hash password before storing
	// user.Password = hashPassword(input.Password)

	// Store user
	return uc.userRepo.Create(ctx, user)
}

// GetUser retrieves a user by ID
func (uc *UserUseCase) GetUser(ctx context.Context, id string) (*entities.User, error) {
	if id == "" {
		return nil, entities.ErrInvalidID
	}
	return uc.userRepo.GetByID(ctx, id)
}

// UpdateUser updates an existing user
func (uc *UserUseCase) UpdateUser(ctx context.Context, id string, input ports.UpdateUserInput) (*entities.User, error) {
	if id == "" {
		return nil, entities.ErrInvalidID
	}

	user, err := uc.userRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	// Apply updates
	name := ""
	email := ""
	if input.Name != nil {
		name = *input.Name
	}
	if input.Email != nil {
		email = *input.Email
	}

	if err := user.Update(name, email); err != nil {
		return nil, err
	}

	return uc.userRepo.Update(ctx, user)
}

// DeleteUser removes a user
func (uc *UserUseCase) DeleteUser(ctx context.Context, id string) error {
	if id == "" {
		return entities.ErrInvalidID
	}
	return uc.userRepo.Delete(ctx, id)
}

// ListUsers retrieves users with pagination
func (uc *UserUseCase) ListUsers(ctx context.Context, pagination ports.PaginationInput) (*ports.UserListOutput, error) {
	page := pagination.Page
	if page < 1 {
		page = 1
	}
	limit := pagination.Limit
	if limit < 1 || limit > 100 {
		limit = 20
	}
	offset := (page - 1) * limit

	users, total, err := uc.userRepo.List(ctx, limit, offset)
	if err != nil {
		return nil, err
	}

	return &ports.UserListOutput{
		Users:   users,
		Total:   total,
		Page:    page,
		Limit:   limit,
		HasMore: offset+len(users) < total,
	}, nil
}
