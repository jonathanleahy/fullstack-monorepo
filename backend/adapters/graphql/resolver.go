package graphql

import "github.com/project/backend/application/ports"

// Resolver is the root resolver for GraphQL
type Resolver struct {
	UserUseCase ports.UserPort
}
