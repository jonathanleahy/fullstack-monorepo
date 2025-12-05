import { useState, useRef, DragEvent } from 'react';
import { Button, Progress, Badge } from '@repo/playbook';
import { Alert } from '@repo/playbook';
import { attachmentService } from '../services/attachmentService';

interface AttachmentUploadProps {
  courseId: string;
  lessonIndex: number;
  onUploadSuccess: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/svg+xml',
  'text/plain',
  'text/markdown',
  'text/html',
  'text/css',
  'text/javascript',
  'application/json',
  'application/xml',
  'text/x-python',
  'text/x-go',
  'text/x-rust',
  'text/x-java',
];

export function AttachmentUpload({ courseId, lessonIndex, onUploadSuccess }: AttachmentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds 10MB limit (${attachmentService.formatFileSize(file.size)})`;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return `File type not allowed: ${file.type}`;
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    setError(null);
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      await attachmentService.uploadAttachment(courseId, lessonIndex, selectedFile);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Reset after success
      setTimeout(() => {
        setSelectedFile(null);
        setUploadProgress(0);
        onUploadSuccess();
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <p className="text-sm">{error}</p>
        </Alert>
      )}

      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="space-y-2">
            <p className="text-lg font-medium">
              Drop file here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Maximum file size: 10MB
            </p>
            <div className="flex flex-wrap gap-1 justify-center mt-3">
              <Badge variant="outline" className="text-xs">PDF</Badge>
              <Badge variant="outline" className="text-xs">Images</Badge>
              <Badge variant="outline" className="text-xs">Code files</Badge>
              <Badge variant="outline" className="text-xs">Text</Badge>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            className="hidden"
            accept={ALLOWED_TYPES.join(',')}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 border rounded-md bg-muted/30">
            <span className="text-2xl">
              {attachmentService.getFileIcon(selectedFile.type)}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {attachmentService.formatFileSize(selectedFile.size)}
              </p>
            </div>
            {!isUploading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="text-muted-foreground"
              >
                Remove
              </Button>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-center text-muted-foreground">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {!isUploading && (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleUpload}>
                Upload Attachment
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
