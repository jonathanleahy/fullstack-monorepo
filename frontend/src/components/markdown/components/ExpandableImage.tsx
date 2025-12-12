/**
 * ExpandableImage - Image with lightbox expand functionality
 */

import { useState, useEffect, useCallback } from 'react';

export interface ExpandableImageProps {
  src?: string;
  alt?: string;
}

export function ExpandableImage({ src, alt }: ExpandableImageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(false);
  }, []);

  // Close on escape key
  useEffect(() => {
    if (!isExpanded) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  return (
    <>
      <span className="relative inline-block group">
        <img src={src} alt={alt} className="rounded-lg" />
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          title="Expand image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </span>

      {/* Lightbox Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {alt && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-3 py-1 rounded">
              {alt}
            </p>
          )}
        </div>
      )}
    </>
  );
}
