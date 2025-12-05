import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Fullstack App
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        A modern full-stack application built with React, TailwindCSS, Go, and GraphQL.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          to="/courses"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Browse Courses
        </Link>
        <a
          href="/graphql"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          GraphQL Playground
        </a>
      </div>
    </div>
  );
}
