package graphql

import (
	"github.com/project/backend/application/ports"
	"github.com/project/backend/domain/repositories"
)

// Resolver is the root resolver for GraphQL
type Resolver struct {
	UserUseCase          ports.UserPort
	AuthUseCase          ports.AuthPort
	LibraryCourseRepo    repositories.LibraryCourseRepository
	UserCourseRepo       repositories.UserCourseRepository
}
