import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLibraryCourses } from '../hooks/useCourses';
import type { Difficulty } from '../types/course';

const difficultyColors: Record<Difficulty, string> = {
  BEGINNER: 'bg-green-100 text-green-800',
  INTERMEDIATE: 'bg-yellow-100 text-yellow-800',
  ADVANCED: 'bg-red-100 text-red-800',
};

export function CoursesPage() {
  const { courses, total, isLoading, error, fetchCourses, searchCourses } = useLibraryCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');

  useEffect(() => {
    fetchCourses(undefined, selectedDifficulty || undefined);
  }, [fetchCourses, selectedDifficulty]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchCourses(searchQuery.trim());
    } else {
      fetchCourses(undefined, selectedDifficulty || undefined);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    fetchCourses(undefined, selectedDifficulty || undefined);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Course Library</h1>
        <p className="text-muted-foreground">Browse and enroll in courses to start learning</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
            >
              Clear
            </button>
          )}
        </form>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | '')}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Difficulties</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading courses...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Results count */}
      {!isLoading && !error && (
        <p className="text-sm text-muted-foreground mb-4">
          {total} course{total !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Course grid */}
      {!isLoading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[course.difficulty]}`}>
                  {course.difficulty.toLowerCase()}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>By {course.author}</span>
                <span>{course.estimatedHours}h</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {course.lessons.length} lesson{course.lessons.length !== 1 ? 's' : ''}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found.</p>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="mt-2 text-primary hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
