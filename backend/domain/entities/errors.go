package entities

import "errors"

// Domain errors
var (
	ErrInvalidEmail = errors.New("invalid email address")
	ErrInvalidName  = errors.New("name cannot be empty")
	ErrWeakPassword = errors.New("password must be at least 8 characters")
	ErrUserNotFound = errors.New("user not found")
	ErrEmailExists  = errors.New("email already exists")
	ErrUnauthorized = errors.New("unauthorized")
	ErrInvalidID    = errors.New("invalid ID")
)
