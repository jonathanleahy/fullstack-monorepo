import { graphqlClient } from './graphql';
import type { CourseAnalytics } from '../types/course';

// Query fragments
const ANALYTICS_FRAGMENT = `
  libraryCourseId
  totalViews
  uniqueViews
  totalEnrollments
  completionRate
  averageProgress
`;

// Queries
const GET_COURSE_ANALYTICS = `
  query GetCourseAnalytics($libraryCourseId: ID!) {
    courseAnalytics(libraryCourseId: $libraryCourseId) {
      ${ANALYTICS_FRAGMENT}
    }
  }
`;

const GET_MY_AUTHORED_COURSES_ANALYTICS = `
  query GetMyAuthoredCoursesAnalytics {
    myAuthoredCoursesAnalytics {
      ${ANALYTICS_FRAGMENT}
    }
  }
`;

// Mutations
const RECORD_COURSE_VIEW = `
  mutation RecordCourseView($libraryCourseId: ID!) {
    recordCourseView(libraryCourseId: $libraryCourseId)
  }
`;

// Service functions
export const analyticsService = {
  async getCourseAnalytics(libraryCourseId: string): Promise<CourseAnalytics | null> {
    const data = await graphqlClient.request<{ courseAnalytics: CourseAnalytics | null }>(
      GET_COURSE_ANALYTICS,
      { libraryCourseId }
    );
    return data.courseAnalytics;
  },

  async getMyAuthoredCoursesAnalytics(): Promise<CourseAnalytics[]> {
    const data = await graphqlClient.request<{ myAuthoredCoursesAnalytics: CourseAnalytics[] }>(
      GET_MY_AUTHORED_COURSES_ANALYTICS
    );
    return data.myAuthoredCoursesAnalytics;
  },

  async recordCourseView(libraryCourseId: string): Promise<boolean> {
    const data = await graphqlClient.request<{ recordCourseView: boolean }>(
      RECORD_COURSE_VIEW,
      { libraryCourseId }
    );
    return data.recordCourseView;
  },
};
