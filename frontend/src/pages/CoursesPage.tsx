import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLibraryCourses } from '../hooks/useCourses';
import { courseService } from '../services/courseService';
import type { Difficulty } from '../types/course';
import {
  Button,
  Input,
  Select,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  TagFilter,
  CardContent,
  CardFooter,
} from '@repo/playbook';

const difficultyVariant: Record<Difficulty, 'success' | 'warning' | 'danger'> = {
  BEGINNER: 'success',
  INTERMEDIATE: 'warning',
  ADVANCED: 'danger',
};

export function CoursesPage() {
  const { courses, total, isLoading, error, fetchCourses, searchCourses } = useLibraryCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const tags = await courseService.getAllTags();
        setAvailableTags(tags);
      } catch {
        // Silently fail - tags are optional
      }
    };
    loadTags();
  }, []);

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
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Course Library</h1>
          <p className="text-muted-foreground">Browse and enroll in courses to start learning</p>
        </div>
        <Link to="/courses/new">
          <Button>Create Course</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="flex-1"
          />
          <Button type="submit">
            Search
          </Button>
          {searchQuery && (
            <Button type="button" variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </form>

        <Select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | '')}
        >
          <option value="">All Difficulties</option>
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </Select>
      </div>

      {/* Tag Filter */}
      {availableTags.length > 0 && (
        <div className="mb-6">
          <TagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading courses...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <Card className="bg-red-50 border-red-200 mb-6">
          <CardContent className="pt-6 text-red-600">
            {error}
          </CardContent>
        </Card>
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
          {courses
            .filter(course =>
              selectedTags.length === 0 ||
              selectedTags.some(tag => course.tags?.includes(tag))
            )
            .map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <Badge variant={difficultyVariant[course.difficulty]}>
                      {course.difficulty.toLowerCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2 mb-4">
                    {course.description}
                  </CardDescription>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {course.author}</span>
                    <span>{course.estimatedHours}h</span>
                  </div>
                  {course.tags && course.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {course.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {course.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{course.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  {course.lessons.length} lesson{course.lessons.length !== 1 ? 's' : ''}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found.</p>
          {searchQuery && (
            <Button variant="link" onClick={clearSearch} className="mt-2">
              Clear search
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
