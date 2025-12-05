import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { CourseForm, type CourseFormData } from '../components/CourseForm';
import { LessonEditor } from '../components/LessonEditor';
import { courseService } from '../services/courseService';
import { extractGraphQLError } from '../services/graphql';
import type { LibraryCourse, LessonInput } from '../types/course';
import { Button, Card, CardContent } from '@repo/playbook';

export function EditCoursePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<LibraryCourse | null>(null);
  const [lessons, setLessons] = useState<LessonInput[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        const data = await courseService.getLibraryCourse(id);
        if (data) {
          setCourse(data);
          setLessons(
            data.lessons.map((l) => ({
              title: l.title,
              content: l.content,
              order: l.order,
            }))
          );
        } else {
          setError('Course not found');
        }
      } catch (err) {
        setError(extractGraphQLError(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (formData: CourseFormData) => {
    if (!id) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await courseService.updateLibraryCourse(id, {
        ...formData,
        lessons,
      });
      navigate(`/courses/${id}`);
    } catch (err) {
      setError(extractGraphQLError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await courseService.deleteLibraryCourse(id);
      navigate('/courses');
    } catch (err) {
      setError(extractGraphQLError(err));
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/courses/${id}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6 text-red-600">
            {error || 'Course not found'}
          </CardContent>
        </Card>
        <div className="mt-4">
          <Link to="/courses">
            <Button variant="outline">← Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to={`/courses/${id}`} className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Course
        </Link>
      </div>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Course</h1>
          <p className="text-muted-foreground">
            Update course details and manage lessons.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowDeleteConfirm(true)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Delete Course
        </Button>
      </div>

      {error && (
        <Card className="mb-6 bg-red-50 border-red-200">
          <CardContent className="pt-6 text-red-600">
            {error}
          </CardContent>
        </Card>
      )}

      {showDeleteConfirm && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="font-medium text-red-800 mb-4">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete Course'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        <CourseForm
          initialData={course}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
        />

        <LessonEditor lessons={lessons} onChange={setLessons} />
      </div>
    </div>
  );
}
