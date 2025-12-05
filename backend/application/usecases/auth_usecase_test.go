package usecases

import (
	"context"
	"testing"

	"github.com/project/backend/application/ports"
	"github.com/project/backend/domain/entities"
	"github.com/project/backend/domain/services"
)

// MockUserRepository for testing
type MockUserRepository struct {
	users map[string]*entities.User
}

func NewMockUserRepository() *MockUserRepository {
	return &MockUserRepository{
		users: make(map[string]*entities.User),
	}
}

func (m *MockUserRepository) Create(ctx context.Context, user *entities.User) (*entities.User, error) {
	user.ID = "test-user-id"
	// Store a copy to prevent mutations from affecting stored data
	storedUser := *user
	m.users[user.Email] = &storedUser
	m.users[user.ID] = &storedUser
	return user, nil
}

func (m *MockUserRepository) GetByID(ctx context.Context, id string) (*entities.User, error) {
	if user, ok := m.users[id]; ok {
		return user, nil
	}
	return nil, entities.ErrUserNotFound
}

func (m *MockUserRepository) GetByEmail(ctx context.Context, email string) (*entities.User, error) {
	if user, ok := m.users[email]; ok {
		return user, nil
	}
	return nil, entities.ErrUserNotFound
}

func (m *MockUserRepository) Update(ctx context.Context, user *entities.User) (*entities.User, error) {
	m.users[user.ID] = user
	m.users[user.Email] = user
	return user, nil
}

func (m *MockUserRepository) Delete(ctx context.Context, id string) error {
	delete(m.users, id)
	return nil
}

func (m *MockUserRepository) List(ctx context.Context, limit, offset int) ([]*entities.User, int, error) {
	var users []*entities.User
	for _, u := range m.users {
		users = append(users, u)
	}
	return users, len(users), nil
}

func TestAuthUseCase_Register(t *testing.T) {
	repo := NewMockUserRepository()
	authService := services.NewAuthService("test-secret-key-at-least-32-chars!")
	useCase := NewAuthUseCase(repo, authService)

	ctx := context.Background()

	result, err := useCase.Register(ctx, ports.RegisterInput{
		Email:    "test@example.com",
		Name:     "Test User",
		Password: "securePassword123",
	})

	if err != nil {
		t.Fatalf("Register failed: %v", err)
	}

	if result.User == nil {
		t.Fatal("User should not be nil")
	}

	if result.User.Email != "test@example.com" {
		t.Errorf("Expected email 'test@example.com', got '%s'", result.User.Email)
	}

	if result.User.Password != "" {
		t.Error("Password should be cleared from response")
	}

	if result.AccessToken == "" {
		t.Error("AccessToken should not be empty")
	}

	if result.RefreshToken == "" {
		t.Error("RefreshToken should not be empty")
	}
}

func TestAuthUseCase_Register_DuplicateEmail(t *testing.T) {
	repo := NewMockUserRepository()
	authService := services.NewAuthService("test-secret-key-at-least-32-chars!")
	useCase := NewAuthUseCase(repo, authService)

	ctx := context.Background()

	// First registration
	_, err := useCase.Register(ctx, ports.RegisterInput{
		Email:    "test@example.com",
		Name:     "Test User",
		Password: "securePassword123",
	})
	if err != nil {
		t.Fatalf("First register failed: %v", err)
	}

	// Duplicate registration should fail
	_, err = useCase.Register(ctx, ports.RegisterInput{
		Email:    "test@example.com",
		Name:     "Another User",
		Password: "anotherPassword123",
	})

	if err != ErrUserAlreadyExists {
		t.Errorf("Expected ErrUserAlreadyExists, got %v", err)
	}
}

func TestAuthUseCase_Login(t *testing.T) {
	repo := NewMockUserRepository()
	authService := services.NewAuthService("test-secret-key-at-least-32-chars!")
	useCase := NewAuthUseCase(repo, authService)

	ctx := context.Background()
	password := "securePassword123"

	// Register first
	_, err := useCase.Register(ctx, ports.RegisterInput{
		Email:    "test@example.com",
		Name:     "Test User",
		Password: password,
	})
	if err != nil {
		t.Fatalf("Register failed: %v", err)
	}

	// Login
	result, err := useCase.Login(ctx, ports.LoginInput{
		Email:    "test@example.com",
		Password: password,
	})

	if err != nil {
		t.Fatalf("Login failed: %v", err)
	}

	if result.User == nil {
		t.Fatal("User should not be nil")
	}

	if result.AccessToken == "" {
		t.Error("AccessToken should not be empty")
	}
}

func TestAuthUseCase_Login_WrongPassword(t *testing.T) {
	repo := NewMockUserRepository()
	authService := services.NewAuthService("test-secret-key-at-least-32-chars!")
	useCase := NewAuthUseCase(repo, authService)

	ctx := context.Background()

	// Register first
	_, err := useCase.Register(ctx, ports.RegisterInput{
		Email:    "test@example.com",
		Name:     "Test User",
		Password: "correctPassword123",
	})
	if err != nil {
		t.Fatalf("Register failed: %v", err)
	}

	// Login with wrong password
	_, err = useCase.Login(ctx, ports.LoginInput{
		Email:    "test@example.com",
		Password: "wrongPassword123",
	})

	if err != ErrInvalidLogin {
		t.Errorf("Expected ErrInvalidLogin, got %v", err)
	}
}

func TestAuthUseCase_Login_NonExistentUser(t *testing.T) {
	repo := NewMockUserRepository()
	authService := services.NewAuthService("test-secret-key-at-least-32-chars!")
	useCase := NewAuthUseCase(repo, authService)

	ctx := context.Background()

	_, err := useCase.Login(ctx, ports.LoginInput{
		Email:    "nonexistent@example.com",
		Password: "anyPassword123",
	})

	if err != ErrInvalidLogin {
		t.Errorf("Expected ErrInvalidLogin, got %v", err)
	}
}

func TestAuthUseCase_RefreshToken(t *testing.T) {
	repo := NewMockUserRepository()
	authService := services.NewAuthService("test-secret-key-at-least-32-chars!")
	useCase := NewAuthUseCase(repo, authService)

	ctx := context.Background()

	// Register first
	registerResult, err := useCase.Register(ctx, ports.RegisterInput{
		Email:    "test@example.com",
		Name:     "Test User",
		Password: "securePassword123",
	})
	if err != nil {
		t.Fatalf("Register failed: %v", err)
	}

	// Refresh token
	result, err := useCase.RefreshToken(ctx, registerResult.RefreshToken)
	if err != nil {
		t.Fatalf("RefreshToken failed: %v", err)
	}

	if result.AccessToken == "" {
		t.Error("AccessToken should not be empty")
	}

	if result.AccessToken == registerResult.AccessToken {
		t.Error("New AccessToken should be different from original")
	}
}
