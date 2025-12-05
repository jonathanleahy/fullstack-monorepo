package entities

import (
	"testing"
)

func TestNewUser_ValidInput(t *testing.T) {
	user, err := NewUser("test@example.com", "Test User", "password123")

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if user.Email != "test@example.com" {
		t.Errorf("expected email 'test@example.com', got '%s'", user.Email)
	}

	if user.Name != "Test User" {
		t.Errorf("expected name 'Test User', got '%s'", user.Name)
	}

	if user.CreatedAt.IsZero() {
		t.Error("expected CreatedAt to be set")
	}

	if user.UpdatedAt.IsZero() {
		t.Error("expected UpdatedAt to be set")
	}
}

func TestNewUser_EmptyEmail(t *testing.T) {
	_, err := NewUser("", "Test User", "password123")

	if err != ErrInvalidEmail {
		t.Errorf("expected ErrInvalidEmail, got %v", err)
	}
}

func TestNewUser_EmptyName(t *testing.T) {
	_, err := NewUser("test@example.com", "", "password123")

	if err != ErrInvalidName {
		t.Errorf("expected ErrInvalidName, got %v", err)
	}
}

func TestNewUser_WeakPassword(t *testing.T) {
	_, err := NewUser("test@example.com", "Test User", "short")

	if err != ErrWeakPassword {
		t.Errorf("expected ErrWeakPassword, got %v", err)
	}
}

func TestUser_Update(t *testing.T) {
	user, _ := NewUser("test@example.com", "Test User", "password123")
	originalUpdatedAt := user.UpdatedAt

	err := user.Update("New Name", "new@example.com")

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if user.Name != "New Name" {
		t.Errorf("expected name 'New Name', got '%s'", user.Name)
	}

	if user.Email != "new@example.com" {
		t.Errorf("expected email 'new@example.com', got '%s'", user.Email)
	}

	if !user.UpdatedAt.After(originalUpdatedAt) {
		t.Error("expected UpdatedAt to be updated")
	}
}

func TestUser_Update_PartialUpdate(t *testing.T) {
	user, _ := NewUser("test@example.com", "Test User", "password123")

	// Update only name
	err := user.Update("New Name", "")

	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if user.Name != "New Name" {
		t.Errorf("expected name 'New Name', got '%s'", user.Name)
	}

	// Email should remain unchanged
	if user.Email != "test@example.com" {
		t.Errorf("expected email to remain 'test@example.com', got '%s'", user.Email)
	}
}
