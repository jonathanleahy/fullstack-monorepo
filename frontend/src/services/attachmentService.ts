import { graphqlClient } from './graphql';
import type { Attachment } from '../types/course';

// GraphQL queries and mutations
const ATTACHMENT_FRAGMENT = `
  id
  libraryCourseId
  lessonIndex
  filename
  originalName
  mimeType
  size
  uploadedAt
  downloadUrl
`;

const GET_LESSON_ATTACHMENTS = `
  query GetLessonAttachments($libraryCourseId: ID!, $lessonIndex: Int!) {
    lessonAttachments(libraryCourseId: $libraryCourseId, lessonIndex: $lessonIndex) {
      ${ATTACHMENT_FRAGMENT}
    }
  }
`;

const DELETE_ATTACHMENT = `
  mutation DeleteAttachment($id: ID!) {
    deleteAttachment(id: $id)
  }
`;

// Service functions
export const attachmentService = {
  /**
   * Get all attachments for a specific lesson
   */
  async getLessonAttachments(
    libraryCourseId: string,
    lessonIndex: number
  ): Promise<Attachment[]> {
    const data = await graphqlClient.request<{ lessonAttachments: Attachment[] }>(
      GET_LESSON_ATTACHMENTS,
      { libraryCourseId, lessonIndex }
    );
    return data.lessonAttachments;
  },

  /**
   * Delete an attachment
   */
  async deleteAttachment(id: string): Promise<boolean> {
    const data = await graphqlClient.request<{ deleteAttachment: boolean }>(
      DELETE_ATTACHMENT,
      { id }
    );
    return data.deleteAttachment;
  },

  /**
   * Upload an attachment to a lesson
   * Uses REST endpoint for file upload
   */
  async uploadAttachment(
    courseId: string,
    lessonIndex: number,
    file: File
  ): Promise<Attachment> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `/api/courses/${courseId}/lessons/${lessonIndex}/attachments`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to upload attachment');
    }

    return response.json();
  },

  /**
   * Download an attachment
   */
  downloadAttachment(attachment: Attachment): void {
    const link = document.createElement('a');
    link.href = attachment.downloadUrl;
    link.download = attachment.originalName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  /**
   * Format file size to human-readable format
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  },

  /**
   * Get file icon based on MIME type
   */
  getFileIcon(mimeType: string): string {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType === 'application/pdf') return '📄';
    if (
      mimeType.startsWith('text/') ||
      mimeType.includes('javascript') ||
      mimeType.includes('json') ||
      mimeType.includes('xml')
    ) return '📝';
    return '📎';
  },
};
