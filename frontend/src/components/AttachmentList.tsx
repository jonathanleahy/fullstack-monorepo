import { useState } from 'react';
import type { Attachment } from '../types/course';
import { Button, Badge } from '@repo/playbook';
import { attachmentService } from '../services/attachmentService';

interface AttachmentListProps {
  attachments: Attachment[];
  isAuthor: boolean;
  onDelete?: (id: string) => void;
}

export function AttachmentList({ attachments, isAuthor, onDelete }: AttachmentListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!onDelete) return;

    setDeletingId(id);
    try {
      await attachmentService.deleteAttachment(id);
      onDelete(id);
    } catch (error) {
      console.error('Failed to delete attachment:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = (attachment: Attachment) => {
    attachmentService.downloadAttachment(attachment);
  };

  if (attachments.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        No attachments for this lesson
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {attachments.map((attachment) => {
        const icon = attachmentService.getFileIcon(attachment.mimeType);
        const size = attachmentService.formatFileSize(attachment.size);
        const uploadDate = new Date(attachment.uploadedAt).toLocaleDateString();

        return (
          <div
            key={attachment.id}
            className="flex items-center gap-3 p-3 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <span className="text-2xl" role="img" aria-label="File icon">
              {icon}
            </span>

            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{attachment.originalName}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="outline" className="text-xs">
                  {size}
                </Badge>
                <span>Uploaded {uploadDate}</span>
              </div>
            </div>

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(attachment)}
              >
                Download
              </Button>

              {isAuthor && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(attachment.id)}
                  disabled={deletingId === attachment.id}
                  className="text-red-600 hover:text-red-700"
                >
                  {deletingId === attachment.id ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
