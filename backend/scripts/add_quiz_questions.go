// +build ignore

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

type QuizQuestion struct {
	ID           string   `json:"ID"`
	Question     string   `json:"Question"`
	Options      []string `json:"Options"`
	CorrectIndex int      `json:"CorrectIndex"`
	Explanation  string   `json:"Explanation"`
}

type Quiz struct {
	Questions []QuizQuestion `json:"Questions"`
}

type Lesson struct {
	Title      string   `json:"Title"`
	Content    string   `json:"Content"`
	Order      int      `json:"Order"`
	Sublessons []Lesson `json:"Sublessons,omitempty"`
	Quiz       *Quiz    `json:"Quiz,omitempty"`
}

func main() {
	// Open database - use absolute path for Docker
	dbPath := "/app/data/app.db"

	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Find the hex architecture course by title
	var courseID string
	var lessonsJSON string
	err = db.QueryRow(`SELECT id, lessons FROM library_courses WHERE title LIKE '%Hexagonal%' LIMIT 1`).Scan(&courseID, &lessonsJSON)
	if err != nil {
		log.Fatal("Could not find Hexagonal Architecture course:", err)
	}
	fmt.Printf("Found course ID: %s\n", courseID)

	// Parse existing lessons
	var lessons []Lesson
	if err := json.Unmarshal([]byte(lessonsJSON), &lessons); err != nil {
		log.Fatal("Failed to parse lessons:", err)
	}

	// Add quizzes to lessons
	lessons = addQuizzesToLessons(lessons)

	// Marshal back to JSON
	updatedLessons, err := json.Marshal(lessons)
	if err != nil {
		log.Fatal("Failed to marshal lessons:", err)
	}

	// Update the database
	_, err = db.Exec(`UPDATE library_courses SET lessons = ? WHERE id = ?`, string(updatedLessons), courseID)
	if err != nil {
		log.Fatal("Failed to update course:", err)
	}

	fmt.Println("Successfully added quizzes to the Hexagonal Architecture course!")
}

func addQuizzesToLessons(lessons []Lesson) []Lesson {
	// Define quizzes for each lesson based on ACTUAL lesson content
	// Each quiz tests what that specific lesson teaches

	// Lesson 0: Introduction to Hexagonal Architecture
	// Content: Just overview mindmap + prerequisites - NO TEACHABLE CONTENT
	// Therefore: NO QUIZ for introduction
	if len(lessons) > 0 {
		lessons[0].Quiz = nil // Introduction has no quiz
	}

	// Lesson 1: Core Concepts: Ports
	// Content teaches: Ports overview diagram showing Driving Ports (UserService, OrderService, PaymentService)
	// and Driven Ports (UserRepository, OrderRepository, EmailSender)
	if len(lessons) > 1 {
		lessons[1].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "ports-1",
					Question: "According to the diagram, what are examples of Driving Ports?",
					Options: []string{
						"UserRepository, OrderRepository, EmailSender",
						"UserService, OrderService, PaymentService",
						"Database, Cache, Queue",
						"HTTP, GraphQL, gRPC",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows UserService, OrderService, and PaymentService as examples of Driving Ports. These are the interfaces that external systems call to drive the application.",
				},
				{
					ID:       "ports-2",
					Question: "According to the diagram, what are examples of Driven Ports?",
					Options: []string{
						"UserService, OrderService, PaymentService",
						"HTTP Handler, CLI, GraphQL Resolver",
						"UserRepository, OrderRepository, EmailSender",
						"React, Vue, Angular",
					},
					CorrectIndex: 2,
					Explanation:  "The diagram shows UserRepository, OrderRepository, and EmailSender as examples of Driven Ports. These are interfaces that the application calls to interact with external systems.",
				},
				{
					ID:       "ports-3",
					Question: "In the diagram, what direction do Driving Ports flow?",
					Options: []string{
						"Driving Ports call Use Cases",
						"Use Cases call Driving Ports",
						"Driving Ports call Driven Ports directly",
						"Driven Ports call Driving Ports",
					},
					CorrectIndex: 0,
					Explanation:  "The diagram shows arrows from Driving Ports to Use Cases with the label 'calls'. Driving Ports receive external input and call the application's use cases.",
				},
			},
		}
	}

	// Lesson 2: Core Concepts: Adapters
	// Content teaches: Adapter architecture diagram showing Driving Adapters (HTTP/REST, GraphQL, gRPC, CLI)
	// and Driven Adapters (PostgreSQL, MongoDB, Redis, AWS SES)
	if len(lessons) > 2 {
		lessons[2].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "adapters-1",
					Question: "According to the diagram, which of these are Driving Adapters (Inbound)?",
					Options: []string{
						"PostgreSQL, MongoDB, Redis, AWS SES",
						"HTTP/REST, GraphQL, gRPC, CLI",
						"UserRepository, OrderRepository",
						"Entities, Value Objects, Services",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows HTTP/REST, GraphQL, gRPC, and CLI as Driving Adapters. These handle inbound requests and translate them for the application.",
				},
				{
					ID:       "adapters-2",
					Question: "According to the diagram, which of these are Driven Adapters (Outbound)?",
					Options: []string{
						"HTTP/REST, GraphQL, gRPC, CLI",
						"UserService, OrderService, PaymentService",
						"PostgreSQL, MongoDB, Redis, AWS SES",
						"Ports, Use Cases, Domain",
					},
					CorrectIndex: 2,
					Explanation:  "The diagram shows PostgreSQL, MongoDB, Redis, and AWS SES as Driven Adapters. These are the concrete implementations that the application drives for external operations.",
				},
				{
					ID:       "adapters-3",
					Question: "What is the relationship between adapters and ports shown in the diagram?",
					Options: []string{
						"Adapters contain ports",
						"Driving Adapters implement Driving Ports; Driven Ports are implemented by Driven Adapters",
						"Ports and adapters are the same thing",
						"Adapters bypass ports entirely",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows arrows indicating that Driving Adapters 'implement' Driving Ports, and Driven Ports are 'implemented by' Driven Adapters.",
				},
			},
		}
	}

	// Lesson 3: The Domain Layer
	// Content teaches: Domain layer structure with Entities (User, Order, Product),
	// Value Objects (Money, Email, Address), Domain Services (AuthService, PricingService),
	// Domain Errors (ErrUserNotFound, ErrInvalidEmail, ErrInsufficientFunds)
	if len(lessons) > 3 {
		lessons[3].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "domain-1",
					Question: "According to the diagram, what are examples of Entities in the Domain Layer?",
					Options: []string{
						"Money, Email, Address",
						"AuthService, PricingService",
						"User, Order, Product",
						"ErrUserNotFound, ErrInvalidEmail",
					},
					CorrectIndex: 2,
					Explanation:  "The diagram shows User, Order, and Product as examples of Entities in the Domain Layer. Entities are the core business objects.",
				},
				{
					ID:       "domain-2",
					Question: "According to the diagram, what are examples of Value Objects?",
					Options: []string{
						"User, Order, Product",
						"Money, Email, Address",
						"AuthService, PricingService",
						"PostgreSQL, MongoDB, Redis",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows Money, Email, and Address as Value Objects. These are immutable objects defined by their attributes rather than identity.",
				},
				{
					ID:       "domain-3",
					Question: "What are the four sections of the Domain Layer shown in the diagram?",
					Options: []string{
						"Controllers, Services, Repositories, Views",
						"Entities, Value Objects, Domain Services, Domain Errors",
						"HTTP, GraphQL, gRPC, CLI",
						"Create, Read, Update, Delete",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows the Domain Layer containing Entities, Value Objects, Domain Services, and Domain Errors as its four main sections.",
				},
			},
		}
	}

	// Lesson 4: Use Cases: Orchestrating Operations
	// Content teaches: Use cases position between Driving Adapters and Domain/Driven Adapters
	// Examples: CreateUser, GetUser, UpdateUser
	if len(lessons) > 4 {
		lessons[4].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "usecases-1",
					Question: "According to the diagram, what are examples of Use Cases?",
					Options: []string{
						"HTTP Handler, GraphQL",
						"CreateUser, GetUser, UpdateUser",
						"Repository, Email Sender",
						"Entities, Domain Services",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows CreateUser, GetUser, and UpdateUser as examples of Use Cases. Each use case represents a single business operation.",
				},
				{
					ID:       "usecases-2",
					Question: "In the diagram, what calls the Use Cases?",
					Options: []string{
						"Driven Adapters (Repository, Email Sender)",
						"Domain Entities and Services",
						"Driving Adapters (HTTP Handler, GraphQL)",
						"The database directly",
					},
					CorrectIndex: 2,
					Explanation:  "The diagram shows arrows from Driving Adapters (HTTP Handler, GraphQL) pointing to Use Cases. Driving adapters receive external requests and call use cases.",
				},
				{
					ID:       "usecases-3",
					Question: "In the diagram, what do Use Cases interact with?",
					Options: []string{
						"Only the database",
						"Only HTTP handlers",
						"Both Domain (Entities, Services) and Driven Adapters (Repository, Email Sender)",
						"Only external APIs",
					},
					CorrectIndex: 2,
					Explanation:  "The diagram shows Use Cases with arrows pointing to both Domain (Entities, Domain Services) and Driven Adapters (Repository, Email Sender).",
				},
			},
		}
	}

	// Lesson 5: Project Structure
	// Content teaches: Directory layout (cmd, domain, application, adapters, config)
	// Dependency direction: Adapters → Application → Domain
	if len(lessons) > 5 {
		lessons[5].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "structure-1",
					Question: "According to the diagram, what are the main directories in a Hexagonal Architecture project?",
					Options: []string{
						"src, lib, bin, test",
						"cmd, domain, application, adapters, config",
						"models, views, controllers",
						"frontend, backend, shared",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows cmd/ (Entry points), domain/ (THE CORE), application/ (Use cases), adapters/ (Infrastructure), and config/ (Configuration) as the main directories.",
				},
				{
					ID:       "structure-2",
					Question: "According to the lesson, what is the dependency direction in Hexagonal Architecture?",
					Options: []string{
						"Domain → Application → Adapters",
						"Adapters → Application → Domain",
						"All layers depend on each other equally",
						"Application → Domain → Adapters",
					},
					CorrectIndex: 1,
					Explanation:  "The lesson states: Dependencies always point inward: Adapters → Application → Domain. Never: Domain → Adapters.",
				},
				{
					ID:       "structure-3",
					Question: "According to the diagram, what belongs in the domain/ directory?",
					Options: []string{
						"HTTP handlers and GraphQL resolvers",
						"entities/, services/, repositories/ (interfaces)",
						"Database connection code",
						"Configuration files",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows domain/ containing entities/, services/, and repositories/ (interfaces). This is the core business logic.",
				},
			},
		}
	}

	// Lesson 6: Testing Hexagonal Applications
	// Content teaches: Testing pyramid (E2E Tests, Integration Tests, Use Case Tests, Domain Unit Tests)
	if len(lessons) > 6 {
		lessons[6].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "testing-1",
					Question: "According to the Testing Pyramid diagram, which layer should have the MOST tests?",
					Options: []string{
						"E2E Tests",
						"Integration Tests",
						"Use Case Tests",
						"Domain Unit Tests",
					},
					CorrectIndex: 3,
					Explanation:  "The pyramid shows Domain Unit Tests at the bottom labeled '(Many)'. The base of the testing pyramid should have the most tests.",
				},
				{
					ID:       "testing-2",
					Question: "According to the Testing Pyramid diagram, which layer should have the FEWEST tests?",
					Options: []string{
						"Domain Unit Tests",
						"Use Case Tests",
						"Integration Tests",
						"E2E Tests",
					},
					CorrectIndex: 3,
					Explanation:  "The pyramid shows E2E Tests at the top labeled '(Few)'. End-to-end tests are expensive and should be used sparingly.",
				},
				{
					ID:       "testing-3",
					Question: "What are the four layers of the Testing Pyramid shown in the diagram?",
					Options: []string{
						"Unit, Integration, System, Acceptance",
						"E2E Tests, Integration Tests, Use Case Tests, Domain Unit Tests",
						"Frontend, Backend, Database, API",
						"White box, Black box, Gray box, Clear box",
					},
					CorrectIndex: 1,
					Explanation:  "The diagram shows four layers: E2E Tests (Few), Integration Tests (Some), Use Case Tests (More), and Domain Unit Tests (Many).",
				},
			},
		}
	}

	// Lesson 7: Putting It All Together
	// Content teaches: Complete architecture diagram, Benefits table, When to use guidance
	if len(lessons) > 7 {
		lessons[7].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "summary-1",
					Question: "According to the benefits table, how does Hex Arch achieve Testability?",
					Options: []string{
						"By using faster databases",
						"Domain has no dependencies, use mocks for adapters",
						"By generating tests automatically",
						"By reducing code size",
					},
					CorrectIndex: 1,
					Explanation:  "The benefits table states that Testability is achieved because 'Domain has no dependencies, use mocks for adapters'.",
				},
				{
					ID:       "summary-2",
					Question: "According to the lesson, when is Hexagonal Architecture a GOOD fit?",
					Options: []string{
						"Simple CRUD applications",
						"Prototypes or throwaway code",
						"Long-lived applications with complex business logic",
						"Very small teams or solo projects",
					},
					CorrectIndex: 2,
					Explanation:  "The lesson lists 'Long-lived applications' and 'Complex business logic' as good fits for Hexagonal Architecture.",
				},
				{
					ID:       "summary-3",
					Question: "According to the lesson, when is Hexagonal Architecture OVERKILL?",
					Options: []string{
						"Applications with multiple interfaces (web, mobile, CLI)",
						"Teams larger than 2-3 developers",
						"Simple CRUD applications or prototypes",
						"Systems with complex business logic",
					},
					CorrectIndex: 2,
					Explanation:  "The lesson lists 'Simple CRUD applications', 'Prototypes or throwaway code', and 'Very small teams or solo projects' as cases where Hex Arch is overkill.",
				},
			},
		}
	}

	return lessons
}
