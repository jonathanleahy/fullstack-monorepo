/**
 * ImageEditor - Edit mode component for changing images via URL, upload, or paste
 * Also provides crop and zoom controls
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface ImageCropSettings {
  x: number;
  y: number;
  width: number;
  height: number;
  zoom: number;
}

interface ImageEditorProps {
  src: string;
  alt?: string;
  caption?: string;
  cropSettings?: ImageCropSettings;
  onImageChange: (newSrc: string) => void;
  onAltChange?: (newAlt: string) => void;
  onCaptionChange?: (newCaption: string) => void;
  onCropChange?: (crop: ImageCropSettings) => void;
  onClose?: () => void;
}

const DEFAULT_CROP: ImageCropSettings = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  zoom: 1,
};

export function ImageEditor({
  src,
  alt = '',
  caption = '',
  cropSettings = DEFAULT_CROP,
  onImageChange,
  onAltChange,
  onCaptionChange,
  onCropChange,
  onClose,
}: ImageEditorProps) {
  const [activeTab, setActiveTab] = useState<'url' | 'upload' | 'crop'>('url');
  const [urlInput, setUrlInput] = useState(src);
  const [altInput, setAltInput] = useState(alt);
  const [captionInput, setCaptionInput] = useState(caption);
  const [crop, setCrop] = useState<ImageCropSettings>(cropSettings);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            const dataUrl = await fileToDataUrl(file);
            setUrlInput(dataUrl);
            onImageChange(dataUrl);
          }
          return;
        }

        // Also check for URL text
        if (item.type === 'text/plain') {
          item.getAsString((text) => {
            if (text.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i)) {
              setUrlInput(text);
              onImageChange(text);
            }
          });
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [onImageChange]);

  // Handle file upload
  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const dataUrl = await fileToDataUrl(file);
    setUrlInput(dataUrl);
    onImageChange(dataUrl);
  }, [onImageChange]);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const dataUrl = await fileToDataUrl(file);
      setUrlInput(dataUrl);
      onImageChange(dataUrl);
    }
  }, [onImageChange]);

  // URL submit
  const handleUrlSubmit = useCallback(() => {
    if (urlInput && urlInput !== src) {
      onImageChange(urlInput);
    }
  }, [urlInput, src, onImageChange]);

  // Alt text change
  const handleAltSubmit = useCallback(() => {
    onAltChange?.(altInput);
  }, [altInput, onAltChange]);

  // Caption change
  const handleCaptionSubmit = useCallback(() => {
    onCaptionChange?.(captionInput);
  }, [captionInput, onCaptionChange]);

  // Crop/zoom changes
  const handleZoomChange = useCallback((zoom: number) => {
    const newCrop = { ...crop, zoom };
    setCrop(newCrop);
    onCropChange?.(newCrop);
  }, [crop, onCropChange]);

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-4 max-w-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Edit Image</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('url')}
          className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
            activeTab === 'url'
              ? 'bg-primary text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          URL
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
            activeTab === 'upload'
              ? 'bg-primary text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          Upload
        </button>
        <button
          onClick={() => setActiveTab('crop')}
          className={`px-3 py-1.5 text-xs font-medium rounded-t transition-colors ${
            activeTab === 'crop'
              ? 'bg-primary text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          Crop/Zoom
        </button>
      </div>

      {/* URL Tab */}
      {activeTab === 'url' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Image URL</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-2 py-1.5 text-sm border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
              />
              <button
                onClick={handleUrlSubmit}
                className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded hover:bg-primary/90"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px]">Ctrl+V</kbd>
            <span>Paste image or URL from clipboard</span>
          </div>
        </div>
      )}

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-slate-300 dark:border-slate-600 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            <svg className="w-8 h-8 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Drop image here or <span className="text-primary">browse</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF, WebP, SVG</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Crop/Zoom Tab */}
      {activeTab === 'crop' && (
        <div className="space-y-4">
          {/* Image preview with crop overlay */}
          <div className="relative aspect-video bg-slate-100 dark:bg-slate-700 rounded overflow-hidden">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain"
              style={{ transform: `scale(${crop.zoom})` }}
            />
          </div>

          {/* Zoom slider */}
          <div>
            <label className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Zoom</span>
              <span>{Math.round(crop.zoom * 100)}%</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={crop.zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>50%</span>
              <span>100%</span>
              <span>300%</span>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setCrop(DEFAULT_CROP);
              onCropChange?.(DEFAULT_CROP);
            }}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Reset to Original
          </button>
        </div>
      )}

      {/* Alt & Caption (always visible) */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Alt Text</label>
          <input
            type="text"
            value={altInput}
            onChange={(e) => setAltInput(e.target.value)}
            onBlur={handleAltSubmit}
            placeholder="Describe the image..."
            className="w-full px-2 py-1.5 text-sm border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Caption</label>
          <input
            type="text"
            value={captionInput}
            onChange={(e) => setCaptionInput(e.target.value)}
            onBlur={handleCaptionSubmit}
            placeholder="Optional caption..."
            className="w-full px-2 py-1.5 text-sm border rounded bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
          />
        </div>
      </div>
    </div>
  );
}

// Helper to convert File to data URL
async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
