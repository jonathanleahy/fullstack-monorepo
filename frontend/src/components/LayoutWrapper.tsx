import { ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DiagramLayoutPicker, type LayoutSettings } from './DiagramLayoutPicker';

export type LayoutType = 'sidebyside' | 'floating';
export type Position = 'left' | 'right';
export type Size = '1/3' | '1/2' | '2/3' | 'full';

// Size mappings for both layout types
const sizeWidths: Record<string, string> = {
  '1/3': 'w-1/3',
  '1/2': 'w-1/2',
  '2/3': 'w-2/3',
  'full': 'w-full',
  // Backwards compatibility
  'small': 'w-1/3',
  'medium': 'w-1/2',
  'large': 'w-2/3',
};

interface LayoutWrapperProps {
  layout: LayoutType;
  position?: Position;
  size?: Size | string;
  /** The content to display in the layout (diagram, email, image, etc.) */
  content: ReactNode;
  /** The text content that flows around/beside the main content */
  children?: ReactNode;
  /** If provided as string, will be rendered as markdown */
  text?: string;
  /** Enable edit mode with layout picker */
  editMode?: boolean;
  /** Unique identifier for this content block (used for edit mode) */
  contentId?: string;
  /** Callback when layout changes in edit mode */
  onLayoutChange?: (contentId: string, settings: LayoutSettings) => void;
  /** Callback for moving content up in document */
  onMoveUp?: () => void;
  /** Callback for moving content down in document */
  onMoveDown?: () => void;
  /** Can this content be moved up? */
  canMoveUp?: boolean;
  /** Can this content be moved down? */
  canMoveDown?: boolean;
}

export function LayoutWrapper({
  layout,
  position = 'right',
  size = '1/2',
  content,
  children,
  text,
  editMode = false,
  contentId,
  onLayoutChange,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
}: LayoutWrapperProps) {
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    layout,
    position,
    size: size as Size,
  });

  // Sync with props when they change
  useEffect(() => {
    setLayoutSettings({ layout, position, size: size as Size });
  }, [layout, position, size]);

  // Use refs for current values in callbacks
  const layoutRef = useRef(layoutSettings);
  useEffect(() => {
    layoutRef.current = layoutSettings;
  }, [layoutSettings]);

  const handleLayoutChange = useCallback((settings: LayoutSettings) => {
    setLayoutSettings(settings);
    if (contentId && onLayoutChange) {
      onLayoutChange(contentId, settings);
    }
  }, [contentId, onLayoutChange]);

  const widthClass = sizeWidths[layoutSettings.size] || sizeWidths[size] || 'w-1/2';
  const effectivePosition = layoutSettings.position;
  const effectiveLayout = layoutSettings.layout;

  // Render text content (either children or markdown string)
  const textContent = children || (text ? (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  ) : null);

  // Content element with optional sticky positioning for sidebyside
  const contentElement = (
    <div className={`${widthClass} flex-shrink-0`}>
      {effectiveLayout === 'sidebyside' ? (
        <div className="sticky top-4">{content}</div>
      ) : (
        content
      )}
    </div>
  );

  // Edit mode wrapper
  if (editMode) {
    return (
      <div className="relative my-4">
        <DiagramLayoutPicker
          diagramCode={contentId || 'content'}
          currentLayout={effectiveLayout}
          currentPosition={effectivePosition}
          currentSize={layoutSettings.size}
          currentText={text}
          onLayoutChange={handleLayoutChange}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />

        {effectiveLayout === 'sidebyside' ? (
          <div className="my-6 flex gap-6 items-start not-prose pt-10">
            {effectivePosition === 'left' && contentElement}
            <div className="flex-1 min-w-0">{textContent}</div>
            {effectivePosition === 'right' && contentElement}
          </div>
        ) : (
          <div className="my-6 overflow-hidden not-prose pt-10">
            <div className={`${effectivePosition === 'left' ? 'float-left mr-6' : 'float-right ml-6'} ${widthClass} mb-4`}>
              {content}
            </div>
            {textContent}
            <div className="clear-both" />
          </div>
        )}
      </div>
    );
  }

  // Non-edit mode rendering
  if (effectiveLayout === 'sidebyside') {
    return (
      <div className="my-6 flex gap-6 items-start not-prose">
        {effectivePosition === 'left' && contentElement}
        <div className="flex-1 min-w-0">{textContent}</div>
        {effectivePosition === 'right' && contentElement}
      </div>
    );
  }

  // Floating layout
  const floatClass = effectivePosition === 'left' ? 'float-left mr-6' : 'float-right ml-6';

  return (
    <>
      <div className={`${floatClass} ${widthClass} mb-4 not-prose`}>
        {content}
      </div>
      {textContent}
    </>
  );
}
