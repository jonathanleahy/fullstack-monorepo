package config

import (
	"os"
	"strconv"
	"strings"
	"time"
)

// Config holds all configuration for the application
type Config struct {
	Port             string
	DatabasePath     string
	EnablePlayground bool
	AllowedOrigins   []string
	RequestTimeout   time.Duration
	LogLevel         string
}

// Load reads configuration from environment variables with sensible defaults
func Load() *Config {
	return &Config{
		Port:             getEnv("PORT", "8082"),
		DatabasePath:     getEnv("DATABASE_PATH", "./data/app.db"),
		EnablePlayground: getEnvBool("ENABLE_PLAYGROUND", true),
		AllowedOrigins:   getEnvSlice("ALLOWED_ORIGINS", []string{"http://localhost:3001", "http://localhost:3000"}),
		RequestTimeout:   getEnvDuration("REQUEST_TIMEOUT", 30*time.Second),
		LogLevel:         getEnv("LOG_LEVEL", "info"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvBool(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		parsed, err := strconv.ParseBool(value)
		if err == nil {
			return parsed
		}
	}
	return defaultValue
}

func getEnvSlice(key string, defaultValue []string) []string {
	if value := os.Getenv(key); value != "" {
		return strings.Split(value, ",")
	}
	return defaultValue
}

func getEnvDuration(key string, defaultValue time.Duration) time.Duration {
	if value := os.Getenv(key); value != "" {
		parsed, err := time.ParseDuration(value)
		if err == nil {
			return parsed
		}
	}
	return defaultValue
}
