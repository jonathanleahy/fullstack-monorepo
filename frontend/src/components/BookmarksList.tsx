import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { bookmarkService } from '../services/bookmarkService';
import { courseService } from '../services/courseService';
import { extractGraphQLError } from '../services/graphql';
import type { Bookmark, LibraryCourse } from '../types/course';

interface BookmarkWithCourse extends Bookmark {
  course?: LibraryCourse;
}

export function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<BookmarkWithCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const bookmarkData = await bookmarkService.getMyBookmarks();

      // Fetch course details for each bookmark
      const bookmarksWithCourses = await Promise.all(
        bookmarkData.map(async (bookmark) => {
          try {
            const course = await courseService.getLibraryCourse(bookmark.libraryCourseId);
            return { ...bookmark, course: course || undefined };
          } catch {
            return bookmark;
          }
        })
      );

      setBookmarks(bookmarksWithCourses);
    } catch (err) {
      setError(extractGraphQLError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBookmark = async (bookmark: Bookmark) => {
    setDeletingId(bookmark.id);

    try {
      await bookmarkService.removeBookmark(
        bookmark.libraryCourseId,
        bookmark.lessonIndex
      );
      setBookmarks(bookmarks.filter((b) => b.id !== bookmark.id));
    } catch (err) {
      setError(extractGraphQLError(err));
    } finally {
      setDeletingId(null);
    }
  };

  // Group bookmarks by course
  const bookmarksByCourse = useMemo(() => {
    const grouped = new Map<string, BookmarkWithCourse[]>();

    bookmarks.forEach((bookmark) => {
      const courseId = bookmark.libraryCourseId;
      if (!grouped.has(courseId)) {
        grouped.set(courseId, []);
      }
      grouped.get(courseId)!.push(bookmark);
    });

    // Sort bookmarks within each course by lesson index
    grouped.forEach((bookmarkList) => {
      bookmarkList.sort((a, b) => a.lessonIndex - b.lessonIndex);
    });

    return grouped;
  }, [bookmarks]);

  // Get unique courses for filter
  const courses = useMemo(() => {
    return Array.from(
      new Map(
        bookmarks
          .filter((b) => b.course)
          .map((b) => [b.libraryCourseId, b.course!])
      ).values()
    );
  }, [bookmarks]);

  // Filter bookmarks
  const filteredBookmarks = useMemo(() => {
    let filtered = bookmarks;

    if (selectedCourse !== 'all') {
      filtered = filtered.filter((b) => b.libraryCourseId === selectedCourse);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((b) => {
        const courseTitle = b.course?.title.toLowerCase() || '';
        const lessonTitle =
          b.course?.lessons[b.lessonIndex]?.title.toLowerCase() || '';
        const note = b.note?.toLowerCase() || '';
        return (
          courseTitle.includes(query) ||
          lessonTitle.includes(query) ||
          note.includes(query)
        );
      });
    }

    return filtered;
  }, [bookmarks, selectedCourse, searchQuery]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-muted-foreground">Loading bookmarks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bookmarks, notes..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="sm:w-64">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookmarks list */}
      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">📚</span>
          <p className="text-muted-foreground mb-2">
            {searchQuery || selectedCourse !== 'all'
              ? 'No bookmarks match your filters'
              : 'No bookmarks yet'}
          </p>
          <p className="text-sm text-muted-foreground">
            {searchQuery || selectedCourse !== 'all'
              ? 'Try adjusting your search or filter'
              : 'Bookmark lessons to save them for later'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(bookmarksByCourse.entries()).map(([courseId, courseBookmarks]) => {
            // Filter bookmarks for this course
            const visibleBookmarks = courseBookmarks.filter((b) =>
              filteredBookmarks.includes(b)
            );

            if (visibleBookmarks.length === 0) return null;

            const course = courseBookmarks[0].course;

            return (
              <div key={courseId} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-semibold">
                    {course ? (
                      <Link
                        to={`/courses/${courseId}`}
                        className="hover:text-primary transition-colors"
                      >
                        {course.title}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">Unknown Course</span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {visibleBookmarks.length}{' '}
                    {visibleBookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
                  </p>
                </div>
                <div className="divide-y">
                  {visibleBookmarks.map((bookmark) => {
                    const lesson = course?.lessons[bookmark.lessonIndex];

                    return (
                      <div
                        key={bookmark.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-yellow-600">★</span>
                              <Link
                                to={`/courses/${courseId}`}
                                className="font-medium hover:text-primary transition-colors"
                              >
                                Lesson {bookmark.lessonIndex + 1}
                                {lesson ? `: ${lesson.title}` : ''}
                              </Link>
                            </div>
                            {bookmark.note && (
                              <p className="text-sm text-muted-foreground mt-2 pl-6">
                                {bookmark.note}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-2 pl-6">
                              Bookmarked on{' '}
                              {new Date(bookmark.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteBookmark(bookmark)}
                            disabled={deletingId === bookmark.id}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          >
                            {deletingId === bookmark.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
