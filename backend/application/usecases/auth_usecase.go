package usecases

import (
	"context"
	"errors"

	"github.com/project/backend/application/ports"
	"github.com/project/backend/domain/entities"
	"github.com/project/backend/domain/repositories"
	"github.com/project/backend/domain/services"
)

var (
	ErrUserAlreadyExists = errors.New("user with this email already exists")
	ErrInvalidLogin      = errors.New("invalid email or password")
)

// AuthUseCase handles authentication operations
type AuthUseCase struct {
	userRepo    repositories.UserRepository
	authService *services.AuthService
}

// Ensure AuthUseCase implements AuthPort
var _ ports.AuthPort = (*AuthUseCase)(nil)

// NewAuthUseCase creates a new auth use case
func NewAuthUseCase(userRepo repositories.UserRepository, authService *services.AuthService) *AuthUseCase {
	return &AuthUseCase{
		userRepo:    userRepo,
		authService: authService,
	}
}

// Register creates a new user account
func (uc *AuthUseCase) Register(ctx context.Context, input ports.RegisterInput) (*ports.AuthResult, error) {
	// Check if email already exists
	existing, _ := uc.userRepo.GetByEmail(ctx, input.Email)
	if existing != nil {
		return nil, ErrUserAlreadyExists
	}

	// Hash password
	hashedPassword, err := uc.authService.HashPassword(input.Password)
	if err != nil {
		return nil, err
	}

	// Create user entity
	user, err := entities.NewUser(input.Email, input.Name, hashedPassword)
	if err != nil {
		return nil, err
	}

	// Store user
	user, err = uc.userRepo.Create(ctx, user)
	if err != nil {
		return nil, err
	}

	// Generate tokens
	tokens, err := uc.authService.GenerateTokenPair(user.ID, user.Email)
	if err != nil {
		return nil, err
	}

	// Clear password from response
	user.Password = ""

	return &ports.AuthResult{
		User:         user,
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
	}, nil
}

// Login authenticates a user
func (uc *AuthUseCase) Login(ctx context.Context, input ports.LoginInput) (*ports.AuthResult, error) {
	// Find user by email
	user, err := uc.userRepo.GetByEmail(ctx, input.Email)
	if err != nil {
		return nil, ErrInvalidLogin
	}

	// Verify password
	if !uc.authService.VerifyPassword(input.Password, user.Password) {
		return nil, ErrInvalidLogin
	}

	// Generate tokens
	tokens, err := uc.authService.GenerateTokenPair(user.ID, user.Email)
	if err != nil {
		return nil, err
	}

	// Clear password from response
	user.Password = ""

	return &ports.AuthResult{
		User:         user,
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
	}, nil
}

// RefreshToken generates new tokens from a refresh token
func (uc *AuthUseCase) RefreshToken(ctx context.Context, refreshToken string) (*ports.AuthResult, error) {
	// Validate and get new tokens
	tokens, err := uc.authService.RefreshTokens(refreshToken)
	if err != nil {
		return nil, err
	}

	// Get user info from new token
	claims, err := uc.authService.ValidateToken(tokens.AccessToken)
	if err != nil {
		return nil, err
	}

	// Fetch user
	user, err := uc.userRepo.GetByID(ctx, claims.UserID)
	if err != nil {
		return nil, err
	}

	// Clear password from response
	user.Password = ""

	return &ports.AuthResult{
		User:         user,
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
	}, nil
}

// GetCurrentUser returns the authenticated user
func (uc *AuthUseCase) GetCurrentUser(ctx context.Context, userID string) (*entities.User, error) {
	user, err := uc.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	// Clear password from response
	user.Password = ""
	return user, nil
}
