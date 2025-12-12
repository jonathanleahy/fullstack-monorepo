import { useState, useEffect, useCallback, useRef } from 'react';

export type LayoutType = 'normal' | 'sidebyside' | 'floating';
export type Position = 'left' | 'right';
export type Size = 'small' | 'medium' | 'large';

export interface LayoutSettings {
  layout: LayoutType;
  position: Position;
  size: Size;
}

interface DiagramLayoutPickerProps {
  diagramCode: string;
  currentLayout?: LayoutType;
  currentPosition?: Position;
  currentSize?: Size;
  currentText?: string;
  onLayoutChange?: (settings: LayoutSettings) => void;
  onMoveUp?: () => void;  // Move diagram earlier in content (before previous paragraph)
  onMoveDown?: () => void;  // Move diagram later in content (after next paragraph)
  canMoveUp?: boolean;  // Is there a paragraph before to move past?
  canMoveDown?: boolean;  // Is there a paragraph after to move past?
}

export function DiagramLayoutPicker({
  diagramCode,
  currentLayout = 'normal',
  currentPosition = 'right',
  currentSize = 'medium',
  currentText: _currentText = '',
  onLayoutChange,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
}: DiagramLayoutPickerProps) {
  // currentText is available for future use (e.g., showing text preview)
  void _currentText;
  const [layout, setLayout] = useState<LayoutType>(currentLayout);
  const [position, setPosition] = useState<Position>(currentPosition);
  const [size, setSize] = useState<Size>(currentSize);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync with props when they change
  useEffect(() => {
    setLayout(currentLayout);
    setPosition(currentPosition);
    setSize(currentSize);
  }, [currentLayout, currentPosition, currentSize]);

  // Use refs to always have current values available in callbacks
  const layoutRef = useRef(layout);
  const positionRef = useRef(position);
  const sizeRef = useRef(size);

  useEffect(() => {
    layoutRef.current = layout;
    positionRef.current = position;
    sizeRef.current = size;
  }, [layout, position, size]);

  const handleLayoutChange = (newLayout: LayoutType) => {
    setLayout(newLayout);
    layoutRef.current = newLayout;
    onLayoutChange?.({ layout: newLayout, position: positionRef.current, size: sizeRef.current });
  };

  const handlePositionChange = (newPosition: Position) => {
    setPosition(newPosition);
    positionRef.current = newPosition;
    onLayoutChange?.({ layout: layoutRef.current, position: newPosition, size: sizeRef.current });
  };

  const handleSizeChange = (newSize: Size) => {
    setSize(newSize);
    sizeRef.current = newSize;
    onLayoutChange?.({ layout: layoutRef.current, position: positionRef.current, size: newSize });
  };

  const generateMarkdown = useCallback(() => {
    if (layout === 'normal') {
      return `\`\`\`mermaid\n${diagramCode}\n\`\`\``;
    }

    return `:::${layout}:${position}:${size}
\`\`\`mermaid
${diagramCode}
\`\`\`

Your text content goes here...
:::`;
  }, [layout, position, size, diagramCode]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generateMarkdown]);

  return (
    <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
      {/* Layout Toggle */}
      <div className="flex items-center gap-1 bg-white/95 backdrop-blur rounded-lg shadow-lg border p-1">
        <button
          onClick={() => handleLayoutChange('normal')}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            layout === 'normal'
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100'
          }`}
          title="Normal (above/below)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="4" y="4" width="16" height="6" rx="1" strokeWidth="2" />
            <line x1="4" y1="14" x2="20" y2="14" strokeWidth="2" />
            <line x1="4" y1="18" x2="16" y2="18" strokeWidth="2" />
          </svg>
        </button>
        <button
          onClick={() => handleLayoutChange('sidebyside')}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            layout === 'sidebyside'
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100'
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
          onClick={() => handleLayoutChange('floating')}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            layout === 'floating'
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100'
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

        <button
          onClick={() => setShowCode(!showCode)}
          className={`px-2 py-1 text-xs rounded transition-colors ${
            showCode ? 'bg-gray-200' : 'hover:bg-gray-100'
          }`}
          title="Show markdown"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>

        <button
          onClick={handleCopy}
          className={`px-2 py-1 text-xs rounded transition-colors flex items-center gap-1 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
          title="Copy markdown to clipboard"
        >
          {copied ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Position & Size Controls (only for non-normal layouts) */}
      {layout !== 'normal' && (
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur rounded-lg shadow-lg border p-1.5">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 px-1">Pos:</span>
            <button
              onClick={() => handlePositionChange('left')}
              className={`px-2 py-0.5 text-xs rounded ${
                position === 'left' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              L
            </button>
            <button
              onClick={() => handlePositionChange('right')}
              className={`px-2 py-0.5 text-xs rounded ${
                position === 'right' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              R
            </button>
          </div>

          <div className="w-px h-4 bg-gray-200" />

          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500 px-1">Size:</span>
            <button
              onClick={() => handleSizeChange('small')}
              className={`px-1.5 py-0.5 text-xs rounded ${
                size === 'small' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              S
            </button>
            <button
              onClick={() => handleSizeChange('medium')}
              className={`px-1.5 py-0.5 text-xs rounded ${
                size === 'medium' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              M
            </button>
            <button
              onClick={() => handleSizeChange('large')}
              className={`px-1.5 py-0.5 text-xs rounded ${
                size === 'large' ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              L
            </button>
          </div>

          {/* Move diagram position controls */}
          {(onMoveUp || onMoveDown) && (
            <>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 px-1">Move:</span>
                <button
                  onClick={onMoveUp}
                  disabled={!canMoveUp}
                  className={`px-1.5 py-0.5 text-xs rounded ${
                    canMoveUp
                      ? 'hover:bg-gray-100 text-gray-700'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title="Move diagram up (before previous paragraph)"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 19V5M12 5L6 11M12 5L18 11" />
                  </svg>
                </button>
                <button
                  onClick={onMoveDown}
                  disabled={!canMoveDown}
                  className={`px-1.5 py-0.5 text-xs rounded ${
                    canMoveDown
                      ? 'hover:bg-gray-100 text-gray-700'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title="Move diagram down (after next paragraph)"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5V19M12 19L6 13M12 19L18 13" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Generated Markdown */}
      {showCode && (
        <div className="bg-gray-900 text-gray-100 rounded-lg shadow-lg p-3 max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Generated Markdown</span>
            <button
              onClick={handleCopy}
              className={`text-xs ${copied ? 'text-green-400' : 'text-blue-400 hover:text-blue-300'}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap font-mono">
            {generateMarkdown()}
          </pre>
        </div>
      )}
    </div>
  );
}
