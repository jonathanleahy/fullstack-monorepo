# Attachment Integration for CourseDetailPage.tsx

## Overview
This document describes the changes needed to integrate attachment functionality into CourseDetailPage.tsx.

## Step 1: Update Imports

Add these imports to the top of the file:

```typescript
import { attachmentService } from '../services/attachmentService';
import type { Attachment } from '../types/course'; // Add Attachment to existing type import
import { AttachmentList } from '../components/AttachmentList';
```

## Step 2: Add State Variables

Add these state variables with the other useState declarations:

```typescript
const [attachments, setAttachments] = useState<Attachment[]>([]);
const [isLoadingAttachments, setIsLoadingAttachments] = useState(false);
```

## Step 3: Add Attachment Loading Function

Add this function before handleSelectLesson:

```typescript
const loadLessonAttachments = useCallback(async (lessonIndex: number) => {
  if (!course) return;

  setIsLoadingAttachments(true);
  try {
    const lessonAttachments = await attachmentService.getLessonAttachments(
      course.id,
      lessonIndex
    );
    setAttachments(lessonAttachments);
  } catch (error) {
    console.error('Failed to load attachments:', error);
    setAttachments([]);
  } finally {
    setIsLoadingAttachments(false);
  }
}, [course]);
```

## Step 4: Update handleSelectLesson

Add this line at the end of the handleSelectLesson function:

```typescript
// Load attachments for the selected lesson
loadLessonAttachments(index);
```

## Step 5: Add useEffect for Initial Load

Add this useEffect after handleKeyNavigation:

```typescript
// Load attachments when course or lesson changes
useEffect(() => {
  if (course) {
    loadLessonAttachments(selectedLesson);
  }
}, [course, selectedLesson, loadLessonAttachments]);
```

## Step 6: Add Attachments UI Section

In the lesson content section, after the MarkdownRenderer and before the keyboard hints, add:

```typescript
{/* Attachments section */}
{(isLoadingAttachments || attachments.length > 0) && (
  <div className="mt-6 pt-6 border-t">
    <h3 className="text-lg font-semibold mb-3">Lesson Materials</h3>
    {isLoadingAttachments ? (
      <div className="text-center py-4">
        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <p className="mt-2 text-sm text-muted-foreground">Loading materials...</p>
      </div>
    ) : (
      <AttachmentList
        attachments={attachments}
        isAuthor={false}
      />
    )}
  </div>
)}
```

This should be placed right after:
```typescript
<div className="prose max-w-none">
  <MarkdownRenderer content={currentLesson.content} />
</div>
```

And before:
```typescript
<div className="mt-4 text-xs text-muted-foreground text-center">
  <kbd ...>
```

## Complete Example

The lesson content block should look like this:

```typescript
{currentLesson && (
  <div className="border rounded-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">
        Lesson {selectedLesson + 1}: {currentLesson.title}
      </h2>
      {/* ... bookmark button ... */}
    </div>

    <div className="prose max-w-none">
      <MarkdownRenderer content={currentLesson.content} />
    </div>

    {/* NEW: Attachments section */}
    {(isLoadingAttachments || attachments.length > 0) && (
      <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-semibold mb-3">Lesson Materials</h3>
        {isLoadingAttachments ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading materials...</p>
          </div>
        ) : (
          <AttachmentList
            attachments={attachments}
            isAuthor={false}
          />
        )}
      </div>
    )}

    <div className="mt-4 text-xs text-muted-foreground text-center">
      {/* keyboard hints */}
    </div>

    {/* ... rest of content ... */}
  </div>
)}
```

## Files Created

The following new files have been created:
1. `/frontend/src/types/course.ts` - Added `Attachment` interface
2. `/frontend/src/services/attachmentService.ts` - Complete attachment service
3. `/frontend/src/components/AttachmentList.tsx` - Display list of attachments
4. `/frontend/src/components/AttachmentUpload.tsx` - Upload attachments with drag-and-drop
5. `/frontend/src/components/LessonEditor.tsx` - Updated to support attachments (when courseId provided)
6. `/frontend/src/pages/EditCoursePage.tsx` - Updated to pass courseId to LessonEditor

## Testing

1. Navigate to a course detail page - attachments will load for each lesson
2. Edit a course - you can now manage attachments for each lesson
3. Upload files using drag-and-drop or file picker
4. Download attachments by clicking the download button
5. Delete attachments (only visible when editing as author)
