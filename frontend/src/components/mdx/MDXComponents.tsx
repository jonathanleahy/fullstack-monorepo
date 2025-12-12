/**
 * MDX Components - Provides all custom components for MDX content
 *
 * These components can be used directly in MDX files like:
 * <Image src="/path/to/image.png" position="right" size="1/2" />
 * <Floating position="right" size="1/2">content</Floating>
 */

import { ReactNode } from 'react';
import {
  TerminalBlock,
  MistakeList,
  CheckList,
  Callout,
  PagerAlert,
  EmailPreview,
  ImageBlock,
} from '@repo/playbook';

// ============================================================================
// Layout Components
// ============================================================================

interface FloatingProps {
  children: ReactNode;
  position?: 'left' | 'right';
  size?: '1/3' | '1/2' | '2/3' | 'full';
}

const sizeClasses: Record<string, string> = {
  '1/3': 'w-1/3',
  '1/2': 'w-1/2',
  '2/3': 'w-2/3',
  'full': 'w-full',
};

export function Floating({ children, position = 'right', size = '1/2' }: FloatingProps) {
  const floatClass = position === 'left' ? 'float-left mr-6' : 'float-right ml-6';
  const widthClass = sizeClasses[size] || 'w-1/2';

  return (
    <div className={`${floatClass} ${widthClass} mb-4`}>
      {children}
    </div>
  );
}

interface SideBySideProps {
  children: ReactNode;
  position?: 'left' | 'right';
  size?: '1/3' | '1/2' | '2/3' | 'full';
  text?: ReactNode;
}

export function SideBySide({ children, position = 'right', size = '1/2', text }: SideBySideProps) {
  const widthClass = sizeClasses[size] || 'w-1/2';

  const contentElement = (
    <div className={`${widthClass} flex-shrink-0`}>
      <div className="sticky top-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="my-6 flex gap-6 items-start not-prose">
      {position === 'left' && contentElement}
      <div className="flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none">
        {text}
      </div>
      {position === 'right' && contentElement}
    </div>
  );
}

// ============================================================================
// Image Component with Crop/Zoom support
// ============================================================================

interface ImageProps {
  src: string;
  alt?: string;
  caption?: string;
  position?: 'left' | 'right';
  size?: '1/3' | '1/2' | '2/3' | 'full';
  layout?: 'floating' | 'sidebyside' | 'inline';
  crop?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  zoom?: number;
  bordered?: boolean;
  rounded?: boolean;
  shadow?: boolean;
}

export function Image({
  src,
  alt = '',
  caption,
  position = 'right',
  size = '1/2',
  layout = 'inline',
  crop,
  zoom = 1,
  bordered = false,
  rounded = true,
  shadow = true,
}: ImageProps) {
  // Apply crop and zoom via CSS
  const imageStyle: React.CSSProperties = {};

  if (crop) {
    // Use object-fit and object-position for cropping
    imageStyle.objectFit = 'none';
    imageStyle.objectPosition = `${-crop.x}% ${-crop.y}%`;
    imageStyle.width = `${crop.width}%`;
    imageStyle.height = `${crop.height}%`;
  }

  if (zoom !== 1) {
    imageStyle.transform = `scale(${zoom})`;
    imageStyle.transformOrigin = 'center center';
  }

  const imageElement = (
    <ImageBlock
      src={src}
      alt={alt}
      caption={caption}
      bordered={bordered}
      rounded={rounded}
      shadow={shadow}
    />
  );

  // Inline layout - just render the image
  if (layout === 'inline') {
    return imageElement;
  }

  // Floating layout
  if (layout === 'floating') {
    return (
      <Floating position={position} size={size}>
        {imageElement}
      </Floating>
    );
  }

  // Side-by-side layout (typically used with text prop)
  if (layout === 'sidebyside') {
    return (
      <SideBySide position={position} size={size}>
        {imageElement}
      </SideBySide>
    );
  }

  return imageElement;
}

// ============================================================================
// Re-export Playbook Components for MDX use
// ============================================================================

export { TerminalBlock as Terminal };
export { MistakeList as Mistakes };
export { CheckList };
export { Callout };
export { PagerAlert as Pager };
export { EmailPreview as Email };

// ============================================================================
// Diagram Component (Mermaid wrapper)
// ============================================================================

interface DiagramProps {
  children: string;
  position?: 'left' | 'right';
  size?: '1/3' | '1/2' | '2/3' | 'full';
  layout?: 'floating' | 'sidebyside' | 'inline';
}

// This will be connected to MermaidDiagram in the MDXRenderer
export function Diagram({ children, position, size, layout }: DiagramProps) {
  // Placeholder - actual implementation will use MermaidDiagram
  return (
    <div data-mdx-diagram data-position={position} data-size={size} data-layout={layout}>
      {children}
    </div>
  );
}

// ============================================================================
// Component Map for MDXProvider
// ============================================================================

export const mdxComponents = {
  // Layout components
  Floating,
  SideBySide,

  // Content components
  Image,
  Terminal: TerminalBlock,
  Mistakes: MistakeList,
  CheckList,
  Callout,
  Pager: PagerAlert,
  Email: EmailPreview,
  Diagram,

  // Also provide lowercase versions for flexibility
  floating: Floating,
  sidebyside: SideBySide,
  image: Image,
  terminal: TerminalBlock,
  mistakes: MistakeList,
  checklist: CheckList,
  callout: Callout,
  pager: PagerAlert,
  email: EmailPreview,
  diagram: Diagram,
};

export default mdxComponents;
