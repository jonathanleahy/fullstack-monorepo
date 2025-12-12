import { useState } from 'react';

interface ImageBlockProps {
  src: string;
  alt?: string;
  caption?: string;
  /** Optional link to wrap the image */
  href?: string;
  /** Show border around image */
  bordered?: boolean;
  /** Add shadow effect */
  shadow?: boolean;
  /** Round corners */
  rounded?: boolean;
}

export function ImageBlock({
  src,
  alt = '',
  caption,
  href,
  bordered = false,
  shadow = true,
  rounded = true,
}: ImageBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageClasses = [
    'max-w-full h-auto',
    rounded && 'rounded-lg',
    bordered && 'border-2 border-slate-200 dark:border-slate-700',
    shadow && 'shadow-lg',
    'transition-transform duration-200',
  ]
    .filter(Boolean)
    .join(' ');

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageElement = (
    <div className="relative group">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg" />
      )}

      {/* Error state */}
      {hasError ? (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
          <svg
            className="w-12 h-12 text-slate-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Failed to load image
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate max-w-full">
            {src}
          </span>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            className={imageClasses}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: isLoading ? 0 : 1 }}
          />

          {/* Expand button on hover */}
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            title="Expand image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <figure className="my-4">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {imageElement}
          </a>
        ) : (
          imageElement
        )}

        {caption && (
          <figcaption className="mt-2 text-sm text-center text-slate-600 dark:text-slate-400 italic">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Expanded modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute -top-4 -right-4 p-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-full shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              title="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {caption && (
              <p className="mt-4 text-center text-white/80 text-sm">{caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
