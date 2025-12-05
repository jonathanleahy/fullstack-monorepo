package main

import (
	"log/slog"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/project/backend/adapters/db"
	"github.com/project/backend/adapters/graphql"
	"github.com/project/backend/application/usecases"
	"github.com/project/backend/config"
)

func main() {
	// Initialize structured logger
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelInfo,
	}))
	slog.SetDefault(logger)

	// Load configuration
	cfg := config.Load()

	// Initialize database
	database, err := db.NewSQLiteDB(cfg.DatabasePath)
	if err != nil {
		slog.Error("Failed to initialize database", "error", err)
		os.Exit(1)
	}
	defer database.Close()

	// Run migrations
	if err := database.Migrate(); err != nil {
		slog.Error("Failed to run migrations", "error", err)
		os.Exit(1)
	}

	// Initialize repositories
	userRepo := db.NewUserRepository(database)

	// Initialize use cases
	userUseCase := usecases.NewUserUseCase(userRepo)

	// Initialize GraphQL resolver
	resolver := &graphql.Resolver{
		UserUseCase: userUseCase,
	}

	// Create GraphQL server
	srv := handler.NewDefaultServer(graphql.NewExecutableSchema(graphql.Config{Resolvers: resolver}))

	// Set up router
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(cfg.RequestTimeout))

	// CORS
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   cfg.AllowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	// Health check
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// GraphQL endpoints
	if cfg.EnablePlayground {
		r.Handle("/", playground.Handler("GraphQL Playground", "/graphql"))
	}
	r.Handle("/graphql", srv)

	// Start server
	slog.Info("Starting server", "port", cfg.Port, "playground", cfg.EnablePlayground)
	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		slog.Error("Server failed", "error", err)
		os.Exit(1)
	}
}
