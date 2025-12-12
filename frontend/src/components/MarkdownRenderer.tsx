import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef, useState, useCallback, useMemo, createContext, useContext } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TerminalBlock, MistakeList, CheckList, Callout, PagerAlert, EmailPreview, ImageBlock } from '@repo/playbook';
import { LayoutWrapper } from './LayoutWrapper';
import { DiagramLayoutPicker, normalizeSize, type LayoutSettings } from './DiagramLayoutPicker';

// Edit mode context - provides edit mode state and change callback
interface EditModeContextType {
  editMode: boolean;
  onDiagramLayoutChange?: (diagramCode: string, newMarkdown: string) => void;
  onMoveDiagram?: (diagramCode: string, direction: 'up' | 'down') => void;
  canMoveDiagram?: (diagramCode: string, direction: 'up' | 'down') => boolean;
}
const EditModeContext = createContext<EditModeContextType>({ editMode: false });

// Image with expand button
interface ExpandableImageProps {
  src?: string;
  alt?: string;
}

function ExpandableImage({ src, alt }: ExpandableImageProps) {
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

// Initialize mermaid with default config
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

interface MermaidDiagramProps {
  chart: string;
  compact?: boolean;
  hideExpandButton?: boolean;
}

function MermaidDiagram({ chart, compact = false, hideExpandButton = false }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      try {
        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);

        // Parse SVG and adjust viewBox to remove excess padding
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');

        if (svgEl) {
          // Get the actual content bounds
          const tempContainer = document.createElement('div');
          tempContainer.style.position = 'absolute';
          tempContainer.style.visibility = 'hidden';
          tempContainer.innerHTML = svg;
          document.body.appendChild(tempContainer);

          const tempSvg = tempContainer.querySelector('svg');
          if (tempSvg) {
            const bbox = tempSvg.getBBox();
            // Add small padding around content
            const padding = 8;
            const newViewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`;
            svgEl.setAttribute('viewBox', newViewBox);
            // Remove fixed width/height to allow scaling
            svgEl.removeAttribute('width');
            svgEl.removeAttribute('height');
            svgEl.style.width = '100%';
            svgEl.style.height = 'auto';
          }

          document.body.removeChild(tempContainer);
          setSvg(svgEl.outerHTML);
        } else {
          setSvg(svg);
        }

        setError(null);
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart]);

  // Close on escape key
  useEffect(() => {
    if (!isExpanded) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  if (error) {
    return (
      <div className="my-4 p-4 border border-red-300 bg-red-50 rounded-lg">
        <p className="text-red-600 text-sm font-medium">Diagram Error</p>
        <p className="text-red-500 text-xs mt-1">{error}</p>
        <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-x-auto">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className={`mermaid relative group ${compact ? '' : 'my-4'}`}
        data-mermaid
      >
        <div dangerouslySetInnerHTML={{ __html: svg }} />
        {!hideExpandButton && (
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            title="Expand diagram"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        )}
      </div>

      {/* Lightbox Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsExpanded(false)}
        >
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="bg-white p-6 rounded-lg max-w-[90vw] max-h-[90vh] overflow-auto [&>svg]:w-full [&>svg]:min-w-[80vw] [&>svg]:h-auto"
            onClick={(e) => e.stopPropagation()}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      )}
    </>
  );
}

// Editable diagram wrapper with live layout preview
interface EditableDiagramProps {
  chart: string;
}

function EditableDiagram({ chart }: EditableDiagramProps) {
  const { editMode, onDiagramLayoutChange } = useContext(EditModeContext);
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    layout: 'normal',
    position: 'right',
    size: '1/2',
  });

  const handleLayoutChange = useCallback((settings: LayoutSettings) => {
    setLayoutSettings(settings);

    // Generate the new markdown for this diagram with the selected layout
    if (onDiagramLayoutChange) {
      let newMarkdown: string;
      if (settings.layout === 'normal') {
        newMarkdown = `\`\`\`mermaid\n${chart}\n\`\`\``;
      } else {
        newMarkdown = `:::${settings.layout}:${settings.position}:${settings.size}\n\`\`\`mermaid\n${chart}\n\`\`\`\n:::`;
      }
      onDiagramLayoutChange(chart, newMarkdown);
    }
  }, [chart, onDiagramLayoutChange]);

  // If not in edit mode, just render the normal diagram
  if (!editMode) {
    return <MermaidDiagram chart={chart} />;
  }

  // In edit mode, show layout picker and render according to selected layout
  const { layout, position, size } = layoutSettings;

  // Sample text for preview
  const sampleText = `This is preview text showing how your content will flow around the diagram.
In your actual markdown, replace this with your explanatory content.

The diagram will be positioned according to your selected layout options.`;

  return (
    <div className="relative my-4">
      <DiagramLayoutPicker
        diagramCode={chart}
        currentLayout={layout}
        currentPosition={position}
        currentSize={size}
        onLayoutChange={handleLayoutChange}
      />

      {layout === 'normal' && (
        <MermaidDiagram chart={chart} hideExpandButton />
      )}

      {layout === 'sidebyside' && (
        <div className="flex gap-6 items-start not-prose pt-10">
          {position === 'left' && (
            <div className={`${sizeWidths[size]} flex-shrink-0`}>
              <div className="sticky top-4">
                <MermaidDiagram chart={chart} compact hideExpandButton />
              </div>
            </div>
          )}
          <div className="flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none text-sm opacity-60 italic">
            <p>{sampleText}</p>
          </div>
          {position === 'right' && (
            <div className={`${sizeWidths[size]} flex-shrink-0`}>
              <div className="sticky top-4">
                <MermaidDiagram chart={chart} compact hideExpandButton />
              </div>
            </div>
          )}
        </div>
      )}

      {layout === 'floating' && (
        <div className="overflow-hidden not-prose pt-10">
          <div className={`${position === 'left' ? 'float-left mr-6' : 'float-right ml-6'} ${floatWidths[size]} mb-4`}>
            <MermaidDiagram chart={chart} compact hideExpandButton />
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm opacity-60 italic">
            <p>{sampleText}</p>
          </div>
          <div className="clear-both" />
        </div>
      )}
    </div>
  );
}

// Layout components for diagram positioning
interface SideBySideBlockProps {
  diagram: string;
  text: string;
  position: 'left' | 'right';
  size: string;
}

// Proportional widths for side-by-side diagrams
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

function SideBySideBlock({ diagram, text, position, size }: SideBySideBlockProps) {
  const { editMode, onDiagramLayoutChange, onMoveDiagram, canMoveDiagram } = useContext(EditModeContext);
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    layout: 'sidebyside',
    position,
    size: normalizeSize(size),
  });

  const handleLayoutChange = useCallback((settings: LayoutSettings) => {
    setLayoutSettings(settings);

    if (onDiagramLayoutChange) {
      let newMarkdown: string;
      if (settings.layout === 'normal') {
        newMarkdown = `\`\`\`mermaid\n${diagram}\n\`\`\``;
      } else {
        newMarkdown = `:::${settings.layout}:${settings.position}:${settings.size}\n\`\`\`mermaid\n${diagram}\n\`\`\`\n\n${text}\n:::`;
      }
      onDiagramLayoutChange(diagram, newMarkdown);
    }
  }, [diagram, text, onDiagramLayoutChange]);

  const handleMoveUp = useCallback(() => {
    onMoveDiagram?.(diagram, 'up');
  }, [diagram, onMoveDiagram]);

  const handleMoveDown = useCallback(() => {
    onMoveDiagram?.(diagram, 'down');
  }, [diagram, onMoveDiagram]);

  const canMoveUp = canMoveDiagram?.(diagram, 'up') ?? false;
  const canMoveDown = canMoveDiagram?.(diagram, 'down') ?? false;

  const widthClass = sizeWidths[layoutSettings.size] || 'w-1/2';

  const diagramElement = (
    <div className={`${widthClass} flex-shrink-0`}>
      <div className="sticky top-4">
        <MermaidDiagram chart={diagram} compact hideExpandButton={editMode} />
      </div>
    </div>
  );

  // In edit mode, show layout picker
  if (editMode) {
    return (
      <div className="relative my-4">
        <DiagramLayoutPicker
          diagramCode={diagram}
          currentLayout={layoutSettings.layout}
          currentPosition={layoutSettings.position}
          currentSize={layoutSettings.size}
          currentText={text}
          onLayoutChange={handleLayoutChange}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />
        <div className="my-6 flex gap-6 items-start not-prose pt-10">
          {layoutSettings.position === 'left' && diagramElement}
          <div className="flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
          {layoutSettings.position === 'right' && diagramElement}
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 flex gap-6 items-start not-prose">
      {position === 'left' && diagramElement}
      <div className="flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
      {position === 'right' && diagramElement}
    </div>
  );
}

interface FloatingBlockProps {
  diagram: string;
  text: string;
  float: 'left' | 'right';
  size: string;
}

// Proportional widths for floating diagrams
const floatWidths: Record<string, string> = {
  '1/3': 'w-1/3',
  '1/2': 'w-1/2',
  '2/3': 'w-2/3',
  'full': 'w-full',
  // Backwards compatibility
  'small': 'w-1/3',
  'medium': 'w-1/2',
  'large': 'w-2/3',
};

function FloatingBlock({ diagram, text, float, size }: FloatingBlockProps) {
  const { editMode, onDiagramLayoutChange, onMoveDiagram, canMoveDiagram } = useContext(EditModeContext);
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    layout: 'floating',
    position: float,
    size: normalizeSize(size),
  });

  const handleLayoutChange = useCallback((settings: LayoutSettings) => {
    setLayoutSettings(settings);

    if (onDiagramLayoutChange) {
      let newMarkdown: string;
      if (settings.layout === 'normal') {
        newMarkdown = `\`\`\`mermaid\n${diagram}\n\`\`\``;
      } else {
        newMarkdown = `:::${settings.layout}:${settings.position}:${settings.size}\n\`\`\`mermaid\n${diagram}\n\`\`\`\n\n${text}\n:::`;
      }
      onDiagramLayoutChange(diagram, newMarkdown);
    }
  }, [diagram, text, onDiagramLayoutChange]);

  const handleMoveUp = useCallback(() => {
    onMoveDiagram?.(diagram, 'up');
  }, [diagram, onMoveDiagram]);

  const handleMoveDown = useCallback(() => {
    onMoveDiagram?.(diagram, 'down');
  }, [diagram, onMoveDiagram]);

  const canMoveUp = canMoveDiagram?.(diagram, 'up') ?? false;
  const canMoveDown = canMoveDiagram?.(diagram, 'down') ?? false;

  const floatClass = layoutSettings.position === 'left' ? 'float-left mr-6' : 'float-right ml-6';
  const widthClass = floatWidths[layoutSettings.size] || 'w-1/2';

  // In edit mode, show layout picker
  if (editMode) {
    return (
      <div className="relative my-4">
        <DiagramLayoutPicker
          diagramCode={diagram}
          currentLayout={layoutSettings.layout}
          currentPosition={layoutSettings.position}
          currentSize={layoutSettings.size}
          currentText={text}
          onLayoutChange={handleLayoutChange}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          canMoveUp={canMoveUp}
          canMoveDown={canMoveDown}
        />
        <div className="my-6 overflow-hidden not-prose pt-10">
          <div className={`${floatClass} ${widthClass} mb-4`}>
            <MermaidDiagram chart={diagram} compact hideExpandButton />
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
          <div className="clear-both" />
        </div>
      </div>
    );
  }

  const originalFloatClass = float === 'left' ? 'float-left mr-6' : 'float-right ml-6';

  // Don't contain the float - let subsequent content flow around the diagram
  return (
    <>
      <div className={`${originalFloatClass} ${floatWidths[size]} mb-4 not-prose`}>
        <MermaidDiagram chart={diagram} compact />
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </>
  );
}

// Parse layout blocks from content
type ContentType = 'mermaid' | 'email' | 'pager' | 'terminal' | 'image' | 'unknown';

interface LayoutBlock {
  type: 'sidebyside' | 'floating' | 'markdown';
  position?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  diagram?: string;  // Kept for backward compatibility with mermaid
  contentType?: ContentType;  // Type of content inside layout
  contentRaw?: string;  // Raw content string for non-mermaid types
  imageSrc?: string;  // Image source URL
  imageAlt?: string;  // Image alt text
  imageCaption?: string;  // Image caption
  text?: string;
  content?: string;
  blockIndex?: number;  // Index of this layout block (for text boundary tracking)
}


// Find all mermaid diagrams in content and return their positions
function findMermaidDiagrams(content: string): Array<{ start: number; end: number; code: string }> {
  const diagrams: Array<{ start: number; end: number; code: string }> = [];

  // First find layout blocks with mermaid diagrams - these take precedence
  const layoutPattern = /:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/g;
  const layoutRanges: Array<{ start: number; end: number }> = [];
  let layoutMatch;

  while ((layoutMatch = layoutPattern.exec(content)) !== null) {
    const innerContent = layoutMatch[4];
    const mermaidMatch = innerContent.match(/```mermaid\n([\s\S]*?)```/);
    if (mermaidMatch) {
      diagrams.push({
        start: layoutMatch.index,
        end: layoutMatch.index + layoutMatch[0].length,
        code: mermaidMatch[1].trim(),
      });
      layoutRanges.push({
        start: layoutMatch.index,
        end: layoutMatch.index + layoutMatch[0].length,
      });
    }
  }

  // Find standalone mermaid code blocks (not inside layout blocks)
  const mermaidPattern = /```mermaid\n([\s\S]*?)```/g;
  let match: RegExpExecArray | null;

  while ((match = mermaidPattern.exec(content)) !== null) {
    const matchIndex = match.index;
    // Check if this mermaid block is inside a layout block
    const isInsideLayout = layoutRanges.some(
      range => matchIndex >= range.start && matchIndex < range.end
    );
    if (!isInsideLayout) {
      diagrams.push({
        start: match.index,
        end: match.index + match[0].length,
        code: match[1].trim(),
      });
    }
  }

  // Sort by position to ensure correct order for replacement
  diagrams.sort((a, b) => a.start - b.start);

  return diagrams;
}

// Rebuild content with diagram modifications applied
function rebuildContentWithModifications(
  originalContent: string,
  modifications: Map<string, string>
): string {
  if (modifications.size === 0) return originalContent;

  const diagrams = findMermaidDiagrams(originalContent);
  let result = originalContent;
  let offset = 0;

  diagrams.forEach((diagram) => {
    const modification = modifications.get(diagram.code);
    if (modification) {
      const originalText = originalContent.slice(diagram.start, diagram.end);
      const start = diagram.start + offset;
      const end = diagram.end + offset;
      result = result.slice(0, start) + modification + result.slice(end);
      offset += modification.length - originalText.length;
    }
  });

  return result;
}

// Detect content type from code block language
function detectContentType(language: string): ContentType {
  switch (language.toLowerCase()) {
    case 'mermaid':
      return 'mermaid';
    case 'email':
      return 'email';
    case 'pager':
    case 'alert':
    case 'notification':
      return 'pager';
    case 'terminal':
    case 'bash':
    case 'shell':
      return 'terminal';
    default:
      return 'unknown';
  }
}

function parseLayoutBlocks(content: string): LayoutBlock[] {
  const blocks: LayoutBlock[] = [];

  // Pattern: :::sidebyside:position:size or :::floating:position:size
  // Size can be: small, medium, large (legacy) or 1/3, 1/2, 2/3, full (new)
  const layoutPattern = /:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/g;

  let lastIndex = 0;
  let match;
  let layoutBlockIndex = 0;

  while ((match = layoutPattern.exec(content)) !== null) {
    // Add any markdown before this block
    if (match.index > lastIndex) {
      const beforeText = content.slice(lastIndex, match.index).trim();
      if (beforeText) {
        blocks.push({ type: 'markdown', content: beforeText });
      }
    }

    const [, layoutType, position = 'right', size = 'medium', innerContent] = match;

    // Try to extract any code block from inner content
    const codeBlockMatch = innerContent.match(/```(\w+)\n([\s\S]*?)```/);

    // Try to extract image from inner content: ![alt](src) or ![alt](src "caption")
    const imageMatch = innerContent.match(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/);

    if (codeBlockMatch) {
      const [fullMatch, language, codeContent] = codeBlockMatch;
      const contentType = detectContentType(language);
      const text = innerContent.replace(fullMatch, '').trim();

      if (contentType === 'mermaid') {
        // Backward compatible: use 'diagram' field for mermaid
        blocks.push({
          type: layoutType as 'sidebyside' | 'floating',
          position: position as 'left' | 'right',
          size: size as 'small' | 'medium' | 'large',
          contentType: 'mermaid',
          diagram: codeContent.trim(),
          text,
          blockIndex: layoutBlockIndex++,
        });
      } else {
        // New content types use contentRaw
        blocks.push({
          type: layoutType as 'sidebyside' | 'floating',
          position: position as 'left' | 'right',
          size: size as 'small' | 'medium' | 'large',
          contentType,
          contentRaw: codeContent.trim(),
          text,
          blockIndex: layoutBlockIndex++,
        });
      }
    } else if (imageMatch) {
      // Image inside layout block
      const [fullMatch, alt, src, caption] = imageMatch;
      const text = innerContent.replace(fullMatch, '').trim();

      blocks.push({
        type: layoutType as 'sidebyside' | 'floating',
        position: position as 'left' | 'right',
        size: size as 'small' | 'medium' | 'large',
        contentType: 'image',
        imageSrc: src,
        imageAlt: alt || undefined,
        imageCaption: caption || undefined,
        text,
        blockIndex: layoutBlockIndex++,
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining markdown
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex).trim();
    if (remainingText) {
      blocks.push({ type: 'markdown', content: remainingText });
    }
  }

  // If no layout blocks found, treat entire content as markdown
  if (blocks.length === 0) {
    blocks.push({ type: 'markdown', content });
  }

  return blocks;
}

interface MarkdownRendererProps {
  content: string;
  className?: string;
  editMode?: boolean;
  onContentChange?: (newContent: string) => void;
}

export function MarkdownRenderer({ content, className = '', editMode = false, onContentChange }: MarkdownRendererProps) {
  const blocks = useMemo(() => parseLayoutBlocks(content), [content]);

  // Track diagram modifications - maps diagramCode to modified markdown
  const diagramModificationsRef = useRef<Map<string, string>>(new Map());

  // Handle diagram layout changes
  const handleDiagramLayoutChange = useCallback((diagramCode: string, newMarkdown: string) => {
    diagramModificationsRef.current.set(diagramCode, newMarkdown);

    // Rebuild the full content with modifications
    if (onContentChange) {
      const newContent = rebuildContentWithModifications(content, diagramModificationsRef.current);
      onContentChange(newContent);
    }
  }, [content, onContentChange]);

  // Reset modifications when content changes (e.g., after save)
  useEffect(() => {
    diagramModificationsRef.current.clear();
  }, [content]);

  // Handle moving a diagram up or down in the content
  const handleMoveDiagram = useCallback((diagramCode: string, direction: 'up' | 'down') => {
    // Find the layout block with this diagram
    const layoutPattern = /:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/g;
    let match;
    let targetBlock: { start: number; end: number; fullMatch: string } | null = null;

    while ((match = layoutPattern.exec(content)) !== null) {
      const innerContent = match[4];
      const mermaidMatch = innerContent.match(/```mermaid\n([\s\S]*?)```/);
      if (mermaidMatch && mermaidMatch[1].trim() === diagramCode) {
        targetBlock = {
          start: match.index,
          end: match.index + match[0].length,
          fullMatch: match[0],
        };
        break;
      }
    }

    if (!targetBlock) return;

    // Strategy: Move ONLY the diagram. All text stays exactly where it is.
    // The layout block syntax (:::floating/sidebyside) contains both a diagram and associated text.
    // When we "move" the diagram, we:
    // 1. Remove the diagram from its current layout block
    // 2. Convert the remaining text in that block to a regular paragraph
    // 3. Find the paragraph we're moving past
    // 4. Create a new layout block at the new position with just the diagram
    //
    // Result: Text paragraphs are unchanged, only the diagram position changes.

    // Parse the layout block to extract diagram and text
    const innerContent = targetBlock.fullMatch.match(/:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/);
    if (!innerContent) return;

    const layoutType = innerContent[1] as 'sidebyside' | 'floating';
    const position = innerContent[2] || 'right';
    const size = innerContent[3] || 'medium';
    const blockInnerContent = innerContent[4];

    // Extract mermaid diagram from block
    const mermaidMatch = blockInnerContent.match(/```mermaid\n([\s\S]*?)```/);
    if (!mermaidMatch) return;

    const mermaidBlock = mermaidMatch[0];

    // Extract text that's inside the layout block (after the mermaid block)
    const textInsideBlock = blockInnerContent.replace(mermaidMatch[0], '').trim();

    // Content before and after the layout block
    const contentBefore = content.slice(0, targetBlock.start);
    const contentAfter = content.slice(targetBlock.end);

    // For moving, we need to find actual paragraph boundaries
    // Split content before into paragraphs
    const beforeParagraphs = contentBefore.trim().split(/\n\n+/).filter(p => p.trim());

    // For contentAfter, we need to be careful not to split inside layout blocks
    // Find the first "real" paragraph in contentAfter (not a layout block)
    const afterTrimmed = contentAfter.trim();

    if (direction === 'up') {
      if (beforeParagraphs.length === 0) return; // Can't move up

      // The last paragraph before the diagram will become the text INSIDE the new layout block
      const paragraphToWrapWith = beforeParagraphs.pop()!;
      const remainingBefore = beforeParagraphs.join('\n\n');

      // Build the new layout block with just the diagram + the paragraph we're moving past
      const newLayoutBlock = `:::${layoutType}:${position}:${size}\n${mermaidBlock}\n\n${paragraphToWrapWith}\n:::`;

      // Build final content:
      // [remaining paragraphs before] + [new layout block] + [text that was in old block] + [content after]
      const parts: string[] = [];

      if (remainingBefore) {
        parts.push(remainingBefore);
      }

      parts.push(newLayoutBlock);

      if (textInsideBlock) {
        parts.push(textInsideBlock);
      }

      if (afterTrimmed) {
        parts.push(afterTrimmed);
      }

      const newContent = parts.join('\n\n');

      if (onContentChange) {
        onContentChange(newContent.trim());
      }
    } else {
      // Move down - find the first paragraph after the block to become the new wrapped text

      // Check if contentAfter starts with a layout block
      const layoutBlockMatch = afterTrimmed.match(/^:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/);

      let firstParagraphAfter: string;
      let remainingAfter: string;

      if (layoutBlockMatch) {
        // The next thing is another layout block - we can't move past it the same way
        // For now, extract the text content from it or skip
        // This is a complex case - let's just take the text from inside the next block
        const nextBlockText = layoutBlockMatch[4].replace(/```mermaid\n[\s\S]*?```/, '').trim();
        if (!nextBlockText) return; // Can't move down past another diagram-only block
        firstParagraphAfter = nextBlockText;
        remainingAfter = afterTrimmed.slice(layoutBlockMatch[0].length).trim();
      } else {
        // Split normally on paragraph boundaries
        const afterParagraphs = afterTrimmed.split(/\n\n+/).filter(p => p.trim());
        if (afterParagraphs.length === 0) return; // Can't move down

        firstParagraphAfter = afterParagraphs.shift()!;
        remainingAfter = afterParagraphs.join('\n\n');
      }

      // Build the new layout block with the diagram + the paragraph we're moving past
      const newLayoutBlock = `:::${layoutType}:${position}:${size}\n${mermaidBlock}\n\n${firstParagraphAfter}\n:::`;

      // Build final content:
      // [content before] + [text that was in old block] + [new layout block] + [remaining after]
      const parts: string[] = [];

      if (contentBefore.trim()) {
        parts.push(contentBefore.trim());
      }

      if (textInsideBlock) {
        parts.push(textInsideBlock);
      }

      parts.push(newLayoutBlock);

      if (remainingAfter) {
        parts.push(remainingAfter);
      }

      const newContent = parts.join('\n\n');

      if (onContentChange) {
        onContentChange(newContent.trim());
      }
    }
  }, [content, onContentChange]);

  // Check if a diagram can be moved in a direction
  const canMoveDiagramCheck = useCallback((diagramCode: string, direction: 'up' | 'down'): boolean => {
    // Find the layout block with this diagram
    const layoutPattern = /:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/g;
    let match;

    while ((match = layoutPattern.exec(content)) !== null) {
      const innerContent = match[4];
      const mermaidMatch = innerContent.match(/```mermaid\n([\s\S]*?)```/);
      if (mermaidMatch && mermaidMatch[1].trim() === diagramCode) {
        const contentBefore = content.slice(0, match.index);
        const contentAfter = content.slice(match.index + match[0].length);

        // Check for paragraphs (content outside of layout blocks)
        const paragraphsBefore = contentBefore.split(/\n\n+/).filter(p => p.trim());
        const paragraphsAfter = contentAfter.split(/\n\n+/).filter(p => p.trim());

        if (direction === 'up') {
          return paragraphsBefore.length > 0;
        } else {
          return paragraphsAfter.length > 0;
        }
      }
    }
    return false;
  }, [content]);

  const contextValue = useMemo(() => ({
    editMode,
    onDiagramLayoutChange: handleDiagramLayoutChange,
    onMoveDiagram: handleMoveDiagram,
    canMoveDiagram: canMoveDiagramCheck,
  }), [editMode, handleDiagramLayoutChange, handleMoveDiagram, canMoveDiagramCheck]);

  // Helper to render content based on type
  const renderLayoutContent = (block: LayoutBlock) => {
    // Mermaid diagram (backward compatible)
    if (block.contentType === 'mermaid' && block.diagram) {
      return <MermaidDiagram chart={block.diagram} compact />;
    }

    // Email preview
    if (block.contentType === 'email' && block.contentRaw) {
      // Parse variant from first line if present
      const firstLine = block.contentRaw.split('\n')[0];
      const variantMatch = firstLine.match(/^@(critical|warning|info|success)$/);
      if (variantMatch) {
        const variant = variantMatch[1] as 'critical' | 'warning' | 'info' | 'success';
        const emailContent = block.contentRaw.split('\n').slice(1).join('\n');
        return <EmailPreview variant={variant} content={emailContent} />;
      }
      return <EmailPreview content={block.contentRaw} />;
    }

    // Pager alert
    if (block.contentType === 'pager' && block.contentRaw) {
      const firstLine = block.contentRaw.split('\n')[0];
      const metaMatch = firstLine.match(/^@(critical|warning|info|success)(?:\s*\|\s*(.+?))?(?:\s*\|\s*(.+?))?$/);
      if (metaMatch) {
        const variant = metaMatch[1] as 'critical' | 'warning' | 'info' | 'success';
        const time = metaMatch[2]?.trim();
        const source = metaMatch[3]?.trim();
        const alertContent = block.contentRaw.split('\n').slice(1).join('\n');
        return <PagerAlert variant={variant} time={time} source={source} content={alertContent} />;
      }
      return <PagerAlert content={block.contentRaw} />;
    }

    // Terminal block
    if (block.contentType === 'terminal' && block.contentRaw) {
      return <TerminalBlock content={block.contentRaw} />;
    }

    // Image block
    if (block.contentType === 'image' && block.imageSrc) {
      return <ImageBlock src={block.imageSrc} alt={block.imageAlt} caption={block.imageCaption} />;
    }

    return null;
  };

  return (
    <EditModeContext.Provider value={contextValue}>
    <div className={`${className}`}>
      {blocks.map((block, index) => {
        // Handle mermaid diagrams with existing SideBySideBlock/FloatingBlock (edit mode support)
        if (block.type === 'sidebyside' && block.contentType === 'mermaid' && block.diagram && block.text !== undefined) {
          return (
            <SideBySideBlock
              key={index}
              diagram={block.diagram}
              text={block.text}
              position={block.position || 'right'}
              size={block.size || 'medium'}
            />
          );
        }

        if (block.type === 'floating' && block.contentType === 'mermaid' && block.diagram && block.text !== undefined) {
          return (
            <FloatingBlock
              key={index}
              diagram={block.diagram}
              text={block.text}
              float={block.position || 'right'}
              size={block.size || 'medium'}
            />
          );
        }

        // Handle other content types with generic LayoutWrapper
        if ((block.type === 'sidebyside' || block.type === 'floating') && block.contentType && block.contentType !== 'mermaid') {
          const contentElement = renderLayoutContent(block);
          if (contentElement) {
            return (
              <LayoutWrapper
                key={index}
                layout={block.type}
                position={block.position || 'right'}
                size={block.size || 'medium'}
                content={contentElement}
                text={block.text}
              />
            );
          }
        }

        // Regular markdown
        return (
          <div key={index} className="prose prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  const codeString = String(children).replace(/\n$/, '');

                  // Check if this is a mermaid code block
                  if (language === 'mermaid') {
                    return <EditableDiagram chart={codeString} />;
                  }

                  // Custom content block types
                  if (language === 'terminal' || language === 'bash' || language === 'shell') {
                    return <TerminalBlock content={codeString} />;
                  }

                  if (language === 'mistakes' || language === 'errors') {
                    return <MistakeList content={codeString} />;
                  }

                  if (language === 'checklist' || language === 'success') {
                    return <CheckList content={codeString} />;
                  }

                  if (language === 'info' || language === 'note') {
                    return <Callout variant="info" content={codeString} />;
                  }

                  if (language === 'warning' || language === 'caution') {
                    return <Callout variant="warning" content={codeString} />;
                  }

                  if (language === 'tip' || language === 'hint') {
                    return <Callout variant="tip" content={codeString} />;
                  }

                  if (language === 'danger' || language === 'critical') {
                    return <Callout variant="danger" content={codeString} />;
                  }

                  // Pager/notification alerts - sketch style
                  if (language === 'pager' || language === 'alert' || language === 'notification') {
                    // Parse optional metadata from first line: variant|time|source
                    const firstLine = codeString.split('\n')[0];
                    const metaMatch = firstLine.match(/^@(critical|warning|info|success)(?:\s*\|\s*(.+?))?(?:\s*\|\s*(.+?))?$/);

                    if (metaMatch) {
                      const variant = metaMatch[1] as 'critical' | 'warning' | 'info' | 'success';
                      const time = metaMatch[2]?.trim();
                      const source = metaMatch[3]?.trim();
                      const alertContent = codeString.split('\n').slice(1).join('\n');
                      return <PagerAlert variant={variant} time={time} source={source} content={alertContent} />;
                    }

                    return <PagerAlert content={codeString} />;
                  }

                  // Email preview - styled email message
                  if (language === 'email') {
                    // Parse optional variant from first line: @variant
                    const firstLine = codeString.split('\n')[0];
                    const variantMatch = firstLine.match(/^@(critical|warning|info|success)$/);

                    if (variantMatch) {
                      const variant = variantMatch[1] as 'critical' | 'warning' | 'info' | 'success';
                      const emailContent = codeString.split('\n').slice(1).join('\n');
                      return <EmailPreview variant={variant} content={emailContent} />;
                    }

                    return <EmailPreview content={codeString} />;
                  }

                  // Check for inline code (no className means inline)
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  }

                  // Regular code block with syntax highlighting
                  return (
                    <div className="not-prose my-4">
                      <SyntaxHighlighter
                        style={oneDark}
                        language={language || 'text'}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                        }}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  );
                },
                pre({ children }) {
                  // The code component already handles all rendering including custom blocks
                  // Just return children without any wrapper to avoid double-wrapping
                  return <>{children}</>;
                },
                img({ src, alt }) {
                  return <ExpandableImage src={src} alt={alt} />;
                },
              }}
            >
              {block.content || ''}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
    </EditModeContext.Provider>
  );
}
