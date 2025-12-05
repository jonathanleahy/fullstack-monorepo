import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || '/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});
