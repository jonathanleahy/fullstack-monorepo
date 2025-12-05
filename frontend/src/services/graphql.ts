import { GraphQLClient, ClientError } from 'graphql-request';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || '/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Extracts a clean, user-friendly error message from GraphQL errors.
 * Handles graphql-request ClientError structure and falls back gracefully.
 */
export function extractGraphQLError(error: unknown): string {
  // Handle graphql-request ClientError
  if (error instanceof ClientError) {
    const gqlErrors = error.response?.errors;
    if (gqlErrors && gqlErrors.length > 0) {
      return gqlErrors[0].message;
    }
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    // Try to parse JSON error message (some libraries stringify the whole response)
    try {
      const parsed = JSON.parse(error.message);
      if (parsed?.response?.errors?.[0]?.message) {
        return parsed.response.errors[0].message;
      }
    } catch {
      // Not JSON, use message directly if it's reasonable
      if (error.message.length < 200 && !error.message.includes('{')) {
        return error.message;
      }
    }
  }

  // Generic fallback
  return 'An unexpected error occurred. Please try again.';
}
