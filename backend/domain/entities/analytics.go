package entities

import (
	"time"
)

// CourseView represents a single view event for a course
type CourseView struct {
	ID              string
	LibraryCourseID string
	UserID          string // can be empty for anonymous views
	ViewedAt        time.Time
}

// NewCourseView creates a new CourseView
func NewCourseView(libraryCourseID, userID string) (*CourseView, error) {
	if libraryCourseID == "" {
		return nil, ErrInvalidCourseID
	}

	return &CourseView{
		LibraryCourseID: libraryCourseID,
		UserID:          userID, // can be empty
		ViewedAt:        time.Now(),
	}, nil
}

// CourseAnalytics represents aggregated analytics data for a course
type CourseAnalytics struct {
	LibraryCourseID  string
	TotalViews       int
	UniqueViews      int
	TotalEnrollments int
	CompletionRate   float64 // percentage of enrolled users who completed
	AverageProgress  float64 // average progress of enrolled users
}

// NewCourseAnalytics creates a new CourseAnalytics instance
func NewCourseAnalytics(libraryCourseID string) *CourseAnalytics {
	return &CourseAnalytics{
		LibraryCourseID:  libraryCourseID,
		TotalViews:       0,
		UniqueViews:      0,
		TotalEnrollments: 0,
		CompletionRate:   0.0,
		AverageProgress:  0.0,
	}
}
