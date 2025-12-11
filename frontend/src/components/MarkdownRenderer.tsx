import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TerminalBlock, MistakeList, CheckList, Callout, PagerAlert } from '@repo/playbook';

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
}

function MermaidDiagram({ chart, compact = false }: MermaidDiagramProps) {
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
        setSvg(svg);
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
        <div className="flex justify-center [&>svg]:max-w-full [&>svg]:h-auto" dangerouslySetInnerHTML={{ __html: svg }} />
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          title="Expand diagram"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
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

// Layout components for diagram positioning
interface SideBySideBlockProps {
  diagram: string;
  text: string;
  position: 'left' | 'right';
  size: 'small' | 'medium' | 'large';
}

const sizeWidths = {
  small: 'w-1/3',
  medium: 'w-5/12',
  large: 'w-1/2',
};

function SideBySideBlock({ diagram, text, position, size }: SideBySideBlockProps) {
  const diagramElement = (
    <div className={`${sizeWidths[size]} flex-shrink-0`}>
      <div className="sticky top-4">
        <MermaidDiagram chart={diagram} compact />
      </div>
    </div>
  );

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
  size: 'small' | 'medium' | 'large';
}

const floatWidths = {
  small: 'w-56',
  medium: 'w-72',
  large: 'w-96',
};

function FloatingBlock({ diagram, text, float, size }: FloatingBlockProps) {
  const floatClass = float === 'left' ? 'float-left mr-6' : 'float-right ml-6';

  return (
    <div className="my-6 overflow-hidden not-prose">
      <div className={`${floatClass} ${floatWidths[size]} mb-4`}>
        <MermaidDiagram chart={diagram} compact />
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
      <div className="clear-both" />
    </div>
  );
}

// Parse layout blocks from content
interface LayoutBlock {
  type: 'sidebyside' | 'floating' | 'markdown';
  position?: 'left' | 'right';
  size?: 'small' | 'medium' | 'large';
  diagram?: string;
  text?: string;
  content?: string;
}

function parseLayoutBlocks(content: string): LayoutBlock[] {
  const blocks: LayoutBlock[] = [];

  // Pattern: :::sidebyside:position:size or :::floating:position:size
  const layoutPattern = /:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large))?\n([\s\S]*?):::/g;

  let lastIndex = 0;
  let match;

  while ((match = layoutPattern.exec(content)) !== null) {
    // Add any markdown before this block
    if (match.index > lastIndex) {
      const beforeText = content.slice(lastIndex, match.index).trim();
      if (beforeText) {
        blocks.push({ type: 'markdown', content: beforeText });
      }
    }

    const [, layoutType, position = 'right', size = 'medium', innerContent] = match;

    // Extract mermaid diagram from inner content
    const mermaidMatch = innerContent.match(/```mermaid\n([\s\S]*?)```/);
    if (mermaidMatch) {
      const diagram = mermaidMatch[1].trim();
      const text = innerContent.replace(/```mermaid\n[\s\S]*?```/, '').trim();

      blocks.push({
        type: layoutType as 'sidebyside' | 'floating',
        position: position as 'left' | 'right',
        size: size as 'small' | 'medium' | 'large',
        diagram,
        text,
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
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const blocks = useMemo(() => parseLayoutBlocks(content), [content]);

  return (
    <div className={`${className}`}>
      {blocks.map((block, index) => {
        if (block.type === 'sidebyside' && block.diagram && block.text !== undefined) {
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

        if (block.type === 'floating' && block.diagram && block.text !== undefined) {
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
                    return <MermaidDiagram chart={codeString} />;
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
  );
}
