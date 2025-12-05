package entities

import (
	"time"
)

// User represents a user in the domain
type User struct {
	ID        string
	Email     string
	Name      string
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// NewUser creates a new User entity with validation
func NewUser(email, name, password string) (*User, error) {
	if email == "" {
		return nil, ErrInvalidEmail
	}
	if name == "" {
		return nil, ErrInvalidName
	}
	if len(password) < 8 {
		return nil, ErrWeakPassword
	}

	now := time.Now()
	return &User{
		Email:     email,
		Name:      name,
		Password:  password,
		CreatedAt: now,
		UpdatedAt: now,
	}, nil
}

// Update modifies user fields and updates the timestamp
func (u *User) Update(name, email string) error {
	if name != "" {
		u.Name = name
	}
	if email != "" {
		u.Email = email
	}
	u.UpdatedAt = time.Now()
	return nil
}
