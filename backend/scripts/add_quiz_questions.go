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
	// Define quizzes for each lesson based on content

	// Lesson 1: Introduction to Hexagonal Architecture
	if len(lessons) > 0 {
		lessons[0].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "intro-1",
					Question: "What is the main goal of Hexagonal Architecture?",
					Options: []string{
						"To make the application run faster",
						"To isolate business logic from external dependencies",
						"To reduce the number of files in a project",
						"To eliminate the need for databases",
					},
					CorrectIndex: 1,
					Explanation:  "Hexagonal Architecture's core principle is that business logic should not know or care about the outside world. This isolation makes the system more maintainable and testable.",
				},
				{
					ID:       "intro-2",
					Question: "Who invented Hexagonal Architecture and in what year?",
					Options: []string{
						"Martin Fowler in 2003",
						"Robert C. Martin in 2008",
						"Alistair Cockburn in 2005",
						"Eric Evans in 2004",
					},
					CorrectIndex: 2,
					Explanation:  "Hexagonal Architecture was invented by Alistair Cockburn in 2005, also known as 'Ports and Adapters' architecture.",
				},
				{
					ID:       "intro-3",
					Question: "What are the main components of Hexagonal Architecture?",
					Options: []string{
						"Models, Views, and Controllers",
						"Ports, Adapters, and Domain",
						"Services, Repositories, and Entities",
						"Layers, Modules, and Components",
					},
					CorrectIndex: 1,
					Explanation:  "The three main components of Hexagonal Architecture are Ports (interfaces), Adapters (implementations), and the Domain (core business logic).",
				},
			},
		}

		// Add quizzes to sublessons
		if len(lessons[0].Sublessons) > 0 {
			// Sublesson 1: The Problem
			lessons[0].Sublessons[0].Quiz = &Quiz{
				Questions: []QuizQuestion{
					{
						ID:       "problem-1",
						Question: "What is a major problem with traditional architecture where business logic is mixed with database calls?",
						Options: []string{
							"The code runs slower",
							"Testing requires real databases and external services",
							"The application uses more memory",
							"It's harder to write documentation",
						},
						CorrectIndex: 1,
						Explanation:  "When business logic is tightly coupled with databases and external services, testing becomes painful because you need real instances of these dependencies.",
					},
					{
						ID:       "problem-2",
						Question: "In the example e-commerce code, why is placing database calls directly in HTTP handlers problematic?",
						Options: []string{
							"HTTP handlers can't access databases",
							"Database calls are too slow for HTTP",
							"Changes to the database affect HTTP handling code",
							"HTTP handlers should only return HTML",
						},
						CorrectIndex: 2,
						Explanation:  "When database calls are directly in HTTP handlers, any change to the database implementation requires modifying the HTTP handler, violating the principle of separation of concerns.",
					},
				},
			}

			// Sublesson 2: The Big Picture
			if len(lessons[0].Sublessons) > 1 {
				lessons[0].Sublessons[1].Quiz = &Quiz{
					Questions: []QuizQuestion{
						{
							ID:       "bigpic-1",
							Question: "In Hexagonal Architecture, what are 'Driving Adapters'?",
							Options: []string{
								"Adapters that connect to databases",
								"Adapters that receive input and call the application",
								"Adapters that send emails",
								"Adapters that handle caching",
							},
							CorrectIndex: 1,
							Explanation:  "Driving Adapters (primary adapters) are those that drive the application - they receive input from the outside world (HTTP requests, CLI commands, queue messages) and call the application's use cases.",
						},
						{
							ID:       "bigpic-2",
							Question: "In Hexagonal Architecture, what are 'Driven Adapters'?",
							Options: []string{
								"Adapters that receive HTTP requests",
								"Adapters that handle user input",
								"Adapters that the application calls to interact with external systems",
								"Adapters that drive performance improvements",
							},
							CorrectIndex: 2,
							Explanation:  "Driven Adapters (secondary adapters) are called by the application to interact with the outside world - like databases, email services, payment gateways, etc.",
						},
						{
							ID:       "bigpic-3",
							Question: "Why is it called 'Hexagonal' Architecture?",
							Options: []string{
								"Because it requires exactly 6 adapters",
								"Because the diagram is drawn as a hexagon to represent multiple ports",
								"Because it has 6 layers",
								"Because it was developed in the 6th month of 2005",
							},
							CorrectIndex: 1,
							Explanation:  "The hexagon shape represents that there can be multiple ports around the domain core. The specific shape doesn't have mathematical significance - it's just a convenient way to visualize the architecture.",
						},
					},
				}
			}
		}
	}

	// Lesson 2: Core Concepts (Ports)
	if len(lessons) > 1 {
		lessons[1].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "ports-1",
					Question: "What is a 'Port' in Hexagonal Architecture?",
					Options: []string{
						"A network port number like 8080",
						"An interface that defines how the domain communicates with the outside world",
						"A physical connection point",
						"A type of database connection",
					},
					CorrectIndex: 1,
					Explanation:  "A Port is an interface that defines how communication happens between the domain and the outside world. It's a contract that adapters implement.",
				},
				{
					ID:       "ports-2",
					Question: "What is a 'Driving Port' also known as?",
					Options: []string{
						"Secondary Port",
						"Output Port",
						"Primary Port or Input Port",
						"Database Port",
					},
					CorrectIndex: 2,
					Explanation:  "Driving Ports (Primary Ports/Input Ports) define the API that the application exposes to the outside world. They are called by driving adapters to trigger use cases.",
				},
				{
					ID:       "ports-3",
					Question: "What is a 'Driven Port' also known as?",
					Options: []string{
						"Primary Port",
						"Input Port",
						"Secondary Port or Output Port",
						"HTTP Port",
					},
					CorrectIndex: 2,
					Explanation:  "Driven Ports (Secondary Ports/Output Ports) define the interfaces that the application needs from the outside world (like repositories, notification services, etc.).",
				},
			},
		}

		// Sublessons for Ports
		if len(lessons[1].Sublessons) > 0 {
			lessons[1].Sublessons[0].Quiz = &Quiz{
				Questions: []QuizQuestion{
					{
						ID:       "driving-port-1",
						Question: "Which component is typically responsible for implementing a Driving Port interface?",
						Options: []string{
							"The database repository",
							"The domain service or use case",
							"The email service",
							"The external API client",
						},
						CorrectIndex: 1,
						Explanation:  "Driving Ports are implemented by domain services or use cases. The port defines the API, and the use case provides the actual business logic implementation.",
					},
				},
			}

			if len(lessons[1].Sublessons) > 1 {
				lessons[1].Sublessons[1].Quiz = &Quiz{
					Questions: []QuizQuestion{
						{
							ID:       "driven-port-1",
							Question: "In the OrderRepository interface example, what is the purpose of defining this as an interface rather than a concrete implementation?",
							Options: []string{
								"It makes the code run faster",
								"It allows swapping database implementations without changing business logic",
								"It reduces memory usage",
								"It's required by Go syntax",
							},
							CorrectIndex: 1,
							Explanation:  "By defining OrderRepository as an interface (driven port), the business logic depends only on the interface, not the implementation. This allows you to use a real database in production and a mock in tests.",
						},
					},
				}
			}
		}
	}

	// Lesson 3: Adapters
	if len(lessons) > 2 {
		lessons[2].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "adapters-1",
					Question: "What is the primary responsibility of an Adapter in Hexagonal Architecture?",
					Options: []string{
						"To contain business logic",
						"To translate between external systems and domain ports",
						"To store data in memory",
						"To generate documentation",
					},
					CorrectIndex: 1,
					Explanation:  "Adapters translate between the outside world and the domain. They implement ports and handle the technical details of communication with external systems.",
				},
				{
					ID:       "adapters-2",
					Question: "Which of the following is an example of a Driving Adapter?",
					Options: []string{
						"PostgreSQL repository implementation",
						"HTTP REST controller",
						"SMTP email sender",
						"Redis cache client",
					},
					CorrectIndex: 1,
					Explanation:  "An HTTP REST controller is a Driving Adapter - it receives requests from the outside world and drives the application by calling use cases.",
				},
				{
					ID:       "adapters-3",
					Question: "Which of the following is an example of a Driven Adapter?",
					Options: []string{
						"gRPC server",
						"CLI command handler",
						"GraphQL resolver",
						"PostgreSQL repository implementation",
					},
					CorrectIndex: 3,
					Explanation:  "A PostgreSQL repository implementation is a Driven Adapter - the application drives it when it needs to persist or retrieve data.",
				},
			},
		}
	}

	// Lesson 4: Dependency Rule
	if len(lessons) > 3 {
		lessons[3].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "deprule-1",
					Question: "According to the Dependency Rule, which direction should dependencies point?",
					Options: []string{
						"From domain towards adapters",
						"From adapters towards the domain core",
						"In any direction, as long as it's consistent",
						"From newer code to older code",
					},
					CorrectIndex: 1,
					Explanation:  "The Dependency Rule states that dependencies must point inward - adapters depend on ports, ports belong to the domain. The domain never depends on adapters.",
				},
				{
					ID:       "deprule-2",
					Question: "Why should the domain core never import adapter packages?",
					Options: []string{
						"It would make the code slower",
						"It would violate the Dependency Rule and create coupling to external systems",
						"It's not allowed in Go",
						"It would use too much memory",
					},
					CorrectIndex: 1,
					Explanation:  "If the domain imports adapter packages, it becomes coupled to specific implementations (like a specific database). This defeats the purpose of Hexagonal Architecture.",
				},
				{
					ID:       "deprule-3",
					Question: "What is Dependency Injection and why is it important in Hexagonal Architecture?",
					Options: []string{
						"A way to inject security vulnerabilities",
						"A technique to pass dependencies through constructors/parameters instead of creating them internally",
						"A method to inject code at runtime",
						"A database optimization technique",
					},
					CorrectIndex: 1,
					Explanation:  "Dependency Injection means passing dependencies (like repositories) to use cases instead of having use cases create them. This allows using different implementations (real vs mock) without changing the use case code.",
				},
			},
		}
	}

	// Lesson 5: Project Structure
	if len(lessons) > 4 {
		lessons[4].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "structure-1",
					Question: "In a typical Hexagonal Architecture Go project, where should entities be placed?",
					Options: []string{
						"adapters/http/",
						"domain/entities/",
						"infrastructure/",
						"cmd/",
					},
					CorrectIndex: 1,
					Explanation:  "Entities belong in the domain layer (domain/entities/) as they represent the core business concepts that the entire application revolves around.",
				},
				{
					ID:       "structure-2",
					Question: "Where should HTTP handlers/controllers be placed in a Hexagonal Architecture project?",
					Options: []string{
						"domain/",
						"application/usecases/",
						"adapters/http/ or adapters/api/",
						"domain/entities/",
					},
					CorrectIndex: 2,
					Explanation:  "HTTP handlers are driving adapters and should be placed in the adapters directory, typically under adapters/http/ or adapters/api/.",
				},
				{
					ID:       "structure-3",
					Question: "Where should repository interfaces (ports) be defined?",
					Options: []string{
						"In the same package as the implementation",
						"In the domain or application layer",
						"In the adapters/db package",
						"In the cmd package",
					},
					CorrectIndex: 1,
					Explanation:  "Repository interfaces (ports) should be defined in the domain or application layer because they represent the contract that the domain needs, not the implementation details.",
				},
			},
		}
	}

	// Lesson 6: Testing
	if len(lessons) > 5 {
		lessons[5].Quiz = &Quiz{
			Questions: []QuizQuestion{
				{
					ID:       "testing-1",
					Question: "What is a major benefit of Hexagonal Architecture for testing?",
					Options: []string{
						"Tests run faster because of caching",
						"You can test business logic without real databases or external services",
						"Tests are automatically generated",
						"You don't need to write tests",
					},
					CorrectIndex: 1,
					Explanation:  "Because business logic depends on interfaces (ports) rather than concrete implementations, you can substitute mock adapters for testing without needing real databases or external services.",
				},
				{
					ID:       "testing-2",
					Question: "What type of test would you write to test a use case in isolation?",
					Options: []string{
						"End-to-end test",
						"UI test",
						"Unit test with mock adapters",
						"Load test",
					},
					CorrectIndex: 2,
					Explanation:  "Use cases should be tested with unit tests using mock adapters. This tests the business logic in isolation without the complexity of real external systems.",
				},
				{
					ID:       "testing-3",
					Question: "When would you use a real database in tests with Hexagonal Architecture?",
					Options: []string{
						"Always - mocks are unreliable",
						"Never - always use mocks",
						"For integration tests to verify the adapter implementation",
						"Only in production",
					},
					CorrectIndex: 2,
					Explanation:  "Real databases are used in integration tests to verify that adapters correctly implement the ports. Unit tests use mocks, but integration tests verify the real implementations work correctly.",
				},
			},
		}
	}

	return lessons
}
