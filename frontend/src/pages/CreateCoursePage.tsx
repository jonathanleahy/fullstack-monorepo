import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CourseForm, type CourseFormData } from '../components/CourseForm';
import { LessonEditor } from '../components/LessonEditor';
import { courseService } from '../services/courseService';
import { extractGraphQLError } from '../services/graphql';
import { useAuth } from '../hooks/useAuth';
import type { LessonInput } from '../types/course';
import { Button, Card, CardContent } from '@repo/playbook';

export function CreateCoursePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lessons, setLessons] = useState<LessonInput[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: CourseFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const course = await courseService.createLibraryCourse({
        ...formData,
        lessons,
        author: formData.author || user?.name || 'Anonymous',
      });
      navigate(`/courses/${course.id}`);
    } catch (err) {
      setError(extractGraphQLError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/courses');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Courses
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
        <p className="text-muted-foreground">
          Fill in the course details and add lessons to create your course.
        </p>
      </div>

      {error && (
        <Card className="mb-6 bg-red-50 border-red-200">
          <CardContent className="pt-6 text-red-600">
            {error}
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        <CourseForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitLabel="Create Course"
        />

        <LessonEditor lessons={lessons} onChange={setLessons} />

        {lessons.length === 0 && (
          <p className="text-sm text-amber-600 bg-amber-50 p-4 rounded-md">
            Tip: Add at least one lesson before creating the course. You can always add more later.
          </p>
        )}
      </div>
    </div>
  );
}
