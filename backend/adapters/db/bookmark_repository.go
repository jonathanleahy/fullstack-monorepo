package db

import (
	"context"
	"database/sql"

	"github.com/google/uuid"

	"github.com/project/backend/domain/entities"
)

// BookmarkRepository implements the BookmarkRepository interface with SQLite
type BookmarkRepository struct {
	db *SQLiteDB
}

// NewBookmarkRepository creates a new BookmarkRepository
func NewBookmarkRepository(db *SQLiteDB) *BookmarkRepository {
	return &BookmarkRepository{db: db}
}

// Create stores a new bookmark
func (r *BookmarkRepository) Create(ctx context.Context, bookmark *entities.Bookmark) (*entities.Bookmark, error) {
	bookmark.ID = uuid.New().String()

	query := `INSERT INTO bookmarks (id, user_id, library_course_id, lesson_index, note, created_at)
			  VALUES (?, ?, ?, ?, ?, ?)`

	_, err := r.db.DB().ExecContext(ctx, query,
		bookmark.ID, bookmark.UserID, bookmark.LibraryCourseID,
		bookmark.LessonIndex, bookmark.Note, bookmark.CreatedAt)
	if err != nil {
		return nil, err
	}

	return bookmark, nil
}

// GetByID retrieves a bookmark by its ID
func (r *BookmarkRepository) GetByID(ctx context.Context, id string) (*entities.Bookmark, error) {
	query := `SELECT id, user_id, library_course_id, lesson_index, note, created_at
			  FROM bookmarks WHERE id = ?`

	bookmark := &entities.Bookmark{}
	err := r.db.DB().QueryRowContext(ctx, query, id).Scan(
		&bookmark.ID, &bookmark.UserID, &bookmark.LibraryCourseID,
		&bookmark.LessonIndex, &bookmark.Note, &bookmark.CreatedAt)

	if err == sql.ErrNoRows {
		return nil, entities.ErrCourseNotFound // reusing error, could create ErrBookmarkNotFound
	}
	if err != nil {
		return nil, err
	}

	return bookmark, nil
}

// GetByUserID retrieves all bookmarks for a user
func (r *BookmarkRepository) GetByUserID(ctx context.Context, userID string) ([]*entities.Bookmark, error) {
	query := `SELECT id, user_id, library_course_id, lesson_index, note, created_at
			  FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC`

	rows, err := r.db.DB().QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bookmarks []*entities.Bookmark
	for rows.Next() {
		bookmark := &entities.Bookmark{}
		if err := rows.Scan(&bookmark.ID, &bookmark.UserID, &bookmark.LibraryCourseID,
			&bookmark.LessonIndex, &bookmark.Note, &bookmark.CreatedAt); err != nil {
			return nil, err
		}
		bookmarks = append(bookmarks, bookmark)
	}

	return bookmarks, rows.Err()
}

// GetByCourse retrieves all bookmarks for a specific course and user
func (r *BookmarkRepository) GetByCourse(ctx context.Context, userID, libraryCourseID string) ([]*entities.Bookmark, error) {
	query := `SELECT id, user_id, library_course_id, lesson_index, note, created_at
			  FROM bookmarks WHERE user_id = ? AND library_course_id = ? ORDER BY lesson_index ASC`

	rows, err := r.db.DB().QueryContext(ctx, query, userID, libraryCourseID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bookmarks []*entities.Bookmark
	for rows.Next() {
		bookmark := &entities.Bookmark{}
		if err := rows.Scan(&bookmark.ID, &bookmark.UserID, &bookmark.LibraryCourseID,
			&bookmark.LessonIndex, &bookmark.Note, &bookmark.CreatedAt); err != nil {
			return nil, err
		}
		bookmarks = append(bookmarks, bookmark)
	}

	return bookmarks, rows.Err()
}

// Delete removes a bookmark
func (r *BookmarkRepository) Delete(ctx context.Context, id string) error {
	query := `DELETE FROM bookmarks WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return entities.ErrCourseNotFound
	}

	return nil
}

// DeleteByUserAndLesson removes a bookmark by user, course, and lesson index
func (r *BookmarkRepository) DeleteByUserAndLesson(ctx context.Context, userID, libraryCourseID string, lessonIndex int) error {
	query := `DELETE FROM bookmarks WHERE user_id = ? AND library_course_id = ? AND lesson_index = ?`

	result, err := r.db.DB().ExecContext(ctx, query, userID, libraryCourseID, lessonIndex)
	if err != nil {
		return err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return entities.ErrCourseNotFound
	}

	return nil
}

// Update modifies an existing bookmark
func (r *BookmarkRepository) Update(ctx context.Context, bookmark *entities.Bookmark) (*entities.Bookmark, error) {
	query := `UPDATE bookmarks SET note = ? WHERE id = ?`

	result, err := r.db.DB().ExecContext(ctx, query, bookmark.Note, bookmark.ID)
	if err != nil {
		return nil, err
	}

	rows, err := result.RowsAffected()
	if err != nil {
		return nil, err
	}
	if rows == 0 {
		return nil, entities.ErrCourseNotFound
	}

	return bookmark, nil
}
