import { graphqlClient } from './graphql';
import type { Bookmark } from '../types/course';

// Query fragments
const BOOKMARK_FRAGMENT = `
  id
  userId
  libraryCourseId
  lessonIndex
  note
  createdAt
`;

// Queries
const GET_MY_BOOKMARKS = `
  query GetMyBookmarks {
    myBookmarks {
      ${BOOKMARK_FRAGMENT}
    }
  }
`;

const GET_COURSE_BOOKMARKS = `
  query GetCourseBookmarks($libraryCourseId: ID!) {
    courseBookmarks(libraryCourseId: $libraryCourseId) {
      ${BOOKMARK_FRAGMENT}
    }
  }
`;

// Mutations
const ADD_BOOKMARK = `
  mutation AddBookmark($libraryCourseId: ID!, $lessonIndex: Int!, $note: String) {
    addBookmark(libraryCourseId: $libraryCourseId, lessonIndex: $lessonIndex, note: $note) {
      ${BOOKMARK_FRAGMENT}
    }
  }
`;

const REMOVE_BOOKMARK = `
  mutation RemoveBookmark($libraryCourseId: ID!, $lessonIndex: Int!) {
    removeBookmark(libraryCourseId: $libraryCourseId, lessonIndex: $lessonIndex)
  }
`;

// Service functions
export const bookmarkService = {
  async getMyBookmarks(): Promise<Bookmark[]> {
    const data = await graphqlClient.request<{ myBookmarks: Bookmark[] }>(
      GET_MY_BOOKMARKS
    );
    return data.myBookmarks;
  },

  async getCourseBookmarks(libraryCourseId: string): Promise<Bookmark[]> {
    const data = await graphqlClient.request<{ courseBookmarks: Bookmark[] }>(
      GET_COURSE_BOOKMARKS,
      { libraryCourseId }
    );
    return data.courseBookmarks;
  },

  async addBookmark(
    libraryCourseId: string,
    lessonIndex: number,
    note?: string
  ): Promise<Bookmark> {
    const data = await graphqlClient.request<{ addBookmark: Bookmark }>(
      ADD_BOOKMARK,
      { libraryCourseId, lessonIndex, note: note || null }
    );
    return data.addBookmark;
  },

  async removeBookmark(
    libraryCourseId: string,
    lessonIndex: number
  ): Promise<boolean> {
    const data = await graphqlClient.request<{ removeBookmark: boolean }>(
      REMOVE_BOOKMARK,
      { libraryCourseId, lessonIndex }
    );
    return data.removeBookmark;
  },
};
