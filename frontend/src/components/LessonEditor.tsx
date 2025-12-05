import { useState } from 'react';
import type { LessonInput } from '../types/course';
import {
  Button,
  Input,
  Label,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@repo/playbook';
import { MarkdownEditor } from './MarkdownEditor';

interface LessonEditorProps {
  lessons: LessonInput[];
  onChange: (lessons: LessonInput[]) => void;
}

interface EditingLesson {
  index: number | null;
  title: string;
  content: string;
}

const EMPTY_LESSON: EditingLesson = {
  index: null,
  title: '',
  content: '',
};

export function LessonEditor({ lessons, onChange }: LessonEditorProps) {
  const [editing, setEditing] = useState<EditingLesson | null>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const validate = (): boolean => {
    const newErrors: { title?: string; content?: string } = {};
    if (!editing?.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!editing?.content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddLesson = () => {
    setEditing(EMPTY_LESSON);
    setErrors({});
  };

  const handleEditLesson = (index: number) => {
    const lesson = lessons[index];
    setEditing({
      index,
      title: lesson.title,
      content: lesson.content,
    });
    setErrors({});
  };

  const handleSaveLesson = () => {
    if (!editing || !validate()) return;

    const newLessons = [...lessons];
    const lessonData: LessonInput = {
      title: editing.title.trim(),
      content: editing.content.trim(),
      order: editing.index !== null ? lessons[editing.index].order : lessons.length + 1,
    };

    if (editing.index !== null) {
      newLessons[editing.index] = lessonData;
    } else {
      newLessons.push(lessonData);
    }

    onChange(newLessons);
    setEditing(null);
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setErrors({});
  };

  const handleDeleteLesson = (index: number) => {
    const newLessons = lessons
      .filter((_, i) => i !== index)
      .map((lesson, i) => ({ ...lesson, order: i + 1 }));
    onChange(newLessons);
  };

  const handleMoveLesson = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === lessons.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newLessons = [...lessons];
    [newLessons[index], newLessons[newIndex]] = [newLessons[newIndex], newLessons[index]];

    onChange(newLessons.map((lesson, i) => ({ ...lesson, order: i + 1 })));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Lessons ({lessons.length})</CardTitle>
        {!editing && (
          <Button onClick={handleAddLesson}>Add Lesson</Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {editing && (
          <Card className="border-primary">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lesson-title">Lesson Title</Label>
                <Input
                  id="lesson-title"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((prev) => prev && { ...prev, title: e.target.value })
                  }
                  placeholder="Getting Started with Go"
                  aria-invalid={!!errors.title}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lesson-content">Content (Markdown supported)</Label>
                <MarkdownEditor
                  value={editing.content}
                  onChange={(value) =>
                    setEditing((prev) => prev && { ...prev, content: value })
                  }
                  placeholder="Write your lesson content in Markdown..."
                  minHeight={250}
                />
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveLesson}>
                  {editing.index !== null ? 'Update Lesson' : 'Add Lesson'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {lessons.length === 0 && !editing ? (
          <p className="text-center py-8 text-muted-foreground">
            No lessons yet. Click "Add Lesson" to create your first lesson.
          </p>
        ) : (
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 border rounded-md bg-muted/30"
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveLesson(index, 'up')}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                    aria-label="Move up"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveLesson(index, 'down')}
                    disabled={index === lessons.length - 1}
                    className="h-6 w-6 p-0"
                    aria-label="Move down"
                  >
                    ↓
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {index + 1}. {lesson.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {lesson.content.substring(0, 100)}
                    {lesson.content.length > 100 ? '...' : ''}
                  </p>
                </div>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditLesson(index)}
                    disabled={editing !== null}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteLesson(index)}
                    disabled={editing !== null}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {lessons.length > 0 && (
        <CardFooter className="text-sm text-muted-foreground">
          Drag lessons to reorder, or use the arrow buttons.
        </CardFooter>
      )}
    </Card>
  );
}
