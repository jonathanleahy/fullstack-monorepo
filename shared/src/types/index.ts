// Shared Types - matches GraphQL schema types

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// GraphQL operation result types
export type QueryResult<T> = {
  loading: boolean;
  error?: Error;
  data?: T;
};

export type MutationResult<T> = {
  loading: boolean;
  error?: Error;
  data?: T;
  called: boolean;
};
