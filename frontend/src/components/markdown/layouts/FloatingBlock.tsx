/**
 * FloatingBlock - Layout component for floating diagram with text wrap
 */

import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { useEditMode } from '../context/EditModeContext';
import { DiagramLayoutPicker, normalizeSize } from '../../DiagramLayoutPicker';
import { floatWidths } from './constants';
import type { LayoutSettings } from '../parsers/types';

interface FloatingBlockProps {
  diagram: string;
  text: string;
  float: 'left' | 'right';
  size: string;
}

export function FloatingBlock({ diagram, text, float, size }: FloatingBlockProps) {
  const { editMode, onDiagramLayoutChange, onMoveDiagram, canMoveDiagram } = useEditMode();
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

  const floatClass = layoutSettings.position === 'left'
    ? 'float-left mr-8 mb-4'
    : 'float-right ml-8 mb-4';
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

  const originalFloatClass = float === 'left'
    ? 'float-left mr-8 mb-4'
    : 'float-right ml-8 mb-4';

  return (
    <div className="overflow-hidden">
      <div className={`${originalFloatClass} ${floatWidths[size]} not-prose`}>
        <MermaidDiagram chart={diagram} compact />
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none [&>p]:text-justify [&>p]:hyphens-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
      <div className="clear-both" />
    </div>
  );
}
