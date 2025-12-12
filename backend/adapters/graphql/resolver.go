package graphql

//go:generate go run github.com/99designs/gqlgen generate

import (
	"github.com/project/backend/adapters/folder"
	"github.com/project/backend/application/ports"
	"github.com/project/backend/domain/repositories"
)

// Resolver is the root resolver for GraphQL
type Resolver struct {
	UserUseCase       ports.UserPort
	AuthUseCase       ports.AuthPort
	LibraryCourseRepo repositories.LibraryCourseRepository
	UserCourseRepo    repositories.UserCourseRepository
	BookmarkRepo      repositories.BookmarkRepository
	AnalyticsRepo     repositories.AnalyticsRepository
	AttachmentRepo    repositories.AttachmentRepository
	QuizRepo          repositories.QuizRepository
	// FolderCourseRepo is set when using folder-based courses for content editing
	FolderCourseRepo *folder.FolderCourseRepository
}
