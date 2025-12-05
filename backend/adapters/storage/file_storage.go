package storage

import (
	"bytes"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
)

const (
	maxFileSize = 10 * 1024 * 1024 // 10MB
	baseDir     = "./uploads/attachments"
)

// FileStorage handles file storage operations
type FileStorage struct {
	baseDir string
}

// NewFileStorage creates a new file storage instance
func NewFileStorage() *FileStorage {
	return &FileStorage{
		baseDir: baseDir,
	}
}

// AllowedMimeTypes returns a map of allowed MIME types and their file signatures (magic bytes)
func AllowedMimeTypes() map[string][]byte {
	return map[string][]byte{
		// PDFs
		"application/pdf": {0x25, 0x50, 0x44, 0x46}, // %PDF

		// Images
		"image/jpeg": {0xFF, 0xD8, 0xFF},                               // JPEG
		"image/png":  {0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A}, // PNG
		"image/gif":  {0x47, 0x49, 0x46, 0x38},                         // GIF
		"image/webp": {0x52, 0x49, 0x46, 0x46},                         // WEBP (RIFF header)

		// Text/Code files (no magic bytes check, just allowed)
		"text/plain":         {},
		"text/x-go":          {},
		"text/javascript":    {},
		"text/x-typescript":  {},
		"text/x-python":      {},
		"application/json":   {},
		"text/markdown":      {},
		"text/x-c":           {},
		"text/x-c++":         {},
		"text/x-java":        {},
		"text/x-rust":        {},
		"application/xml":    {},
		"text/html":          {},
		"text/css":           {},
		"application/x-yaml": {},
		"text/x-sh":          {},
	}
}

// ValidateFile validates file size and MIME type using magic bytes
func (fs *FileStorage) ValidateFile(data []byte, declaredMimeType string) error {
	// Check file size
	if int64(len(data)) > maxFileSize {
		return fmt.Errorf("file size exceeds maximum allowed size of %d bytes", maxFileSize)
	}

	// Check if MIME type is allowed
	allowedTypes := AllowedMimeTypes()
	magicBytes, allowed := allowedTypes[declaredMimeType]
	if !allowed {
		return fmt.Errorf("file type %s is not allowed", declaredMimeType)
	}

	// Validate magic bytes if they exist for this type
	if len(magicBytes) > 0 {
		if len(data) < len(magicBytes) {
			return fmt.Errorf("file is too small to be a valid %s", declaredMimeType)
		}

		// Special case for WEBP - check for WEBP signature after RIFF
		if declaredMimeType == "image/webp" {
			if !bytes.HasPrefix(data, magicBytes) || len(data) < 12 {
				return fmt.Errorf("invalid WEBP file signature")
			}
			// Check for "WEBP" at bytes 8-11
			if !bytes.Equal(data[8:12], []byte{0x57, 0x45, 0x42, 0x50}) {
				return fmt.Errorf("invalid WEBP file signature")
			}
		} else {
			// Standard magic bytes check
			if !bytes.HasPrefix(data, magicBytes) {
				return fmt.Errorf("file content does not match declared type %s", declaredMimeType)
			}
		}
	}

	return nil
}

// SaveFile saves a file to the storage and returns the unique filename
func (fs *FileStorage) SaveFile(data []byte, originalName, mimeType, courseID string, lessonIndex int) (string, error) {
	// Validate file
	if err := fs.ValidateFile(data, mimeType); err != nil {
		return "", err
	}

	// Generate unique filename
	ext := filepath.Ext(originalName)
	uniqueFilename := uuid.New().String() + ext

	// Create directory path
	dirPath := filepath.Join(fs.baseDir, courseID, fmt.Sprintf("%d", lessonIndex))
	if err := os.MkdirAll(dirPath, 0755); err != nil {
		return "", fmt.Errorf("failed to create directory: %w", err)
	}

	// Create file path
	filePath := filepath.Join(dirPath, uniqueFilename)

	// Write file
	if err := os.WriteFile(filePath, data, 0644); err != nil {
		return "", fmt.Errorf("failed to write file: %w", err)
	}

	return uniqueFilename, nil
}

// GetFile retrieves a file from storage
func (fs *FileStorage) GetFile(filename, courseID string, lessonIndex int) ([]byte, error) {
	filePath := filepath.Join(fs.baseDir, courseID, fmt.Sprintf("%d", lessonIndex), filename)

	// Check if file exists
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return nil, fmt.Errorf("file not found")
	}

	// Read file
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}

	return data, nil
}

// DeleteFile removes a file from storage
func (fs *FileStorage) DeleteFile(filename, courseID string, lessonIndex int) error {
	filePath := filepath.Join(fs.baseDir, courseID, fmt.Sprintf("%d", lessonIndex), filename)

	// Check if file exists
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return fmt.Errorf("file not found")
	}

	// Delete file
	if err := os.Remove(filePath); err != nil {
		return fmt.Errorf("failed to delete file: %w", err)
	}

	return nil
}

// DetectMimeType detects MIME type from file extension as fallback
func DetectMimeType(filename string) string {
	ext := strings.ToLower(filepath.Ext(filename))

	mimeTypes := map[string]string{
		".pdf":  "application/pdf",
		".jpg":  "image/jpeg",
		".jpeg": "image/jpeg",
		".png":  "image/png",
		".gif":  "image/gif",
		".webp": "image/webp",
		".txt":  "text/plain",
		".go":   "text/x-go",
		".js":   "text/javascript",
		".ts":   "text/x-typescript",
		".tsx":  "text/x-typescript",
		".jsx":  "text/javascript",
		".py":   "text/x-python",
		".json": "application/json",
		".md":   "text/markdown",
		".c":    "text/x-c",
		".cpp":  "text/x-c++",
		".h":    "text/x-c",
		".hpp":  "text/x-c++",
		".java": "text/x-java",
		".rs":   "text/x-rust",
		".xml":  "application/xml",
		".html": "text/html",
		".css":  "text/css",
		".yaml": "application/x-yaml",
		".yml":  "application/x-yaml",
		".sh":   "text/x-sh",
	}

	if mime, ok := mimeTypes[ext]; ok {
		return mime
	}

	return "application/octet-stream"
}

// ReadMultipartFile reads a multipart file into memory
func ReadMultipartFile(file io.Reader, maxSize int64) ([]byte, error) {
	// Use LimitReader to prevent reading more than maxSize
	limitedReader := io.LimitReader(file, maxSize+1)

	data, err := io.ReadAll(limitedReader)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}

	if int64(len(data)) > maxSize {
		return nil, fmt.Errorf("file size exceeds maximum allowed size")
	}

	return data, nil
}
