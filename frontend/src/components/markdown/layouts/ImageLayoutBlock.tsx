/**
 * ImageLayoutBlock - Layout component for images with edit mode support
 * Supports floating and sidebyside layouts with ImageEditor in edit mode
 */

import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ImageBlock } from '@repo/playbook';
import { useEditMode } from '../context/EditModeContext';
import { ImageEditor, type ImageCropSettings } from '../components/ImageEditor';
import { floatWidths, sizeWidths } from './constants';

type LayoutType = 'floating' | 'sidebyside';
type Position = 'left' | 'right';

interface ImageLayoutBlockProps {
  layout: LayoutType;
  position: Position;
  size: string;
  src: string;
  alt?: string;
  caption?: string;
  text: string;
  onImageChange?: (newSrc: string) => void;
  onAltChange?: (newAlt: string) => void;
  onCaptionChange?: (newCaption: string) => void;
  onLayoutChange?: (layout: LayoutType, position: Position, size: string) => void;
}

export function ImageLayoutBlock({
  layout,
  position,
  size,
  src,
  alt = '',
  caption = '',
  text,
  onImageChange,
  onAltChange,
  onCaptionChange,
  onLayoutChange,
}: ImageLayoutBlockProps) {
  const { editMode } = useEditMode();
  const [showEditor, setShowEditor] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [currentAlt, setCurrentAlt] = useState(alt);
  const [currentCaption, setCurrentCaption] = useState(caption);
  const [cropSettings, setCropSettings] = useState<ImageCropSettings>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    zoom: 1,
  });

  // Current layout state
  const [currentLayout, setCurrentLayout] = useState<LayoutType>(layout);
  const [currentPosition, setCurrentPosition] = useState<Position>(position);
  const [currentSize, setCurrentSize] = useState(size);

  const handleImageChange = useCallback((newSrc: string) => {
    setCurrentSrc(newSrc);
    onImageChange?.(newSrc);
  }, [onImageChange]);

  const handleAltChange = useCallback((newAlt: string) => {
    setCurrentAlt(newAlt);
    onAltChange?.(newAlt);
  }, [onAltChange]);

  const handleCaptionChange = useCallback((newCaption: string) => {
    setCurrentCaption(newCaption);
    onCaptionChange?.(newCaption);
  }, [onCaptionChange]);

  const handleLayoutTypeChange = useCallback((newLayout: LayoutType) => {
    setCurrentLayout(newLayout);
    onLayoutChange?.(newLayout, currentPosition, currentSize);
  }, [currentPosition, currentSize, onLayoutChange]);

  const handlePositionChange = useCallback((newPosition: Position) => {
    setCurrentPosition(newPosition);
    onLayoutChange?.(currentLayout, newPosition, currentSize);
  }, [currentLayout, currentSize, onLayoutChange]);

  const handleSizeChange = useCallback((newSize: string) => {
    setCurrentSize(newSize);
    onLayoutChange?.(currentLayout, currentPosition, newSize);
  }, [currentLayout, currentPosition, onLayoutChange]);

  // Width classes based on layout type
  const widthClass = currentLayout === 'floating'
    ? floatWidths[currentSize] || 'w-1/2'
    : sizeWidths[currentSize] || 'w-1/2';

  // Position classes for floating layout
  const positionClass = currentLayout === 'floating'
    ? currentPosition === 'left'
      ? 'float-left mr-8 mb-4'
      : 'float-right ml-8 mb-4'
    : '';

  // Render image with crop/zoom applied - constrained to container width
  const renderImage = () => (
    <div className="overflow-hidden rounded-lg w-full">
      <div
        style={{
          transform: cropSettings.zoom !== 1 ? `scale(${cropSettings.zoom})` : undefined,
          transformOrigin: 'center',
        }}
      >
        <ImageBlock src={currentSrc} alt={currentAlt} caption={currentCaption} />
      </div>
    </div>
  );

  // Edit mode view
  if (editMode) {
    return (
      <div className="relative my-4">
        {/* Layout controls toolbar */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur rounded-lg shadow-lg border p-1">
            {/* Layout type toggle */}
            <button
              onClick={() => handleLayoutTypeChange('sidebyside')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                currentLayout === 'sidebyside' ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
              title="Side by side"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="4" y="4" width="7" height="16" rx="1" strokeWidth="2" />
                <line x1="14" y1="6" x2="20" y2="6" strokeWidth="2" />
                <line x1="14" y1="10" x2="20" y2="10" strokeWidth="2" />
                <line x1="14" y1="14" x2="18" y2="14" strokeWidth="2" />
              </svg>
            </button>
            <button
              onClick={() => handleLayoutTypeChange('floating')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                currentLayout === 'floating' ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
              title="Floating (text wraps)"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="12" y="4" width="8" height="8" rx="1" strokeWidth="2" />
                <line x1="4" y1="6" x2="10" y2="6" strokeWidth="2" />
                <line x1="4" y1="10" x2="10" y2="10" strokeWidth="2" />
                <line x1="4" y1="14" x2="20" y2="14" strokeWidth="2" />
                <line x1="4" y1="18" x2="16" y2="18" strokeWidth="2" />
              </svg>
            </button>

            <div className="w-px h-4 bg-gray-300 mx-1" />

            {/* Edit image button */}
            <button
              onClick={() => setShowEditor(!showEditor)}
              className={`px-2 py-1 text-xs rounded transition-colors flex items-center gap-1 ${
                showEditor ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
              title="Edit image"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Edit</span>
            </button>
          </div>

          {/* Position & Size controls */}
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur rounded-lg shadow-lg border p-1.5">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 px-1">Pos:</span>
              <button
                onClick={() => handlePositionChange('left')}
                className={`px-2 py-0.5 text-xs rounded ${
                  currentPosition === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                L
              </button>
              <button
                onClick={() => handlePositionChange('right')}
                className={`px-2 py-0.5 text-xs rounded ${
                  currentPosition === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
              >
                R
              </button>
            </div>

            <div className="w-px h-4 bg-gray-200" />

            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 px-1">Width:</span>
              {['1/3', '1/2', '2/3', 'full'].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSizeChange(s)}
                  className={`px-1.5 py-0.5 text-xs rounded ${
                    currentSize === s ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                >
                  {s === '1/3' ? '⅓' : s === '1/2' ? '½' : s === '2/3' ? '⅔' : 'Full'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Image editor panel */}
        {showEditor && (
          <div className="absolute top-20 left-2 z-20">
            <ImageEditor
              src={currentSrc}
              alt={currentAlt}
              caption={currentCaption}
              cropSettings={cropSettings}
              onImageChange={handleImageChange}
              onAltChange={handleAltChange}
              onCaptionChange={handleCaptionChange}
              onCropChange={setCropSettings}
              onClose={() => setShowEditor(false)}
            />
          </div>
        )}

        {/* Layout preview */}
        {currentLayout === 'floating' ? (
          <div className="my-6 overflow-hidden pt-10">
            <div className={`${positionClass} ${widthClass} not-prose`}>
              {renderImage()}
            </div>
            <div className="prose prose-slate dark:prose-invert max-w-none [&>p]:text-justify [&>p]:hyphens-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
            <div className="clear-both" />
          </div>
        ) : (
          <div className={`flex gap-6 my-6 pt-10 ${currentPosition === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`${widthClass} flex-shrink-0 not-prose`}>
              {renderImage()}
            </div>
            <div className="flex-1 prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    );
  }

  // View mode - floating layout
  if (layout === 'floating') {
    const floatClass = position === 'left'
      ? 'float-left mr-8 mb-4'
      : 'float-right ml-8 mb-4';
    return (
      <div className="overflow-hidden">
        <div className={`${floatClass} ${floatWidths[size]} not-prose`}>
          {renderImage()}
        </div>
        <div className="prose prose-slate dark:prose-invert max-w-none [&>p]:text-justify [&>p]:hyphens-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
        <div className="clear-both" />
      </div>
    );
  }

  // View mode - sidebyside layout
  return (
    <div className={`flex gap-6 my-6 ${position === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`${sizeWidths[size]} flex-shrink-0 not-prose`}>
        {renderImage()}
      </div>
      <div className="flex-1 prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}
