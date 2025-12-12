import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { MarkdownRenderer } from './markdown';
import { Button } from '@repo/playbook';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your content in Markdown...',
  minHeight = 200
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant={isPreview ? 'outline' : 'default'}
          size="sm"
          onClick={() => setIsPreview(false)}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant={isPreview ? 'default' : 'outline'}
          size="sm"
          onClick={() => setIsPreview(true)}
        >
          Preview
        </Button>
      </div>

      {isPreview ? (
        <div
          className="border rounded-md p-4 min-h-[200px] bg-background"
          style={{ minHeight }}
        >
          {value ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className="text-muted-foreground italic">Nothing to preview</p>
          )}
        </div>
      ) : (
        <div data-color-mode="light">
          <MDEditor
            value={value}
            onChange={(val) => onChange(val || '')}
            preview="edit"
            height={minHeight}
            textareaProps={{
              placeholder,
            }}
          />
        </div>
      )}
    </div>
  );
}
