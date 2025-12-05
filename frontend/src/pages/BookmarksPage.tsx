import { BookmarksList } from '../components/BookmarksList';

export function BookmarksPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Bookmarks</h1>
        <p className="text-muted-foreground">
          Keep track of important lessons and notes
        </p>
      </div>
      <BookmarksList />
    </div>
  );
}
