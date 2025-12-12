/**
 * MDXRenderer - Enhanced markdown renderer with MDX-like component support
 *
 * Supports two syntaxes:
 * 1. Directive syntax: :::floating:right:1/3 ... :::
 * 2. JSX component syntax: <Floating position="right" size="1/3">...</Floating>
 *
 * Includes edit mode support with DiagramLayoutPicker
 */

import { useMemo, useState, useCallback, type ReactNode, Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PagerAlert, EmailPreview, TerminalBlock, ImageBlock } from '@repo/playbook';

import { EditModeProvider, useEditMode } from './context/EditModeContext';
import { MermaidDiagram } from './components/MermaidDiagram';
import { EditableDiagram } from './components/EditableDiagram';
import { ExpandableImage } from './components/ExpandableImage';
import { sizeWidths, floatWidths } from './layouts/constants';
import { DiagramLayoutPicker, normalizeSize, type LayoutSettings } from '../DiagramLayoutPicker';

// Layout wrapper for floating content with edit mode support
interface FloatingWrapperProps {
  position: 'left' | 'right';
  size: string;
  children: ReactNode;
  text?: string;
  contentType?: string;
  diagramCode?: string;
  codeContent?: string;
  onLayoutChange?: (settings: LayoutSettings) => void;
}

function FloatingWrapper({ position, size, children, text, contentType, diagramCode, codeContent, onLayoutChange }: FloatingWrapperProps) {
  const { editMode } = useEditMode();
  const normalizedSize = normalizeSize(size);
  const [currentPosition, setCurrentPosition] = useState<'left' | 'right'>(position);
  const [currentSize, setCurrentSize] = useState(normalizedSize);

  const handleLayoutChange = useCallback((settings: LayoutSettings) => {
    if (settings.layout === 'floating') {
      setCurrentPosition(settings.position);
      setCurrentSize(settings.size);
    }
    onLayoutChange?.(settings);
  }, [onLayoutChange]);

  const floatClass = currentPosition === 'left'
    ? 'float-left mr-8 mb-4'
    : 'float-right ml-8 mb-4';
  const widthClass = floatWidths[currentSize] || 'w-1/2';

  if (editMode && (contentType === 'mermaid' || contentType === 'email' || contentType === 'pager')) {
    return (
      <div className="relative my-4">
        <DiagramLayoutPicker
          diagramCode={diagramCode || codeContent || ''}
          currentLayout="floating"
          currentPosition={currentPosition}
          currentSize={currentSize}
          currentText={text}
          onLayoutChange={handleLayoutChange}
        />
        <div className="overflow-hidden my-6 pt-10">
          <div className={`${floatClass} ${widthClass} not-prose`}>
            {children}
          </div>
          {text && (
            <div className="prose prose-slate dark:prose-invert max-w-none [&>p]:text-justify [&>p]:hyphens-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
          )}
          <div className="clear-both" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden my-6">
      <div className={`${floatClass} ${widthClass} not-prose`}>
        {children}
      </div>
      {text && (
        <div className="prose prose-slate dark:prose-invert max-w-none [&>p]:text-justify [&>p]:hyphens-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
      )}
      <div className="clear-both" />
    </div>
  );
}

// Layout wrapper for side-by-side content with edit mode support
interface SideBySideWrapperProps {
  position: 'left' | 'right';
  size: string;
  children: ReactNode;
  text?: string;
  contentType?: string;
  diagramCode?: string;
  codeContent?: string;
  onLayoutChange?: (settings: LayoutSettings) => void;
}

function SideBySideWrapper({ position, size, children, text, contentType, diagramCode, codeContent, onLayoutChange }: SideBySideWrapperProps) {
  const { editMode } = useEditMode();
  const normalizedSize = normalizeSize(size);
  const [currentPosition, setCurrentPosition] = useState<'left' | 'right'>(position);
  const [currentSize, setCurrentSize] = useState(normalizedSize);

  const handleLayoutChange = useCallback((settings: LayoutSettings) => {
    if (settings.layout === 'sidebyside') {
      setCurrentPosition(settings.position);
      setCurrentSize(settings.size);
    }
    onLayoutChange?.(settings);
  }, [onLayoutChange]);

  const widthClass = sizeWidths[currentSize] || 'w-1/2';

  if (editMode && (contentType === 'mermaid' || contentType === 'email' || contentType === 'pager')) {
    return (
      <div className="relative my-4">
        <DiagramLayoutPicker
          diagramCode={diagramCode || codeContent || ''}
          currentLayout="sidebyside"
          currentPosition={currentPosition}
          currentSize={currentSize}
          currentText={text}
          onLayoutChange={handleLayoutChange}
        />
        <div className={`flex gap-6 my-6 pt-10 ${currentPosition === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
          <div className={`${widthClass} flex-shrink-0 not-prose`}>
            {children}
          </div>
          {text && (
            <div className="flex-1 prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-6 my-6 ${position === 'right' ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`${widthClass} flex-shrink-0 not-prose`}>
        {children}
      </div>
      {text && (
        <div className="flex-1 prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

// Code block handler for special languages
function CodeBlockHandler({ className, children }: { className?: string; children?: string }) {
  const { editMode } = useEditMode();
  const language = className?.replace('language-', '') || '';
  const content = String(children || '').trim();

  // Mermaid diagrams - use EditableDiagram in edit mode for layout picker
  if (language === 'mermaid') {
    if (editMode) {
      return <EditableDiagram chart={content} />;
    }
    return <MermaidDiagram chart={content} />;
  }

  // Email blocks
  if (language === 'email') {
    const lines = content.split('\n');
    const firstLine = lines[0];
    const variantMatch = firstLine.match(/^@(critical|warning|info|success)$/);
    if (variantMatch) {
      const variant = variantMatch[1] as 'critical' | 'warning' | 'info' | 'success';
      const emailContent = lines.slice(1).join('\n');
      return <EmailPreview variant={variant} content={emailContent} />;
    }
    return <EmailPreview content={content} />;
  }

  // Pager/alert blocks
  if (language === 'pager' || language === 'alert') {
    const lines = content.split('\n');
    const firstLine = lines[0];
    const metaMatch = firstLine.match(/^@(critical|warning|info|success)(?:\s*\|\s*(.+?))?(?:\s*\|\s*(.+?))?$/);
    if (metaMatch) {
      const variant = metaMatch[1] as 'critical' | 'warning' | 'info' | 'success';
      const time = metaMatch[2]?.trim();
      const source = metaMatch[3]?.trim();
      const alertContent = lines.slice(1).join('\n');
      return <PagerAlert variant={variant} time={time} source={source} content={alertContent} />;
    }
    return <PagerAlert content={content} />;
  }

  // Terminal blocks
  if (language === 'terminal' || language === 'bash' || language === 'shell') {
    return <TerminalBlock content={content} />;
  }

  // Default: standard code block
  return (
    <pre className={className}>
      <code>{children}</code>
    </pre>
  );
}

// Parse content into blocks (layout + markdown)
interface ParsedBlock {
  type: 'markdown' | 'floating' | 'sidebyside';
  content?: string;
  position?: 'left' | 'right';
  size?: string;
  innerContent?: string;
  text?: string;
  contentType?: 'mermaid' | 'email' | 'pager' | 'terminal' | 'image';
  diagram?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  codeContent?: string;
}

function parseContent(content: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  const layoutPattern = /:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/g;

  let lastIndex = 0;
  let match;

  while ((match = layoutPattern.exec(content)) !== null) {
    // Add markdown before this layout block
    if (match.index > lastIndex) {
      const beforeText = content.slice(lastIndex, match.index).trim();
      if (beforeText) {
        blocks.push({ type: 'markdown', content: beforeText });
      }
    }

    const [, layoutType, position = 'right', size = 'medium', innerContent] = match;

    // Parse inner content
    const codeBlockMatch = innerContent.match(/```(\w+)\n([\s\S]*?)```/);
    const imageMatch = innerContent.match(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/);

    if (codeBlockMatch) {
      const [fullCodeMatch, language, codeContent] = codeBlockMatch;
      const text = innerContent.replace(fullCodeMatch, '').trim();

      if (language === 'mermaid') {
        blocks.push({
          type: layoutType as 'floating' | 'sidebyside',
          position: position as 'left' | 'right',
          size,
          contentType: 'mermaid',
          diagram: codeContent.trim(),
          text,
        });
      } else if (language === 'email') {
        blocks.push({
          type: layoutType as 'floating' | 'sidebyside',
          position: position as 'left' | 'right',
          size,
          contentType: 'email',
          codeContent: codeContent.trim(),
          text,
        });
      } else if (language === 'pager' || language === 'alert') {
        blocks.push({
          type: layoutType as 'floating' | 'sidebyside',
          position: position as 'left' | 'right',
          size,
          contentType: 'pager',
          codeContent: codeContent.trim(),
          text,
        });
      } else if (language === 'terminal' || language === 'bash' || language === 'shell') {
        blocks.push({
          type: layoutType as 'floating' | 'sidebyside',
          position: position as 'left' | 'right',
          size,
          contentType: 'terminal',
          codeContent: codeContent.trim(),
          text,
        });
      }
    } else if (imageMatch) {
      const [fullImageMatch, alt, src, caption] = imageMatch;
      const text = innerContent.replace(fullImageMatch, '').trim();

      blocks.push({
        type: layoutType as 'floating' | 'sidebyside',
        position: position as 'left' | 'right',
        size,
        contentType: 'image',
        imageSrc: src,
        imageAlt: alt || undefined,
        imageCaption: caption || undefined,
        text,
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining markdown
  if (lastIndex < content.length) {
    const remaining = content.slice(lastIndex).trim();
    if (remaining) {
      blocks.push({ type: 'markdown', content: remaining });
    }
  }

  // If no blocks found, treat entire content as markdown
  if (blocks.length === 0) {
    blocks.push({ type: 'markdown', content });
  }

  return blocks;
}

// Render content based on type
function renderContent(block: ParsedBlock): ReactNode {
  if (block.contentType === 'mermaid' && block.diagram) {
    return <MermaidDiagram chart={block.diagram} compact />;
  }

  if (block.contentType === 'email' && block.codeContent) {
    const lines = block.codeContent.split('\n');
    const firstLine = lines[0];
    const variantMatch = firstLine.match(/^@(critical|warning|info|success)$/);
    if (variantMatch) {
      const variant = variantMatch[1] as 'critical' | 'warning' | 'info' | 'success';
      const emailContent = lines.slice(1).join('\n');
      return <EmailPreview variant={variant} content={emailContent} />;
    }
    return <EmailPreview content={block.codeContent} />;
  }

  if (block.contentType === 'pager' && block.codeContent) {
    const lines = block.codeContent.split('\n');
    const firstLine = lines[0];
    const metaMatch = firstLine.match(/^@(critical|warning|info|success)(?:\s*\|\s*(.+?))?(?:\s*\|\s*(.+?))?$/);
    if (metaMatch) {
      const variant = metaMatch[1] as 'critical' | 'warning' | 'info' | 'success';
      const time = metaMatch[2]?.trim();
      const source = metaMatch[3]?.trim();
      const alertContent = lines.slice(1).join('\n');
      return <PagerAlert variant={variant} time={time} source={source} content={alertContent} />;
    }
    return <PagerAlert content={block.codeContent} />;
  }

  if (block.contentType === 'terminal' && block.codeContent) {
    return <TerminalBlock content={block.codeContent} />;
  }

  if (block.contentType === 'image' && block.imageSrc) {
    return <ImageBlock src={block.imageSrc} alt={block.imageAlt} caption={block.imageCaption} />;
  }

  return null;
}

interface MDXRendererProps {
  content: string;
  className?: string;
  editMode?: boolean;
  onContentChange?: (newContent: string) => void;
}

export function MDXRenderer({
  content,
  className = '',
  editMode = false,
  onContentChange,
}: MDXRendererProps) {
  // Parse content into blocks
  const blocks = useMemo(() => parseContent(content), [content]);

  // Handle layout changes and rebuild content
  const handleLayoutChange = useCallback((block: ParsedBlock, settings: LayoutSettings) => {
    if (!onContentChange) return;

    // Find and replace the layout block in the original content
    const layoutPattern = /:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/g;
    let match;
    let targetMatch: RegExpExecArray | null = null;

    while ((match = layoutPattern.exec(content)) !== null) {
      const innerContent = match[4];
      // Match by diagram code or code content
      if (block.diagram && innerContent.includes(block.diagram)) {
        targetMatch = match;
        break;
      }
      if (block.codeContent && innerContent.includes(block.codeContent)) {
        targetMatch = match;
        break;
      }
    }

    if (!targetMatch) return;

    // Build new layout block
    let newBlock: string;
    const innerContent = targetMatch[4];

    if (settings.layout === 'normal') {
      // Extract just the code block
      const codeMatch = innerContent.match(/```\w+\n[\s\S]*?```/);
      newBlock = codeMatch ? codeMatch[0] : '';
    } else {
      newBlock = `:::${settings.layout}:${settings.position}:${settings.size}\n${innerContent}:::`;
    }

    const newContent = content.slice(0, targetMatch.index) + newBlock + content.slice(targetMatch.index + targetMatch[0].length);
    onContentChange(newContent);
  }, [content, onContentChange]);

  // Move diagram up or down in content
  const handleMoveDiagram = useCallback((diagramCode: string, direction: 'up' | 'down') => {
    if (!onContentChange) return;

    // Find the mermaid code block
    const mermaidPattern = /```mermaid\n([\s\S]*?)```/g;
    let match;
    let targetMatch: RegExpExecArray | null = null;
    const allMatches: RegExpExecArray[] = [];

    while ((match = mermaidPattern.exec(content)) !== null) {
      allMatches.push({ ...match, index: match.index } as RegExpExecArray);
      if (match[1].trim() === diagramCode.trim()) {
        targetMatch = match;
      }
    }

    if (!targetMatch) return;

    // Find paragraph boundaries
    const paragraphs = content.split(/\n\n+/);
    let currentPos = 0;
    let diagramParagraphIndex = -1;

    for (let i = 0; i < paragraphs.length; i++) {
      const paraStart = currentPos;
      const paraEnd = currentPos + paragraphs[i].length;

      if (targetMatch.index >= paraStart && targetMatch.index < paraEnd + 2) {
        diagramParagraphIndex = i;
        break;
      }
      currentPos = paraEnd + 2; // +2 for \n\n
    }

    if (diagramParagraphIndex === -1) return;

    // Swap paragraphs
    if (direction === 'up' && diagramParagraphIndex > 0) {
      const temp = paragraphs[diagramParagraphIndex];
      paragraphs[diagramParagraphIndex] = paragraphs[diagramParagraphIndex - 1];
      paragraphs[diagramParagraphIndex - 1] = temp;
      onContentChange(paragraphs.join('\n\n'));
    } else if (direction === 'down' && diagramParagraphIndex < paragraphs.length - 1) {
      const temp = paragraphs[diagramParagraphIndex];
      paragraphs[diagramParagraphIndex] = paragraphs[diagramParagraphIndex + 1];
      paragraphs[diagramParagraphIndex + 1] = temp;
      onContentChange(paragraphs.join('\n\n'));
    }
  }, [content, onContentChange]);

  // Check if diagram can move in direction
  const checkCanMoveDiagram = useCallback((diagramCode: string, direction: 'up' | 'down'): boolean => {
    const mermaidPattern = /```mermaid\n([\s\S]*?)```/g;
    let match;
    let targetMatch: RegExpExecArray | null = null;

    while ((match = mermaidPattern.exec(content)) !== null) {
      if (match[1].trim() === diagramCode.trim()) {
        targetMatch = match;
        break;
      }
    }

    if (!targetMatch) return false;

    // Find paragraph boundaries
    const paragraphs = content.split(/\n\n+/);
    let currentPos = 0;
    let diagramParagraphIndex = -1;

    for (let i = 0; i < paragraphs.length; i++) {
      const paraStart = currentPos;
      const paraEnd = currentPos + paragraphs[i].length;

      if (targetMatch.index >= paraStart && targetMatch.index < paraEnd + 2) {
        diagramParagraphIndex = i;
        break;
      }
      currentPos = paraEnd + 2;
    }

    if (diagramParagraphIndex === -1) return false;

    if (direction === 'up') return diagramParagraphIndex > 0;
    if (direction === 'down') return diagramParagraphIndex < paragraphs.length - 1;
    return false;
  }, [content]);

  // Edit mode context
  const contextValue = useMemo(() => ({
    editMode,
    onDiagramLayoutChange: onContentChange ? (_diagramCode: string, _newMarkdown: string) => {
      // This is handled by handleLayoutChange now
    } : undefined,
    onMoveDiagram: onContentChange ? handleMoveDiagram : undefined,
    canMoveDiagram: checkCanMoveDiagram,
  }), [editMode, onContentChange, handleMoveDiagram, checkCanMoveDiagram]);

  return (
    <EditModeProvider value={contextValue}>
      <div className={className}>
        {blocks.map((block, index) => {
          // Layout blocks
          if (block.type === 'floating') {
            const contentElement = renderContent(block);
            if (contentElement) {
              return (
                <FloatingWrapper
                  key={index}
                  position={block.position || 'right'}
                  size={block.size || '1/2'}
                  text={block.text}
                  contentType={block.contentType}
                  diagramCode={block.diagram}
                  codeContent={block.codeContent}
                  onLayoutChange={(settings) => handleLayoutChange(block, settings)}
                >
                  {contentElement}
                </FloatingWrapper>
              );
            }
          }

          if (block.type === 'sidebyside') {
            const contentElement = renderContent(block);
            if (contentElement) {
              return (
                <SideBySideWrapper
                  key={index}
                  position={block.position || 'right'}
                  size={block.size || '1/2'}
                  text={block.text}
                  contentType={block.contentType}
                  diagramCode={block.diagram}
                  codeContent={block.codeContent}
                  onLayoutChange={(settings) => handleLayoutChange(block, settings)}
                >
                  {contentElement}
                </SideBySideWrapper>
              );
            }
          }

          // Regular markdown
          return (
            <div key={index} className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlockHandler as any,
                  pre: ({ children }) => <Fragment>{children}</Fragment>,
                  img: ({ src, alt }) => <ExpandableImage src={src} alt={alt} />,
                }}
              >
                {block.content || ''}
              </ReactMarkdown>
            </div>
          );
        })}
      </div>
    </EditModeProvider>
  );
}
