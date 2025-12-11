package db

import (
	"database/sql"
	"io"
	"log/slog"
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

	// Check if we need to restore from seed database
	if err := restoreFromSeedIfEmpty(path, dir); err != nil {
		slog.Warn("failed to restore from seed database", "error", err)
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
		`CREATE TABLE IF NOT EXISTS bookmarks (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			library_course_id TEXT NOT NULL,
			lesson_index INTEGER NOT NULL,
			note TEXT,
			created_at DATETIME NOT NULL,
			FOREIGN KEY (library_course_id) REFERENCES library_courses(id) ON DELETE CASCADE,
			UNIQUE(user_id, library_course_id, lesson_index)
		)`,
		`CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id)`,
		`CREATE INDEX IF NOT EXISTS idx_bookmarks_library_course_id ON bookmarks(library_course_id)`,
		`CREATE TABLE IF NOT EXISTS course_views (
			id TEXT PRIMARY KEY,
			library_course_id TEXT NOT NULL,
			user_id TEXT,
			viewed_at DATETIME NOT NULL,
			FOREIGN KEY (library_course_id) REFERENCES library_courses(id) ON DELETE CASCADE
		)`,
		`CREATE INDEX IF NOT EXISTS idx_course_views_library_course_id ON course_views(library_course_id)`,
		`CREATE INDEX IF NOT EXISTS idx_course_views_user_id ON course_views(user_id)`,
		`CREATE TABLE IF NOT EXISTS attachments (
			id TEXT PRIMARY KEY,
			library_course_id TEXT NOT NULL,
			lesson_index INTEGER NOT NULL,
			filename TEXT NOT NULL,
			original_name TEXT NOT NULL,
			mime_type TEXT NOT NULL,
			size INTEGER NOT NULL,
			uploaded_at DATETIME NOT NULL,
			uploaded_by TEXT NOT NULL,
			FOREIGN KEY (library_course_id) REFERENCES library_courses(id) ON DELETE CASCADE
		)`,
		`CREATE INDEX IF NOT EXISTS idx_attachments_library_course_id ON attachments(library_course_id)`,
		`CREATE INDEX IF NOT EXISTS idx_attachments_lesson ON attachments(library_course_id, lesson_index)`,
		// Quiz tables
		`CREATE TABLE IF NOT EXISTS quiz_attempts (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			course_id TEXT NOT NULL,
			quiz_type TEXT NOT NULL,
			quiz_id TEXT NOT NULL,
			score INTEGER NOT NULL,
			max_score INTEGER NOT NULL,
			total_questions INTEGER NOT NULL,
			correct_count INTEGER NOT NULL,
			percentage REAL NOT NULL,
			mastery_level TEXT NOT NULL,
			completed_at DATETIME NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
		)`,
		`CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON quiz_attempts(user_id)`,
		`CREATE INDEX IF NOT EXISTS idx_quiz_attempts_course_id ON quiz_attempts(course_id)`,
		`CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id)`,
		`CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_course ON quiz_attempts(user_id, course_id)`,
		`CREATE TABLE IF NOT EXISTS quiz_responses (
			id TEXT PRIMARY KEY,
			attempt_id TEXT NOT NULL,
			question_id TEXT NOT NULL,
			user_answer TEXT NOT NULL,
			is_correct BOOLEAN NOT NULL,
			points_earned INTEGER NOT NULL DEFAULT 0,
			points_possible INTEGER NOT NULL DEFAULT 1,
			confidence TEXT,
			time_taken_seconds INTEGER,
			FOREIGN KEY (attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE
		)`,
		`CREATE INDEX IF NOT EXISTS idx_quiz_responses_attempt_id ON quiz_responses(attempt_id)`,
		`CREATE INDEX IF NOT EXISTS idx_quiz_responses_question_id ON quiz_responses(question_id)`,
		`CREATE TABLE IF NOT EXISTS review_queue (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			course_id TEXT NOT NULL,
			quiz_id TEXT NOT NULL,
			question_id TEXT NOT NULL,
			concept TEXT NOT NULL,
			wrong_count INTEGER NOT NULL DEFAULT 1,
			last_attempt DATETIME NOT NULL,
			next_review DATETIME NOT NULL,
			stability REAL NOT NULL DEFAULT 1.0,
			FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
			UNIQUE(user_id, course_id, question_id)
		)`,
		`CREATE INDEX IF NOT EXISTS idx_review_queue_user_id ON review_queue(user_id)`,
		`CREATE INDEX IF NOT EXISTS idx_review_queue_next_review ON review_queue(next_review)`,
	}

	for _, migration := range migrations {
		if _, err := s.db.Exec(migration); err != nil {
			return err
		}
	}

	// Run column migrations (add new columns to existing tables)
	columnMigrations := []struct {
		table      string
		column     string
		definition string
	}{
		{"library_courses", "author_id", "TEXT NOT NULL DEFAULT ''"},
		{"library_courses", "tags", "TEXT NOT NULL DEFAULT '[]'"},
		{"user_courses", "completed_lessons", "TEXT NOT NULL DEFAULT '[]'"},
	}

	for _, cm := range columnMigrations {
		// Check if column exists
		var count int
		err := s.db.QueryRow(`SELECT COUNT(*) FROM pragma_table_info(?) WHERE name = ?`, cm.table, cm.column).Scan(&count)
		if err != nil {
			return err
		}

		// Add column if it doesn't exist
		if count == 0 {
			_, err := s.db.Exec(`ALTER TABLE ` + cm.table + ` ADD COLUMN ` + cm.column + ` ` + cm.definition)
			if err != nil {
				return err
			}
		}
	}

	// Create index for author_id if it doesn't exist
	_, _ = s.db.Exec(`CREATE INDEX IF NOT EXISTS idx_library_courses_author_id ON library_courses(author_id)`)

	return nil
}

// restoreFromSeedIfEmpty copies seed.db to app.db if app.db doesn't exist
// This provides default content (like the Hexagonal Architecture course) for fresh installations
func restoreFromSeedIfEmpty(dbPath, dataDir string) error {
	// Check if app.db exists
	if _, err := os.Stat(dbPath); err == nil {
		// Database exists, no need to seed
		return nil
	}

	// Check if seed.db exists
	seedPath := filepath.Join(dataDir, "seed.db")
	seedFile, err := os.Open(seedPath)
	if err != nil {
		// No seed file, that's okay - we'll start fresh
		return nil
	}
	defer seedFile.Close()

	slog.Info("restoring database from seed", "seedPath", seedPath, "dbPath", dbPath)

	// Copy seed.db to app.db
	destFile, err := os.Create(dbPath)
	if err != nil {
		return err
	}
	defer destFile.Close()

	if _, err := io.Copy(destFile, seedFile); err != nil {
		return err
	}

	slog.Info("database restored from seed successfully")
	return nil
}
