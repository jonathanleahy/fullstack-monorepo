/**
 * MarkdownRenderer - Main orchestrator for rendering markdown with custom components
 *
 * This is the main entry point that combines:
 * - Layout blocks (:::floating, :::sidebyside)
 * - Custom code blocks (mermaid, terminal, email, pager, etc.)
 * - Standard markdown rendering
 * - Edit mode support for diagram positioning
 */

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PagerAlert, EmailPreview, TerminalBlock, ImageBlock } from '@repo/playbook';
import { LayoutWrapper } from '../LayoutWrapper';

// Internal imports
import { EditModeProvider } from './context/EditModeContext';
import { MermaidDiagram } from './components/MermaidDiagram';
import { ExpandableImage } from './components/ExpandableImage';
import { CodeBlockRouter } from './components/CodeBlockRouter';
import { SideBySideBlock } from './layouts/SideBySideBlock';
import { FloatingBlock } from './layouts/FloatingBlock';
import { ImageLayoutBlock } from './layouts/ImageLayoutBlock';
import { parseLayoutBlocks } from './parsers/parseLayoutBlocks';
import { useDiagramEditor } from './hooks/useDiagramEditor';
import type { LayoutBlock } from './parsers/types';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  editMode?: boolean;
  onContentChange?: (newContent: string) => void;
}

/**
 * Render content inside a layout block based on content type
 */
function renderLayoutContent(block: LayoutBlock) {
  if (block.contentType === 'mermaid' && block.diagram) {
    return <MermaidDiagram chart={block.diagram} compact />;
  }

  if (block.contentType === 'email' && block.contentRaw) {
    const firstLine = block.contentRaw.split('\n')[0];
    const variantMatch = firstLine.match(/^@(critical|warning|info|success)$/);
    if (variantMatch) {
      const variant = variantMatch[1] as 'critical' | 'warning' | 'info' | 'success';
      const emailContent = block.contentRaw.split('\n').slice(1).join('\n');
      return <EmailPreview variant={variant} content={emailContent} />;
    }
    return <EmailPreview content={block.contentRaw} />;
  }

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

  if (block.contentType === 'terminal' && block.contentRaw) {
    return <TerminalBlock content={block.contentRaw} />;
  }

  if (block.contentType === 'image' && block.imageSrc) {
    return <ImageBlock src={block.imageSrc} alt={block.imageAlt} caption={block.imageCaption} />;
  }

  return null;
}

export function MarkdownRenderer({
  content,
  className = '',
  editMode = false,
  onContentChange,
}: MarkdownRendererProps) {
  // Parse content into layout blocks
  const blocks = useMemo(() => parseLayoutBlocks(content), [content]);

  // Diagram editing functionality
  const { handleDiagramLayoutChange, handleMoveDiagram, canMoveDiagram } = useDiagramEditor({
    content,
    onContentChange,
  });

  // Edit mode context value
  const contextValue = useMemo(() => ({
    editMode,
    onDiagramLayoutChange: handleDiagramLayoutChange,
    onMoveDiagram: handleMoveDiagram,
    canMoveDiagram,
  }), [editMode, handleDiagramLayoutChange, handleMoveDiagram, canMoveDiagram]);

  return (
    <EditModeProvider value={contextValue}>
      <div className={className}>
        {blocks.map((block, index) => {
          // Mermaid diagrams with SideBySideBlock (edit mode support)
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

          // Mermaid diagrams with FloatingBlock (edit mode support)
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

          // Images with ImageLayoutBlock (edit mode support)
          if ((block.type === 'sidebyside' || block.type === 'floating') && block.contentType === 'image' && block.imageSrc) {
            return (
              <ImageLayoutBlock
                key={index}
                layout={block.type}
                position={block.position || 'right'}
                size={block.size || 'medium'}
                src={block.imageSrc}
                alt={block.imageAlt}
                caption={block.imageCaption}
                text={block.text || ''}
              />
            );
          }

          // Other content types with generic LayoutWrapper
          if ((block.type === 'sidebyside' || block.type === 'floating') && block.contentType && block.contentType !== 'mermaid' && block.contentType !== 'image') {
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

          // Regular markdown content
          return (
            <div key={index} className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: CodeBlockRouter,
                  pre: ({ children }) => <>{children}</>,
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
