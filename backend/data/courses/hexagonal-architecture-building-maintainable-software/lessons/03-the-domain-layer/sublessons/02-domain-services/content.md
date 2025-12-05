# Domain Services

## Sam's Scenario

Sam needed to calculate late fees for overdue books. The logic involved both the Book entity (checking due date) and pricing rules (fee per day). Alex asked: "Where does this logic belong? Not in Book - it's about pricing policy. Not in the repository - that's infrastructure. You need a domain service."

Domain services handle business logic that spans multiple entities or doesn't naturally fit within one entity.

## What are Domain Services?

Domain services contain logic that doesn't belong to a single entity:

```go
package services

import (
    "time"
    "myapp/internal/domain/entities"
)

// LateFeeCalculator calculates fees for overdue books
type LateFeeCalculator struct {
    feePerDay    float64
    maxFee       float64
    graceDays    int
}

func NewLateFeeCalculator(feePerDay, maxFee float64, graceDays int) *LateFeeCalculator {
    return &LateFeeCalculator{
        feePerDay:  feePerDay,
        maxFee:     maxFee,
        graceDays:  graceDays,
    }
}

// CalculateFee returns the late fee for a book
func (s *LateFeeCalculator) CalculateFee(book *entities.Book) float64 {
    if !book.IsOverdue() {
        return 0.0
    }

    daysLate := int(time.Since(*book.DueDate).Hours() / 24)
    daysLate -= s.graceDays
    if daysLate <= 0 {
        return 0.0
    }

    fee := float64(daysLate) * s.feePerDay
    if fee > s.maxFee {
        return s.maxFee
    }
    return fee
}

// LoanEligibilityService checks if a user can borrow more books
type LoanEligibilityService struct {
    maxActiveLoans int
    maxOverdueLoans int
}

func NewLoanEligibilityService(maxActive, maxOverdue int) *LoanEligibilityService {
    return &LoanEligibilityService{
        maxActiveLoans: maxActive,
        maxOverdueLoans: maxOverdue,
    }
}

// CanBorrow checks if a user is eligible to borrow a book
func (s *LoanEligibilityService) CanBorrow(activeLoans, overdueLoans int) bool {
    if activeLoans >= s.maxActiveLoans {
        return false
    }
    if overdueLoans > s.maxOverdueLoans {
        return false
    }
    return true
}
```

## When to Use a Domain Service

- Logic involves multiple entities (Book + Loan + User)
- Logic doesn't naturally belong to one entity (pricing policy)
- Stateless operations (calculations)
- Examples: Late fee calculation, eligibility checks, ISBN validation rules

## Sam's Insight

"So domain services are for business logic that doesn't fit neatly into one entity," Sam summarized. "They're still pure domain - no databases, no HTTP - just business rules." Alex confirmed: "Exactly. Your LateFeeCalculator has zero dependencies. It just knows library policy."