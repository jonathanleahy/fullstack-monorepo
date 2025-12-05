package services

import (
	"testing"
	"time"
)

func TestHashPassword(t *testing.T) {
	authService := NewAuthService("test-secret-key-at-least-32-chars!")

	password := "mySecurePassword123"

	// Hash should succeed
	hash1, err := authService.HashPassword(password)
	if err != nil {
		t.Fatalf("HashPassword failed: %v", err)
	}

	// Hash should not equal original password
	if hash1 == password {
		t.Error("Hash should not equal original password")
	}

	// Each hash should be different (salt)
	hash2, err := authService.HashPassword(password)
	if err != nil {
		t.Fatalf("HashPassword failed: %v", err)
	}

	if hash1 == hash2 {
		t.Error("Hashes should be different due to salt")
	}
}

func TestVerifyPassword(t *testing.T) {
	authService := NewAuthService("test-secret-key-at-least-32-chars!")

	password := "mySecurePassword123"
	wrongPassword := "wrongPassword123"

	hash, err := authService.HashPassword(password)
	if err != nil {
		t.Fatalf("HashPassword failed: %v", err)
	}

	// Correct password should verify
	if !authService.VerifyPassword(password, hash) {
		t.Error("VerifyPassword should return true for correct password")
	}

	// Wrong password should not verify
	if authService.VerifyPassword(wrongPassword, hash) {
		t.Error("VerifyPassword should return false for wrong password")
	}

	// Empty password should not verify
	if authService.VerifyPassword("", hash) {
		t.Error("VerifyPassword should return false for empty password")
	}
}

func TestGenerateTokenPair(t *testing.T) {
	authService := NewAuthService("test-secret-key-at-least-32-chars!")

	userID := "user-123"
	email := "test@example.com"

	tokens, err := authService.GenerateTokenPair(userID, email)
	if err != nil {
		t.Fatalf("GenerateTokenPair failed: %v", err)
	}

	// Both tokens should be non-empty
	if tokens.AccessToken == "" {
		t.Error("AccessToken should not be empty")
	}

	if tokens.RefreshToken == "" {
		t.Error("RefreshToken should not be empty")
	}

	// Tokens should be different
	if tokens.AccessToken == tokens.RefreshToken {
		t.Error("AccessToken and RefreshToken should be different")
	}

	// ExpiresAt should be in the future
	if !tokens.ExpiresAt.After(time.Now()) {
		t.Error("ExpiresAt should be in the future")
	}
}

func TestValidateToken(t *testing.T) {
	authService := NewAuthService("test-secret-key-at-least-32-chars!")

	userID := "user-123"
	email := "test@example.com"

	tokens, err := authService.GenerateTokenPair(userID, email)
	if err != nil {
		t.Fatalf("GenerateTokenPair failed: %v", err)
	}

	// Valid token should return claims
	claims, err := authService.ValidateToken(tokens.AccessToken)
	if err != nil {
		t.Fatalf("ValidateToken failed: %v", err)
	}

	if claims.UserID != userID {
		t.Errorf("Expected UserID %s, got %s", userID, claims.UserID)
	}

	if claims.Email != email {
		t.Errorf("Expected Email %s, got %s", email, claims.Email)
	}
}

func TestValidateToken_InvalidToken(t *testing.T) {
	authService := NewAuthService("test-secret-key-at-least-32-chars!")

	// Invalid token should fail
	_, err := authService.ValidateToken("invalid-token")
	if err == nil {
		t.Error("ValidateToken should fail for invalid token")
	}

	if err != ErrInvalidToken {
		t.Errorf("Expected ErrInvalidToken, got %v", err)
	}
}

func TestValidateToken_WrongSecret(t *testing.T) {
	authService1 := NewAuthService("secret-key-one-at-least-32-chars!")
	authService2 := NewAuthService("secret-key-two-at-least-32-chars!")

	tokens, _ := authService1.GenerateTokenPair("user-123", "test@example.com")

	// Token from different secret should fail
	_, err := authService2.ValidateToken(tokens.AccessToken)
	if err == nil {
		t.Error("ValidateToken should fail for token signed with different secret")
	}
}

func TestRefreshTokens(t *testing.T) {
	authService := NewAuthService("test-secret-key-at-least-32-chars!")

	userID := "user-123"
	email := "test@example.com"

	originalTokens, _ := authService.GenerateTokenPair(userID, email)

	// Refresh should generate new tokens
	newTokens, err := authService.RefreshTokens(originalTokens.RefreshToken)
	if err != nil {
		t.Fatalf("RefreshTokens failed: %v", err)
	}

	// New tokens should be different
	if newTokens.AccessToken == originalTokens.AccessToken {
		t.Error("New AccessToken should be different from original")
	}

	// New tokens should be valid
	claims, err := authService.ValidateToken(newTokens.AccessToken)
	if err != nil {
		t.Fatalf("New token validation failed: %v", err)
	}

	if claims.UserID != userID {
		t.Errorf("Expected UserID %s, got %s", userID, claims.UserID)
	}
}

func TestRefreshTokens_InvalidToken(t *testing.T) {
	authService := NewAuthService("test-secret-key-at-least-32-chars!")

	_, err := authService.RefreshTokens("invalid-refresh-token")
	if err == nil {
		t.Error("RefreshTokens should fail for invalid token")
	}
}
