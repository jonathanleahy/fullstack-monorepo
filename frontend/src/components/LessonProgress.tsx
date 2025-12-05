import { useState } from 'react';
import { courseService } from '../services/courseService';
import type { UserCourse } from '../types/course';

interface LessonProgressProps {
  lessonIndex: number;
  userCourse: UserCourse | null;
  libraryCourseId: string;
  onProgressUpdate?: (userCourse: UserCourse) => void;
}

export function LessonProgress({
  lessonIndex,
  userCourse,
  libraryCourseId,
  onProgressUpdate,
}: LessonProgressProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCompleted = userCourse?.completedLessons?.includes(lessonIndex) ?? false;

  const handleToggleComplete = async () => {
    if (!userCourse) return;

    setIsUpdating(true);
    setError(null);

    try {
      const updated = await courseService.updateCourseProgress(
        libraryCourseId,
        lessonIndex,
        !isCompleted
      );
      onProgressUpdate?.(updated);
    } catch (err) {
      setError('Failed to update progress');
      console.error('Progress update error:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!userCourse) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggleComplete}
          disabled={isUpdating}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50 cursor-pointer"
        />
        <span className="text-sm text-muted-foreground">
          {isCompleted ? 'Completed' : 'Mark as complete'}
        </span>
      </label>
      {isUpdating && (
        <span className="text-xs text-muted-foreground">Saving...</span>
      )}
      {error && (
        <span className="text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}
