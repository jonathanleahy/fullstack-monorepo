import { graphqlClient } from './graphql';
import type {
  LibraryCourse,
  LibraryCourseConnection,
  UserCourse,
  UserCourseConnection,
  Difficulty,
  PaginationInput,
  StartCourseInput,
  UpdateProgressInput,
  CreateLibraryCourseInput,
  UpdateLibraryCourseInput,
} from '../types/course';

// Query fragments - recursive lesson fragment for sublessons support
const SUBLESSON_FIELDS = `
  title
  content
  order
  hasSublessons
`;

const LESSON_FRAGMENT = `
  title
  content
  order
  hasSublessons
  sublessons {
    ${SUBLESSON_FIELDS}
    sublessons {
      ${SUBLESSON_FIELDS}
    }
  }
`;

const LIBRARY_COURSE_FRAGMENT = `
  id
  title
  description
  lessons {
    ${LESSON_FRAGMENT}
  }
  author
  authorId
  tags
  difficulty
  estimatedHours
  totalLessonCount
  createdAt
  updatedAt
`;

const USER_COURSE_FRAGMENT = `
  id
  userId
  libraryCourseId
  libraryCourse {
    ${LIBRARY_COURSE_FRAGMENT}
  }
  progress
  currentLessonIndex
  completedLessons
  startedAt
  updatedAt
  completedAt
`;

// Queries
const GET_LIBRARY_COURSES = `
  query GetLibraryCourses($pagination: PaginationInput, $difficulty: Difficulty) {
    libraryCourses(pagination: $pagination, difficulty: $difficulty) {
      courses {
        ${LIBRARY_COURSE_FRAGMENT}
      }
      total
      page
      limit
      hasMore
    }
  }
`;

const SEARCH_LIBRARY_COURSES = `
  query SearchLibraryCourses($query: String!, $pagination: PaginationInput) {
    searchLibraryCourses(query: $query, pagination: $pagination) {
      courses {
        ${LIBRARY_COURSE_FRAGMENT}
      }
      total
      page
      limit
      hasMore
    }
  }
`;

const GET_LIBRARY_COURSE = `
  query GetLibraryCourse($id: ID!) {
    libraryCourse(id: $id) {
      ${LIBRARY_COURSE_FRAGMENT}
    }
  }
`;

const GET_MY_COURSES = `
  query GetMyCourses($pagination: PaginationInput) {
    myCourses(pagination: $pagination) {
      courses {
        ${USER_COURSE_FRAGMENT}
      }
      total
      page
      limit
      hasMore
    }
  }
`;

const GET_MY_IN_PROGRESS_COURSES = `
  query GetMyInProgressCourses($pagination: PaginationInput) {
    myInProgressCourses(pagination: $pagination) {
      courses {
        ${USER_COURSE_FRAGMENT}
      }
      total
      page
      limit
      hasMore
    }
  }
`;

const GET_MY_COMPLETED_COURSES = `
  query GetMyCompletedCourses($pagination: PaginationInput) {
    myCompletedCourses(pagination: $pagination) {
      courses {
        ${USER_COURSE_FRAGMENT}
      }
      total
      page
      limit
      hasMore
    }
  }
`;

const GET_USER_COURSE = `
  query GetUserCourse($id: ID!) {
    userCourse(id: $id) {
      ${USER_COURSE_FRAGMENT}
    }
  }
`;

const GET_MY_AUTHORED_COURSES = `
  query GetMyAuthoredCourses($pagination: PaginationInput) {
    myAuthoredCourses(pagination: $pagination) {
      courses {
        ${LIBRARY_COURSE_FRAGMENT}
      }
      total
      page
      limit
      hasMore
    }
  }
`;

const GET_COURSES_BY_TAG = `
  query GetCoursesByTag($tag: String!, $pagination: PaginationInput) {
    coursesByTag(tag: $tag, pagination: $pagination) {
      courses {
        ${LIBRARY_COURSE_FRAGMENT}
      }
      total
      page
      limit
      hasMore
    }
  }
`;

const GET_ALL_TAGS = `
  query GetAllTags {
    allTags
  }
`;

const GET_MY_ENROLLED_COURSES = `
  query GetMyEnrolledCourses {
    myEnrolledCourses {
      ${USER_COURSE_FRAGMENT}
    }
  }
`;

const GET_USER_COURSE_BY_LIBRARY_COURSE = `
  query GetUserCourseByLibraryCourse($libraryCourseId: ID!) {
    getUserCourseByLibraryCourse(libraryCourseId: $libraryCourseId) {
      ${USER_COURSE_FRAGMENT}
    }
  }
`;

// Mutations
const START_COURSE = `
  mutation StartCourse($input: StartCourseInput!) {
    startCourse(input: $input) {
      ${USER_COURSE_FRAGMENT}
    }
  }
`;

const UPDATE_PROGRESS = `
  mutation UpdateProgress($input: UpdateProgressInput!) {
    updateProgress(input: $input) {
      ${USER_COURSE_FRAGMENT}
    }
  }
`;

const DROP_COURSE = `
  mutation DropCourse($id: ID!) {
    dropCourse(id: $id)
  }
`;

const CREATE_LIBRARY_COURSE = `
  mutation CreateLibraryCourse($input: CreateLibraryCourseInput!) {
    createLibraryCourse(input: $input) {
      ${LIBRARY_COURSE_FRAGMENT}
    }
  }
`;

const UPDATE_LIBRARY_COURSE = `
  mutation UpdateLibraryCourse($id: ID!, $input: UpdateLibraryCourseInput!) {
    updateLibraryCourse(id: $id, input: $input) {
      ${LIBRARY_COURSE_FRAGMENT}
    }
  }
`;

const DELETE_LIBRARY_COURSE = `
  mutation DeleteLibraryCourse($id: ID!) {
    deleteLibraryCourse(id: $id)
  }
`;

const IMPORT_COURSES = `
  mutation ImportCourses($input: ImportCoursesInput!) {
    importCourses(input: $input) {
      ${LIBRARY_COURSE_FRAGMENT}
    }
  }
`;

const ENROLL_IN_COURSE = `
  mutation EnrollInCourse($libraryCourseId: ID!) {
    enrollInCourse(libraryCourseId: $libraryCourseId) {
      ${USER_COURSE_FRAGMENT}
    }
  }
`;

const UNENROLL_FROM_COURSE = `
  mutation UnenrollFromCourse($libraryCourseId: ID!) {
    unenrollFromCourse(libraryCourseId: $libraryCourseId)
  }
`;

const UPDATE_COURSE_PROGRESS = `
  mutation UpdateCourseProgress($libraryCourseId: ID!, $lessonIndex: Int!, $completed: Boolean!) {
    updateCourseProgress(libraryCourseId: $libraryCourseId, lessonIndex: $lessonIndex, completed: $completed) {
      ${USER_COURSE_FRAGMENT}
    }
  }
`;

const SET_CURRENT_LESSON = `
  mutation SetCurrentLesson($libraryCourseId: ID!, $lessonIndex: Int!) {
    setCurrentLesson(libraryCourseId: $libraryCourseId, lessonIndex: $lessonIndex) {
      ${USER_COURSE_FRAGMENT}
    }
  }
`;

// Service functions
export const courseService = {
  // Library course queries
  async getLibraryCourses(
    pagination?: PaginationInput,
    difficulty?: Difficulty
  ): Promise<LibraryCourseConnection> {
    const data = await graphqlClient.request<{ libraryCourses: LibraryCourseConnection }>(
      GET_LIBRARY_COURSES,
      { pagination, difficulty }
    );
    return data.libraryCourses;
  },

  async searchLibraryCourses(
    query: string,
    pagination?: PaginationInput
  ): Promise<LibraryCourseConnection> {
    const data = await graphqlClient.request<{ searchLibraryCourses: LibraryCourseConnection }>(
      SEARCH_LIBRARY_COURSES,
      { query, pagination }
    );
    return data.searchLibraryCourses;
  },

  async getLibraryCourse(id: string): Promise<LibraryCourse | null> {
    const data = await graphqlClient.request<{ libraryCourse: LibraryCourse | null }>(
      GET_LIBRARY_COURSE,
      { id }
    );
    return data.libraryCourse;
  },

  // User course queries
  async getMyCourses(pagination?: PaginationInput): Promise<UserCourseConnection> {
    const data = await graphqlClient.request<{ myCourses: UserCourseConnection }>(
      GET_MY_COURSES,
      { pagination }
    );
    return data.myCourses;
  },

  async getMyInProgressCourses(pagination?: PaginationInput): Promise<UserCourseConnection> {
    const data = await graphqlClient.request<{ myInProgressCourses: UserCourseConnection }>(
      GET_MY_IN_PROGRESS_COURSES,
      { pagination }
    );
    return data.myInProgressCourses;
  },

  async getMyCompletedCourses(pagination?: PaginationInput): Promise<UserCourseConnection> {
    const data = await graphqlClient.request<{ myCompletedCourses: UserCourseConnection }>(
      GET_MY_COMPLETED_COURSES,
      { pagination }
    );
    return data.myCompletedCourses;
  },

  async getUserCourse(id: string): Promise<UserCourse | null> {
    const data = await graphqlClient.request<{ userCourse: UserCourse | null }>(
      GET_USER_COURSE,
      { id }
    );
    return data.userCourse;
  },

  // Mutations
  async startCourse(input: StartCourseInput): Promise<UserCourse> {
    const data = await graphqlClient.request<{ startCourse: UserCourse }>(
      START_COURSE,
      { input }
    );
    return data.startCourse;
  },

  async updateProgress(input: UpdateProgressInput): Promise<UserCourse> {
    const data = await graphqlClient.request<{ updateProgress: UserCourse }>(
      UPDATE_PROGRESS,
      { input }
    );
    return data.updateProgress;
  },

  async dropCourse(id: string): Promise<boolean> {
    const data = await graphqlClient.request<{ dropCourse: boolean }>(
      DROP_COURSE,
      { id }
    );
    return data.dropCourse;
  },

  // Library course management mutations
  async createLibraryCourse(input: CreateLibraryCourseInput): Promise<LibraryCourse> {
    const data = await graphqlClient.request<{ createLibraryCourse: LibraryCourse }>(
      CREATE_LIBRARY_COURSE,
      { input }
    );
    return data.createLibraryCourse;
  },

  async updateLibraryCourse(id: string, input: UpdateLibraryCourseInput): Promise<LibraryCourse> {
    const data = await graphqlClient.request<{ updateLibraryCourse: LibraryCourse }>(
      UPDATE_LIBRARY_COURSE,
      { id, input }
    );
    return data.updateLibraryCourse;
  },

  async deleteLibraryCourse(id: string): Promise<boolean> {
    const data = await graphqlClient.request<{ deleteLibraryCourse: boolean }>(
      DELETE_LIBRARY_COURSE,
      { id }
    );
    return data.deleteLibraryCourse;
  },

  async getMyAuthoredCourses(pagination?: PaginationInput): Promise<LibraryCourseConnection> {
    const data = await graphqlClient.request<{ myAuthoredCourses: LibraryCourseConnection }>(
      GET_MY_AUTHORED_COURSES,
      { pagination }
    );
    return data.myAuthoredCourses;
  },

  async getCoursesByTag(tag: string, pagination?: PaginationInput): Promise<LibraryCourseConnection> {
    const data = await graphqlClient.request<{ coursesByTag: LibraryCourseConnection }>(
      GET_COURSES_BY_TAG,
      { tag, pagination }
    );
    return data.coursesByTag;
  },

  async getAllTags(): Promise<string[]> {
    const data = await graphqlClient.request<{ allTags: string[] }>(GET_ALL_TAGS);
    return data.allTags;
  },

  async importCourses(courses: CreateLibraryCourseInput[]): Promise<LibraryCourse[]> {
    const data = await graphqlClient.request<{ importCourses: LibraryCourse[] }>(
      IMPORT_COURSES,
      { input: { courses } }
    );
    return data.importCourses;
  },

  // New enrollment and progress methods
  async getMyEnrolledCourses(): Promise<UserCourse[]> {
    const data = await graphqlClient.request<{ myEnrolledCourses: UserCourse[] }>(
      GET_MY_ENROLLED_COURSES
    );
    return data.myEnrolledCourses;
  },

  async getUserCourseByLibraryCourse(libraryCourseId: string): Promise<UserCourse | null> {
    const data = await graphqlClient.request<{ getUserCourseByLibraryCourse: UserCourse | null }>(
      GET_USER_COURSE_BY_LIBRARY_COURSE,
      { libraryCourseId }
    );
    return data.getUserCourseByLibraryCourse;
  },

  async enrollInCourse(libraryCourseId: string): Promise<UserCourse> {
    const data = await graphqlClient.request<{ enrollInCourse: UserCourse }>(
      ENROLL_IN_COURSE,
      { libraryCourseId }
    );
    return data.enrollInCourse;
  },

  async unenrollFromCourse(libraryCourseId: string): Promise<boolean> {
    const data = await graphqlClient.request<{ unenrollFromCourse: boolean }>(
      UNENROLL_FROM_COURSE,
      { libraryCourseId }
    );
    return data.unenrollFromCourse;
  },

  async updateCourseProgress(
    libraryCourseId: string,
    lessonIndex: number,
    completed: boolean
  ): Promise<UserCourse> {
    const data = await graphqlClient.request<{ updateCourseProgress: UserCourse }>(
      UPDATE_COURSE_PROGRESS,
      { libraryCourseId, lessonIndex, completed }
    );
    return data.updateCourseProgress;
  },

  async setCurrentLesson(libraryCourseId: string, lessonIndex: number): Promise<UserCourse> {
    const data = await graphqlClient.request<{ setCurrentLesson: UserCourse }>(
      SET_CURRENT_LESSON,
      { libraryCourseId, lessonIndex }
    );
    return data.setCurrentLesson;
  },
};
