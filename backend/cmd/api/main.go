package main

import (
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/project/backend/adapters/db"
	"github.com/project/backend/adapters/graphql"
	httpAdapter "github.com/project/backend/adapters/http"
	"github.com/project/backend/application/usecases"
	"github.com/project/backend/config"
	"github.com/project/backend/domain/services"
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

	// Initialize auth service
	authService := services.NewAuthService(cfg.JWTSecret)

	// Initialize use cases
	userUseCase := usecases.NewUserUseCase(userRepo)
	authUseCase := usecases.NewAuthUseCase(userRepo, authService)

	// Initialize GraphQL resolver
	resolver := &graphql.Resolver{
		UserUseCase: userUseCase,
		AuthUseCase: authUseCase,
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

	// Auth middleware - extracts JWT and adds user to context
	r.Use(httpAdapter.AuthMiddleware(authService))

	// Health check
	r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("OK"))
	})

	// GraphQL endpoints
	if cfg.EnablePlayground {
		r.Handle("/", playground.Handler("GraphQL Playground", "/graphql"))
	}
	r.Handle("/graphql", srv)

	// Create server with timeouts
	server := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 60 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	// Start server
	slog.Info("Starting server", "port", cfg.Port, "playground", cfg.EnablePlayground)
	if err := server.ListenAndServe(); err != nil {
		slog.Error("Server failed", "error", err)
		os.Exit(1)
	}
}
