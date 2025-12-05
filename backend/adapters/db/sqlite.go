package db

import (
	"database/sql"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
)

// SQLiteDB wraps the SQLite database connection
type SQLiteDB struct {
	db *sql.DB
}

// NewSQLiteDB creates a new SQLite database connection
func NewSQLiteDB(path string) (*SQLiteDB, error) {
	// Ensure directory exists
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return nil, err
	}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		return nil, err
	}

	// Enable foreign keys
	if _, err := db.Exec("PRAGMA foreign_keys = ON"); err != nil {
		return nil, err
	}

	// Enable WAL mode for better concurrency
	if _, err := db.Exec("PRAGMA journal_mode = WAL"); err != nil {
		return nil, err
	}

	return &SQLiteDB{db: db}, nil
}

// DB returns the underlying database connection
func (s *SQLiteDB) DB() *sql.DB {
	return s.db
}

// Close closes the database connection
func (s *SQLiteDB) Close() error {
	return s.db.Close()
}

// Migrate runs database migrations
func (s *SQLiteDB) Migrate() error {
	migrations := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id TEXT PRIMARY KEY,
			email TEXT UNIQUE NOT NULL,
			name TEXT NOT NULL,
			password TEXT NOT NULL,
			created_at DATETIME NOT NULL,
			updated_at DATETIME NOT NULL
		)`,
		`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
		`CREATE TABLE IF NOT EXISTS library_courses (
			id TEXT PRIMARY KEY,
			title TEXT NOT NULL,
			description TEXT,
			lessons TEXT NOT NULL,
			author TEXT NOT NULL,
			difficulty TEXT NOT NULL,
			estimated_hours INTEGER NOT NULL,
			created_at DATETIME NOT NULL,
			updated_at DATETIME NOT NULL
		)`,
		`CREATE INDEX IF NOT EXISTS idx_library_courses_difficulty ON library_courses(difficulty)`,
		`CREATE TABLE IF NOT EXISTS user_courses (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			library_course_id TEXT NOT NULL,
			progress INTEGER NOT NULL DEFAULT 0,
			current_lesson_index INTEGER NOT NULL DEFAULT 0,
			started_at DATETIME NOT NULL,
			updated_at DATETIME NOT NULL,
			completed_at DATETIME,
			FOREIGN KEY (library_course_id) REFERENCES library_courses(id) ON DELETE CASCADE,
			UNIQUE(user_id, library_course_id)
		)`,
		`CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON user_courses(user_id)`,
		`CREATE INDEX IF NOT EXISTS idx_user_courses_library_course_id ON user_courses(library_course_id)`,
	}

	for _, migration := range migrations {
		if _, err := s.db.Exec(migration); err != nil {
			return err
		}
	}

	return nil
}
