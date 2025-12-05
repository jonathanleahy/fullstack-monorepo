package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/project/backend/domain/entities"
)

// UserRepository implements the UserRepository interface with SQLite
type UserRepository struct {
	db *SQLiteDB
}

// NewUserRepository creates a new UserRepository
func NewUserRepository(db *SQLiteDB) *UserRepository {
	return &UserRepository{db: db}
}

// Create stores a new user and returns the created user with ID
func (r *UserRepository) Create(ctx context.Context, user *entities.User) (*entities.User, error) {
	user.ID = uuid.New().String()
	user.CreatedAt = time.Now()
	user.UpdatedAt = user.CreatedAt

	query := `INSERT INTO users (id, email, name, password, created_at, updated_at)
			  VALUES (?, ?, ?, ?, ?, ?)`

	_, err := r.db.DB().ExecContext(ctx, query,
		user.ID, user.Email, user.Name, user.Password, user.CreatedAt, user.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return user, nil
}

// GetByID retrieves a user by their ID
func (r *UserRepository) GetByID(ctx context.Context, id string) (*entities.User, error) {
	query := `SELECT id, email, name, password, created_at, updated_at FROM users WHERE id = ?`

	user := &entities.User{}
	err := r.db.DB().QueryRowContext(ctx, query, id).Scan(
		&user.ID, &user.Email, &user.Name, &user.Password, &user.CreatedAt, &user.UpdatedAt)

	if err == sql.ErrNoRows {
		return nil, entities.ErrUserNotFound
	}
	if err != nil {
		return nil, err
	}

	return user, nil
}

// GetByEmail retrieves a user by their email
func (r *UserRepository) GetByEmail(ctx context.Context, email string) (*entities.User, error) {
	query := `SELECT id, email, name, password, created_at, updated_at FROM users WHERE email = ?`

	user := &entities.User{}
	err := r.db.DB().QueryRowContext(ctx, query, email).Scan(
		&user.ID, &user.Email, &user.Name, &user.Password, &user.CreatedAt, &user.UpdatedAt)

	if err == sql.ErrNoRows {
		return nil, entities.ErrUserNotFound
	}
	if err != nil {
		return nil, err
	}

	return user, nil
}

// Update modifies an existing user
func (r *UserRepository) Update(ctx context.Context, user *entities.User) (*entities.User, error) {
	user.UpdatedAt = time.Now()

	query := `UPDATE users SET email = ?, name = ?, updated_at = ? WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query, user.Email, user.Name, user.UpdatedAt, user.ID)
	if err != nil {
		return nil, err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return nil, err
	}
	if rows == 0 {
		return nil, entities.ErrUserNotFound
	}

	return user, nil
}

// Delete removes a user by ID
func (r *UserRepository) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM users WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return entities.ErrUserNotFound
	}

	return nil
}

// List retrieves all users with pagination
func (r *UserRepository) List(ctx context.Context, limit, offset int) ([]*entities.User, int, error) {
	// Get total count
	var total int
	countQuery := `SELECT COUNT(*) FROM users`
	if err := r.db.DB().QueryRowContext(ctx, countQuery).Scan(&total); err != nil {
		return nil, 0, err
	}

	// Get paginated users
	query := `SELECT id, email, name, password, created_at, updated_at
			  FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?`

	rows, err := r.db.DB().QueryContext(ctx, query, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var users []*entities.User
	for rows.Next() {
		user := &entities.User{}
		if err := rows.Scan(&user.ID, &user.Email, &user.Name, &user.Password,
			&user.CreatedAt, &user.UpdatedAt); err != nil {
			return nil, 0, err
		}
		users = append(users, user)
	}

	return users, total, rows.Err()
}
