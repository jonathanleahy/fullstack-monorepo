import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '../services/graphql';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface UserConnection {
  users: User[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface UsersResponse {
  users: UserConnection;
}

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

const USERS_QUERY = `
  query Users($pagination: PaginationInput) {
    users(pagination: $pagination) {
      users {
        id
        email
        name
        createdAt
        updatedAt
      }
      total
      page
      limit
      hasMore
    }
  }
`;

const CREATE_USER_MUTATION = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      name
      createdAt
      updatedAt
    }
  }
`;

const DELETE_USER_MUTATION = `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export function useUsers(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      return graphqlClient.request<UsersResponse>(USERS_QUERY, {
        pagination: { page, limit },
      });
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateUserInput) => {
      return graphqlClient.request<{ createUser: User }>(CREATE_USER_MUTATION, { input });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return graphqlClient.request<{ deleteUser: boolean }>(DELETE_USER_MUTATION, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
