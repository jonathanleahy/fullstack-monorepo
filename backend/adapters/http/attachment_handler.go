package http

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/project/backend/adapters/storage"
	"github.com/project/backend/domain/entities"
	"github.com/project/backend/domain/repositories"
)

const (
	maxUploadSize = 10 * 1024 * 1024 // 10MB
)

// AttachmentHandler handles attachment-related HTTP requests
type AttachmentHandler struct {
	attachmentRepo    repositories.AttachmentRepository
	libraryCourseRepo repositories.LibraryCourseRepository
	fileStorage       *storage.FileStorage
}

// NewAttachmentHandler creates a new attachment handler
func NewAttachmentHandler(
	attachmentRepo repositories.AttachmentRepository,
	libraryCourseRepo repositories.LibraryCourseRepository,
	fileStorage *storage.FileStorage,
) *AttachmentHandler {
	return &AttachmentHandler{
		attachmentRepo:    attachmentRepo,
		libraryCourseRepo: libraryCourseRepo,
		fileStorage:       fileStorage,
	}
}

// UploadAttachment handles file upload for a lesson
func (h *AttachmentHandler) UploadAttachment(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Get user ID from context
	userID := GetUserIDFromContext(ctx)
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Get URL parameters
	courseID := chi.URLParam(r, "courseId")
	lessonIndexStr := chi.URLParam(r, "lessonIndex")

	if courseID == "" {
		http.Error(w, "Course ID is required", http.StatusBadRequest)
		return
	}

	lessonIndex, err := strconv.Atoi(lessonIndexStr)
	if err != nil || lessonIndex < 0 {
		http.Error(w, "Invalid lesson index", http.StatusBadRequest)
		return
	}

	// Verify the course exists and user is the author
	course, err := h.libraryCourseRepo.GetByID(ctx, courseID)
	if err != nil {
		if err == entities.ErrCourseNotFound {
			http.Error(w, "Course not found", http.StatusNotFound)
			return
		}
		slog.Error("Failed to get course", "error", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Only the course author can upload attachments
	if course.AuthorID != userID {
		http.Error(w, "Only the course author can upload attachments", http.StatusForbidden)
		return
	}

	// Verify lesson index is valid
	if lessonIndex >= len(course.Lessons) {
		http.Error(w, "Invalid lesson index", http.StatusBadRequest)
		return
	}

	// Parse multipart form
	if err := r.ParseMultipartForm(maxUploadSize); err != nil {
		http.Error(w, "File too large or invalid form data", http.StatusBadRequest)
		return
	}

	// Get the file from form
	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "File is required", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Read file data
	fileData, err := storage.ReadMultipartFile(file, maxUploadSize)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Detect MIME type
	mimeType := header.Header.Get("Content-Type")
	if mimeType == "" || mimeType == "application/octet-stream" {
		mimeType = storage.DetectMimeType(header.Filename)
	}

	// Save file to storage
	filename, err := h.fileStorage.SaveFile(fileData, header.Filename, mimeType, courseID, lessonIndex)
	if err != nil {
		slog.Error("Failed to save file", "error", err)
		http.Error(w, fmt.Sprintf("Failed to save file: %s", err.Error()), http.StatusBadRequest)
		return
	}

	// Create attachment entity
	attachment, err := entities.NewAttachment(
		courseID,
		lessonIndex,
		filename,
		header.Filename,
		mimeType,
		int64(len(fileData)),
		userID,
	)
	if err != nil {
		// Delete the file if entity creation fails
		_ = h.fileStorage.DeleteFile(filename, courseID, lessonIndex)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Save to database
	attachment, err = h.attachmentRepo.Create(ctx, attachment)
	if err != nil {
		// Delete the file if database save fails
		_ = h.fileStorage.DeleteFile(filename, courseID, lessonIndex)
		slog.Error("Failed to save attachment to database", "error", err)
		http.Error(w, "Failed to save attachment", http.StatusInternalServerError)
		return
	}

	// Return success response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"id":              attachment.ID,
		"libraryCourseId": attachment.LibraryCourseID,
		"lessonIndex":     attachment.LessonIndex,
		"filename":        attachment.Filename,
		"originalName":    attachment.OriginalName,
		"mimeType":        attachment.MimeType,
		"size":            attachment.Size,
		"uploadedAt":      attachment.UploadedAt,
		"downloadUrl":     fmt.Sprintf("/api/attachments/%s", attachment.ID),
	})
}

// DownloadAttachment handles file download
func (h *AttachmentHandler) DownloadAttachment(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Get attachment ID from URL
	attachmentID := chi.URLParam(r, "id")
	if attachmentID == "" {
		http.Error(w, "Attachment ID is required", http.StatusBadRequest)
		return
	}

	// Get attachment from database
	attachment, err := h.attachmentRepo.GetByID(ctx, attachmentID)
	if err != nil {
		if err == entities.ErrAttachmentNotFound {
			http.Error(w, "Attachment not found", http.StatusNotFound)
			return
		}
		slog.Error("Failed to get attachment", "error", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Get file from storage
	fileData, err := h.fileStorage.GetFile(attachment.Filename, attachment.LibraryCourseID, attachment.LessonIndex)
	if err != nil {
		slog.Error("Failed to get file from storage", "error", err)
		http.Error(w, "File not found", http.StatusNotFound)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", attachment.MimeType)
	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=\"%s\"", attachment.OriginalName))
	w.Header().Set("Content-Length", strconv.FormatInt(attachment.Size, 10))

	// Write file data
	w.WriteHeader(http.StatusOK)
	w.Write(fileData)
}

// DeleteAttachment handles file deletion
func (h *AttachmentHandler) DeleteAttachment(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Get user ID from context
	userID := GetUserIDFromContext(ctx)
	if userID == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Get attachment ID from URL
	attachmentID := chi.URLParam(r, "id")
	if attachmentID == "" {
		http.Error(w, "Attachment ID is required", http.StatusBadRequest)
		return
	}

	// Get attachment from database
	attachment, err := h.attachmentRepo.GetByID(ctx, attachmentID)
	if err != nil {
		if err == entities.ErrAttachmentNotFound {
			http.Error(w, "Attachment not found", http.StatusNotFound)
			return
		}
		slog.Error("Failed to get attachment", "error", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Verify the course exists and user is the author
	course, err := h.libraryCourseRepo.GetByID(ctx, attachment.LibraryCourseID)
	if err != nil {
		slog.Error("Failed to get course", "error", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Only the course author can delete attachments
	if course.AuthorID != userID {
		http.Error(w, "Only the course author can delete attachments", http.StatusForbidden)
		return
	}

	// Delete from storage
	if err := h.fileStorage.DeleteFile(attachment.Filename, attachment.LibraryCourseID, attachment.LessonIndex); err != nil {
		slog.Error("Failed to delete file from storage", "error", err)
		// Continue to delete from database even if file deletion fails
	}

	// Delete from database
	if err := h.attachmentRepo.Delete(ctx, attachmentID); err != nil {
		slog.Error("Failed to delete attachment from database", "error", err)
		http.Error(w, "Failed to delete attachment", http.StatusInternalServerError)
		return
	}

	// Return success response
	w.WriteHeader(http.StatusNoContent)
}
