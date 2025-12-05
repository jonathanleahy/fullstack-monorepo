import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { extractGraphQLError } from '../services/graphql';
import type { CreateLibraryCourseInput } from '../types/course';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@repo/playbook';

const EXAMPLE_JSON = `[
  {
    "title": "Introduction to TypeScript",
    "description": "Learn TypeScript fundamentals",
    "author": "Your Name",
    "difficulty": "BEGINNER",
    "estimatedHours": 5,
    "tags": ["typescript", "programming"],
    "lessons": [
      {
        "title": "Getting Started",
        "content": "# Getting Started\\n\\nTypeScript is a typed superset of JavaScript...",
        "order": 1
      }
    ]
  }
]`;

export function ImportCoursePage() {
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState('');
  const [parsedCourses, setParsedCourses] = useState<CreateLibraryCourseInput[] | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<number | null>(null);

  const handleParse = () => {
    setParseError(null);
    setParsedCourses(null);

    try {
      const parsed = JSON.parse(jsonInput);

      // Validate it's an array
      if (!Array.isArray(parsed)) {
        throw new Error('JSON must be an array of courses');
      }

      // Basic validation of each course
      const courses: CreateLibraryCourseInput[] = parsed.map((course, index) => {
        if (!course.title) throw new Error(`Course ${index + 1}: title is required`);
        if (!course.description) throw new Error(`Course ${index + 1}: description is required`);
        if (!course.lessons || !Array.isArray(course.lessons) || course.lessons.length === 0) {
          throw new Error(`Course ${index + 1}: at least one lesson is required`);
        }

        return {
          title: course.title,
          description: course.description,
          author: course.author || 'Anonymous',
          difficulty: course.difficulty || 'BEGINNER',
          estimatedHours: course.estimatedHours || 1,
          tags: course.tags || [],
          lessons: course.lessons.map((lesson: any, lessonIndex: number) => ({
            title: lesson.title || `Lesson ${lessonIndex + 1}`,
            content: lesson.content || '',
            order: lesson.order || lessonIndex + 1,
          })),
        };
      });

      setParsedCourses(courses);
    } catch (err) {
      setParseError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  const handleImport = async () => {
    if (!parsedCourses) return;

    setIsImporting(true);
    setImportError(null);

    try {
      const imported = await courseService.importCourses(parsedCourses);
      setImportSuccess(imported.length);
      setParsedCourses(null);
      setJsonInput('');
    } catch (err) {
      setImportError(extractGraphQLError(err));
    } finally {
      setIsImporting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonInput(content);
      setParsedCourses(null);
      setParseError(null);
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to Courses
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Import Courses</h1>
        <p className="text-muted-foreground">
          Import multiple courses at once from a JSON file or paste JSON directly.
        </p>
      </div>

      {importSuccess && (
        <Alert variant="success" className="mb-6">
          <AlertTitle>Import Successful!</AlertTitle>
          <AlertDescription>
            Successfully imported {importSuccess} course{importSuccess !== 1 ? 's' : ''}.{' '}
            <Link to="/courses" className="underline">View courses</Link>
          </AlertDescription>
        </Alert>
      )}

      {importError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Import Failed</AlertTitle>
          <AlertDescription>{importError}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>JSON Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload JSON file
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">
              Or paste JSON directly
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setParsedCourses(null);
                setParseError(null);
              }}
              placeholder={EXAMPLE_JSON}
              rows={12}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {parseError && (
            <Alert variant="destructive">
              <AlertDescription>{parseError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleParse} disabled={!jsonInput.trim()}>
            Parse & Preview
          </Button>
        </CardFooter>
      </Card>

      {parsedCourses && (
        <Card>
          <CardHeader>
            <CardTitle>Preview ({parsedCourses.length} courses)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parsedCourses.map((course, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{course.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                    <Badge>{course.difficulty}</Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{course.lessons.length} lessons</span>
                    <span>•</span>
                    <span>{course.estimatedHours}h</span>
                    <span>•</span>
                    <span>by {course.author}</span>
                  </div>
                  {course.tags && course.tags.length > 0 && (
                    <div className="mt-2 flex gap-1">
                      {course.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setParsedCourses(null)}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={isImporting}>
              {isImporting ? 'Importing...' : `Import ${parsedCourses.length} Course${parsedCourses.length !== 1 ? 's' : ''}`}
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>JSON Format</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
            {EXAMPLE_JSON}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
