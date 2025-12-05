var config = {
    overwrite: true,
    schema: '../backend/adapters/graphql/schema.graphqls',
    documents: 'src/**/*.tsx',
    generates: {
        'src/generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-query',
            ],
            config: {
                fetcher: 'graphql-request',
                exposeQueryKeys: true,
                exposeFetcher: true,
                withHooks: true,
            },
        },
    },
};
export default config;
