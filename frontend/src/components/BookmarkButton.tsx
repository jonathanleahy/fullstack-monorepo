import { useState, useEffect } from 'react';
import { bookmarkService } from '../services/bookmarkService';
import { extractGraphQLError } from '../services/graphql';

interface BookmarkButtonProps {
  libraryCourseId: string;
  lessonIndex: number;
  courseTitle?: string;
  lessonTitle?: string;
  onBookmarkChange?: () => void;
}

export function BookmarkButton({
  libraryCourseId,
  lessonIndex,
  courseTitle,
  lessonTitle,
  onBookmarkChange,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkBookmarkStatus();
  }, [libraryCourseId, lessonIndex]);

  const checkBookmarkStatus = async () => {
    try {
      const bookmarks = await bookmarkService.getCourseBookmarks(libraryCourseId);
      const bookmark = bookmarks.find((b) => b.lessonIndex === lessonIndex);
      setIsBookmarked(!!bookmark);
      if (bookmark?.note) {
        setNote(bookmark.note);
      }
    } catch (err) {
      // Silently fail - user might not be authenticated
      console.error('Failed to check bookmark status:', err);
    }
  };

  const handleToggleBookmark = async () => {
    if (isBookmarked) {
      await handleRemoveBookmark();
    } else {
      setShowNoteInput(true);
    }
  };

  const handleAddBookmark = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await bookmarkService.addBookmark(libraryCourseId, lessonIndex, note || undefined);
      setIsBookmarked(true);
      setShowNoteInput(false);
      if (onBookmarkChange) {
        onBookmarkChange();
      }
    } catch (err) {
      setError(extractGraphQLError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBookmark = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await bookmarkService.removeBookmark(libraryCourseId, lessonIndex);
      setIsBookmarked(false);
      setNote('');
      if (onBookmarkChange) {
        onBookmarkChange();
      }
    } catch (err) {
      setError(extractGraphQLError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelNote = () => {
    setShowNoteInput(false);
    setNote('');
    setError(null);
  };

  if (showNoteInput) {
    return (
      <div className="relative inline-block">
        <div className="absolute z-10 mt-2 p-4 bg-white border rounded-lg shadow-lg w-80 -right-4">
          <h4 className="text-sm font-semibold mb-2">Add Bookmark</h4>
          {courseTitle && (
            <p className="text-xs text-muted-foreground mb-1">
              {courseTitle} - Lesson {lessonIndex + 1}
            </p>
          )}
          {lessonTitle && (
            <p className="text-xs text-muted-foreground mb-3">{lessonTitle}</p>
          )}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note (optional)..."
            className="w-full px-3 py-2 border rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            autoFocus
          />
          {error && (
            <p className="text-xs text-red-600 mb-2">{error}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleAddBookmark}
              disabled={isLoading}
              className="flex-1 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Bookmark'}
            </button>
            <button
              onClick={handleCancelNote}
              disabled={isLoading}
              className="px-3 py-1.5 text-sm border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block group">
      <button
        onClick={handleToggleBookmark}
        disabled={isLoading}
        className={`p-2 rounded-md transition-colors disabled:opacity-50 ${
          isBookmarked
            ? 'text-yellow-600 hover:text-yellow-700'
            : 'text-gray-400 hover:text-gray-600'
        }`}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <span className="text-xl">{isBookmarked ? '★' : '☆'}</span>
      </button>
      <div className="absolute hidden group-hover:block -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-20">
        {isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      </div>
      {error && (
        <p className="absolute -bottom-6 left-0 text-xs text-red-600 whitespace-nowrap">
          {error}
        </p>
      )}
    </div>
  );
}
