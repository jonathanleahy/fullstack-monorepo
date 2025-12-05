import { useState, useEffect } from 'react';
import type { Difficulty, LibraryCourse, LessonInput } from '../types/course';
import {
  Button,
  Input,
  Label,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@repo/playbook';

export interface CourseFormData {
  title: string;
  description: string;
  author: string;
  difficulty: Difficulty;
  estimatedHours: number;
  lessons: LessonInput[];
}

interface CourseFormProps {
  initialData?: LibraryCourse;
  onSubmit: (data: CourseFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const EMPTY_FORM: CourseFormData = {
  title: '',
  description: '',
  author: '',
  difficulty: 'BEGINNER',
  estimatedHours: 1,
  lessons: [],
};

export function CourseForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Save Course',
}: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CourseFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        author: initialData.author,
        difficulty: initialData.difficulty,
        estimatedHours: initialData.estimatedHours,
        lessons: initialData.lessons.map((l) => ({
          title: l.title,
          content: l.content,
          order: l.order,
        })),
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CourseFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    if (formData.estimatedHours < 1) {
      newErrors.estimatedHours = 'Estimated hours must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const updateField = <K extends keyof CourseFormData>(
    field: K,
    value: CourseFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Introduction to Go"
              aria-invalid={!!errors.title}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Learn the fundamentals of Go programming..."
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => updateField('author', e.target.value)}
                placeholder="John Doe"
                aria-invalid={!!errors.author}
              />
              {errors.author && (
                <p className="text-sm text-red-600">{errors.author}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) =>
                  updateField('difficulty', e.target.value as Difficulty)
                }
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                min={1}
                value={formData.estimatedHours}
                onChange={(e) =>
                  updateField('estimatedHours', parseInt(e.target.value, 10) || 1)
                }
                aria-invalid={!!errors.estimatedHours}
              />
              {errors.estimatedHours && (
                <p className="text-sm text-red-600">{errors.estimatedHours}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
