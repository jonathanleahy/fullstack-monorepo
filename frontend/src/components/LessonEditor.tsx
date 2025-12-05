import { useState, useEffect } from 'react';
import type { LessonInput, Attachment } from '../types/course';
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
import { AttachmentList } from './AttachmentList';
import { AttachmentUpload } from './AttachmentUpload';
import { attachmentService } from '../services/attachmentService';

interface LessonEditorProps {
  lessons: LessonInput[];
  onChange: (lessons: LessonInput[]) => void;
  courseId?: string;
}

interface EditingLesson {
  path: number[]; // Path to the lesson being edited [parentIdx, subIdx, ...]
  title: string;
  content: string;
  isNew: boolean;
}

const EMPTY_LESSON: EditingLesson = {
  path: [],
  title: '',
  content: '',
  isNew: true,
};

// Helper to get a lesson by path
function getLessonByPath(lessons: LessonInput[], path: number[]): LessonInput | null {
  if (path.length === 0) return null;
  let current: LessonInput | undefined = lessons[path[0]];
  for (let i = 1; i < path.length; i++) {
    if (!current?.sublessons) return null;
    current = current.sublessons[path[i]];
  }
  return current || null;
}

// Helper to update a lesson at a given path
function updateLessonAtPath(
  lessons: LessonInput[],
  path: number[],
  updater: (lesson: LessonInput) => LessonInput
): LessonInput[] {
  if (path.length === 0) return lessons;

  const result = [...lessons];
  if (path.length === 1) {
    result[path[0]] = updater(result[path[0]]);
  } else {
    result[path[0]] = {
      ...result[path[0]],
      sublessons: updateLessonAtPath(
        result[path[0]].sublessons || [],
        path.slice(1),
        updater
      ),
    };
  }
  return result;
}

// Helper to delete a lesson at a given path
function deleteLessonAtPath(lessons: LessonInput[], path: number[]): LessonInput[] {
  if (path.length === 0) return lessons;

  if (path.length === 1) {
    return lessons
      .filter((_, i) => i !== path[0])
      .map((lesson, i) => ({ ...lesson, order: i + 1 }));
  }

  const result = [...lessons];
  result[path[0]] = {
    ...result[path[0]],
    sublessons: deleteLessonAtPath(result[path[0]].sublessons || [], path.slice(1)),
  };
  return result;
}

// Helper to add a lesson at a given path (as a child)
function addSublessonAtPath(
  lessons: LessonInput[],
  parentPath: number[],
  newLesson: LessonInput
): LessonInput[] {
  if (parentPath.length === 0) {
    return [...lessons, { ...newLesson, order: lessons.length + 1 }];
  }

  return updateLessonAtPath(lessons, parentPath, (parent) => ({
    ...parent,
    sublessons: [...(parent.sublessons || []), { ...newLesson, order: (parent.sublessons?.length || 0) + 1 }],
  }));
}

// Helper to generate display number
function getDisplayNumber(path: number[]): string {
  return path.map(p => p + 1).join('.');
}

// Recursive component to render a lesson item
interface LessonItemDisplayProps {
  lesson: LessonInput;
  path: number[];
  depth: number;
  isLast: boolean;
  onEdit: (path: number[]) => void;
  onDelete: (path: number[]) => void;
  onMove: (path: number[], direction: 'up' | 'down') => void;
  onAddSublesson: (parentPath: number[]) => void;
  editingPath: number[] | null;
  expanded: Set<string>;
  onToggleExpand: (pathKey: string) => void;
}

function LessonItemDisplay({
  lesson,
  path,
  depth,
  isLast,
  onEdit,
  onDelete,
  onMove,
  onAddSublesson,
  editingPath,
  expanded,
  onToggleExpand,
}: LessonItemDisplayProps) {
  const pathKey = path.join('-');
  const hasSublessons = lesson.sublessons && lesson.sublessons.length > 0;
  const isExpanded = expanded.has(pathKey);
  const isEditing = editingPath !== null;

  return (
    <div>
      <div
        className="flex items-center gap-2 p-3 border rounded-md bg-muted/30"
        style={{ marginLeft: `${depth * 16}px` }}
      >
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMove(path, 'up')}
            disabled={path[path.length - 1] === 0 || isEditing}
            className="h-6 w-6 p-0"
            aria-label="Move up"
          >
            ↑
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMove(path, 'down')}
            disabled={isLast || isEditing}
            className="h-6 w-6 p-0"
            aria-label="Move down"
          >
            ↓
          </Button>
        </div>

        {hasSublessons && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpand(pathKey)}
            className="h-6 w-6 p-0"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '▶'}
          </Button>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">
            {getDisplayNumber(path)}. {lesson.title}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {lesson.content.substring(0, 80)}
            {lesson.content.length > 80 ? '...' : ''}
          </p>
          {hasSublessons && (
            <p className="text-xs text-muted-foreground mt-1">
              {lesson.sublessons!.length} subchapter{lesson.sublessons!.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="flex gap-1 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddSublesson(path)}
            disabled={isEditing || depth >= 2}
            title={depth >= 2 ? 'Max nesting depth reached' : 'Add subchapter'}
          >
            + Sub
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(path)}
            disabled={isEditing}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(path)}
            disabled={isEditing}
            className="text-red-600 hover:text-red-700"
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Render sublessons */}
      {hasSublessons && isExpanded && (
        <div className="mt-2 space-y-2">
          {lesson.sublessons!.map((sublesson, idx) => (
            <LessonItemDisplay
              key={idx}
              lesson={sublesson}
              path={[...path, idx]}
              depth={depth + 1}
              isLast={idx === lesson.sublessons!.length - 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
              onAddSublesson={onAddSublesson}
              editingPath={editingPath}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function LessonEditor({ lessons, onChange, courseId }: LessonEditorProps) {
  const [editing, setEditing] = useState<EditingLesson | null>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [attachments, setAttachments] = useState<Record<string, Attachment[]>>({});
  const [loadingAttachments, setLoadingAttachments] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [addingSublessonTo, setAddingSublessonTo] = useState<number[] | null>(null);

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
    setEditing({ ...EMPTY_LESSON, path: [] });
    setAddingSublessonTo(null);
    setErrors({});
  };

  const handleAddSublesson = (parentPath: number[]) => {
    setEditing({ ...EMPTY_LESSON, path: parentPath });
    setAddingSublessonTo(parentPath);
    // Expand the parent to show where the sublesson will be added
    setExpanded(prev => new Set([...prev, parentPath.join('-')]));
    setErrors({});
  };

  const handleEditLesson = (path: number[]) => {
    const lesson = getLessonByPath(lessons, path);
    if (!lesson) return;

    setEditing({
      path,
      title: lesson.title,
      content: lesson.content,
      isNew: false,
    });
    setAddingSublessonTo(null);
    setErrors({});

    // Load attachments when editing a lesson (only for top-level lessons)
    if (courseId && path.length === 1 && !attachments[path.join('-')]) {
      loadAttachments(path);
    }
  };

  const loadAttachments = async (path: number[]) => {
    if (!courseId || path.length !== 1) return;

    const pathKey = path.join('-');
    setLoadingAttachments((prev) => ({ ...prev, [pathKey]: true }));
    try {
      const lessonAttachments = await attachmentService.getLessonAttachments(
        courseId,
        path[0]
      );
      setAttachments((prev) => ({ ...prev, [pathKey]: lessonAttachments }));
    } catch (error) {
      console.error('Failed to load attachments:', error);
    } finally {
      setLoadingAttachments((prev) => ({ ...prev, [pathKey]: false }));
    }
  };

  const handleAttachmentDeleted = (pathKey: string, attachmentId: string) => {
    setAttachments((prev) => ({
      ...prev,
      [pathKey]: prev[pathKey]?.filter((a) => a.id !== attachmentId) || [],
    }));
  };

  const handleUploadSuccess = (path: number[]) => {
    loadAttachments(path);
  };

  // Load attachments for existing lessons on mount
  useEffect(() => {
    if (courseId && lessons.length > 0) {
      lessons.forEach((_, index) => {
        const pathKey = `${index}`;
        if (!attachments[pathKey]) {
          loadAttachments([index]);
        }
      });
    }
  }, [courseId, lessons.length]);

  const handleSaveLesson = () => {
    if (!editing || !validate()) return;

    const lessonData: LessonInput = {
      title: editing.title.trim(),
      content: editing.content.trim(),
      order: 0, // Will be set by the helper functions
    };

    let newLessons: LessonInput[];

    if (editing.isNew) {
      // Adding a new lesson
      if (addingSublessonTo !== null) {
        // Adding as a sublesson
        newLessons = addSublessonAtPath(lessons, addingSublessonTo, lessonData);
      } else {
        // Adding as a top-level lesson
        newLessons = [...lessons, { ...lessonData, order: lessons.length + 1 }];
      }
    } else {
      // Updating existing lesson
      newLessons = updateLessonAtPath(lessons, editing.path, (lesson) => ({
        ...lesson,
        title: lessonData.title,
        content: lessonData.content,
      }));
    }

    onChange(newLessons);
    setEditing(null);
    setAddingSublessonTo(null);
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setAddingSublessonTo(null);
    setErrors({});
  };

  const handleDeleteLesson = (path: number[]) => {
    const newLessons = deleteLessonAtPath(lessons, path);
    onChange(newLessons);
  };

  const handleMoveLesson = (path: number[], direction: 'up' | 'down') => {
    const idx = path[path.length - 1];

    // Get the parent's sublessons array
    let siblingLessons: LessonInput[];
    if (path.length === 1) {
      siblingLessons = lessons;
    } else {
      const parent = getLessonByPath(lessons, path.slice(0, -1));
      if (!parent?.sublessons) return;
      siblingLessons = parent.sublessons;
    }

    if (
      (direction === 'up' && idx === 0) ||
      (direction === 'down' && idx === siblingLessons.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? idx - 1 : idx + 1;
    const newSiblings = [...siblingLessons];
    [newSiblings[idx], newSiblings[newIndex]] = [newSiblings[newIndex], newSiblings[idx]];
    const reorderedSiblings = newSiblings.map((lesson, i) => ({ ...lesson, order: i + 1 }));

    if (path.length === 1) {
      onChange(reorderedSiblings);
    } else {
      const newLessons = updateLessonAtPath(lessons, path.slice(0, -1), (parent) => ({
        ...parent,
        sublessons: reorderedSiblings,
      }));
      onChange(newLessons);
    }
  };

  const toggleExpand = (pathKey: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(pathKey)) {
        next.delete(pathKey);
      } else {
        next.add(pathKey);
      }
      return next;
    });
  };

  // Count total lessons including sublessons
  const countAllLessons = (lessonList: LessonInput[]): number => {
    return lessonList.reduce((count, lesson) => {
      return count + 1 + (lesson.sublessons ? countAllLessons(lesson.sublessons) : 0);
    }, 0);
  };

  const totalLessonCount = countAllLessons(lessons);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Lessons ({totalLessonCount})
          {lessons.length !== totalLessonCount && (
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({lessons.length} chapters)
            </span>
          )}
        </CardTitle>
        {!editing && (
          <Button onClick={handleAddLesson}>Add Chapter</Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {editing && (
          <Card className="border-primary">
            <CardContent className="pt-6 space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                {editing.isNew
                  ? addingSublessonTo !== null
                    ? `Adding subchapter to ${getDisplayNumber(addingSublessonTo)}`
                    : 'Adding new chapter'
                  : `Editing ${getDisplayNumber(editing.path)}`}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lesson-title">
                  {addingSublessonTo !== null ? 'Subchapter Title' : 'Chapter Title'}
                </Label>
                <Input
                  id="lesson-title"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing((prev) => prev && { ...prev, title: e.target.value })
                  }
                  placeholder={addingSublessonTo !== null ? 'Introduction to the Topic' : 'Getting Started with Go'}
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

              {/* Attachment Management - only for existing top-level lessons */}
              {courseId && !editing.isNew && editing.path.length === 1 && (
                <div className="space-y-4 pt-4 border-t">
                  <div>
                    <Label>Attachments</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add supplementary materials like PDFs, images, or code files
                    </p>
                  </div>

                  {loadingAttachments[editing.path.join('-')] ? (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <p className="mt-2 text-sm text-muted-foreground">Loading attachments...</p>
                    </div>
                  ) : (
                    <>
                      <AttachmentList
                        attachments={attachments[editing.path.join('-')] || []}
                        isAuthor={true}
                        onDelete={(id) => handleAttachmentDeleted(editing.path.join('-'), id)}
                      />

                      <div className="pt-2">
                        <AttachmentUpload
                          courseId={courseId}
                          lessonIndex={editing.path[0]}
                          onUploadSuccess={() => handleUploadSuccess(editing.path)}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveLesson}>
                  {editing.isNew ? 'Add' : 'Update'} {addingSublessonTo !== null ? 'Subchapter' : 'Chapter'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {lessons.length === 0 && !editing ? (
          <p className="text-center py-8 text-muted-foreground">
            No chapters yet. Click "Add Chapter" to create your first chapter.
          </p>
        ) : (
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <LessonItemDisplay
                key={index}
                lesson={lesson}
                path={[index]}
                depth={0}
                isLast={index === lessons.length - 1}
                onEdit={handleEditLesson}
                onDelete={handleDeleteLesson}
                onMove={handleMoveLesson}
                onAddSublesson={handleAddSublesson}
                editingPath={editing && !editing.isNew ? editing.path : null}
                expanded={expanded}
                onToggleExpand={toggleExpand}
              />
            ))}
          </div>
        )}
      </CardContent>
      {lessons.length > 0 && (
        <CardFooter className="text-sm text-muted-foreground">
          Use the arrow buttons to reorder chapters. Click "+ Sub" to add subchapters (up to 3 levels deep).
        </CardFooter>
      )}
    </Card>
  );
}
