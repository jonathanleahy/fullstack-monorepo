/**
 * DesignNavigation - Navigation between homepage design variants
 * Provides prev/next buttons and design number display
 * Uses URL query params: /?variant=N
 */
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Grid } from 'lucide-react';

interface DesignNavigationProps {
  currentVersion: number;
  totalVersions?: number;
}

export function DesignNavigation({ currentVersion, totalVersions = 125 }: DesignNavigationProps) {
  const prevVersion = currentVersion > 1 ? currentVersion - 1 : null;
  const nextVersion = currentVersion < totalVersions ? currentVersion + 1 : null;

  const getPath = (version: number) => {
    return `/?variant=${version}`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 px-2 py-1.5">
        {/* Previous button */}
        {prevVersion !== null ? (
          <Link
            to={getPath(prevVersion)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title={`Previous design (V${prevVersion})`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
            <ChevronLeft className="w-4 h-4" />
          </div>
        )}

        {/* Current version display with link to grid */}
        <Link
          to="/"
          className="px-3 py-1 text-sm font-medium text-slate-700 min-w-[80px] text-center hover:text-slate-900 transition-colors flex items-center gap-1.5"
          title="View all designs"
        >
          <Grid className="w-3 h-3" />
          V{currentVersion} / {totalVersions}
        </Link>

        {/* Next button */}
        {nextVersion !== null ? (
          <Link
            to={getPath(nextVersion)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title={`Next design (V${nextVersion})`}
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
