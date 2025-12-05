import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from '@repo/playbook';
import { useAuth } from '../hooks/useAuth';
import { courseService } from '../services/courseService';
import type { LibraryCourse, UserCourse } from '../types/course';

interface EnrollButtonProps {
  course: LibraryCourse;
  onEnrollmentChange?: (userCourse: UserCourse | null) => void;
}

export function EnrollButton({ course, onEnrollmentChange }: EnrollButtonProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActioning, setIsActioning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const enrolled = await courseService.getUserCourseByLibraryCourse(course.id);
        setUserCourse(enrolled);
        onEnrollmentChange?.(enrolled);
      } catch (err) {
        console.error('Failed to check enrollment:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkEnrollment();
  }, [course.id, isAuthenticated, onEnrollmentChange]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${course.id}` } });
      return;
    }

    setIsActioning(true);
    setError(null);

    try {
      const enrolled = await courseService.enrollInCourse(course.id);
      setUserCourse(enrolled);
      onEnrollmentChange?.(enrolled);
    } catch (err) {
      setError('Failed to enroll in course');
      console.error('Enrollment error:', err);
    } finally {
      setIsActioning(false);
    }
  };

  const handleUnenroll = async () => {
    if (!userCourse) return;

    if (!confirm('Are you sure you want to unenroll from this course? Your progress will be lost.')) {
      return;
    }

    setIsActioning(true);
    setError(null);

    try {
      await courseService.unenrollFromCourse(course.id);
      setUserCourse(null);
      onEnrollmentChange?.(null);
    } catch (err) {
      setError('Failed to unenroll from course');
      console.error('Unenroll error:', err);
    } finally {
      setIsActioning(false);
    }
  };

  const handleContinue = () => {
    if (!userCourse) return;
    navigate(`/courses/${course.id}`);
  };

  if (isLoading) {
    return (
      <Button disabled className="w-full">
        Loading...
      </Button>
    );
  }

  const isCompleted = userCourse?.completedAt != null;

  if (isCompleted) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 py-3">
          <Badge variant="default" className="bg-green-500 text-white">
            Completed
          </Badge>
        </div>
        <Button
          onClick={handleContinue}
          variant="outline"
          className="w-full"
        >
          Review Course
        </Button>
        <Button
          onClick={handleUnenroll}
          variant="ghost"
          size="sm"
          disabled={isActioning}
          className="w-full text-sm text-muted-foreground"
        >
          Unenroll
        </Button>
      </div>
    );
  }

  if (userCourse) {
    return (
      <div className="space-y-2">
        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={isActioning}
        >
          Continue Learning
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          {userCourse.progress}% complete
        </div>
        <Button
          onClick={handleUnenroll}
          variant="ghost"
          size="sm"
          disabled={isActioning}
          className="w-full text-sm text-muted-foreground"
        >
          Unenroll
        </Button>
        {error && (
          <p className="text-xs text-red-600 text-center">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        onClick={handleEnroll}
        className="w-full"
        disabled={isActioning}
      >
        {isActioning ? 'Enrolling...' : isAuthenticated ? 'Enroll Now' : 'Sign In to Enroll'}
      </Button>
      {error && (
        <p className="text-xs text-red-600 text-center">{error}</p>
      )}
      {!isAuthenticated && (
        <p className="text-xs text-muted-foreground text-center">
          Create an account to track your progress
        </p>
      )}
    </div>
  );
}
