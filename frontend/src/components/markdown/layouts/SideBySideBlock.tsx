/**
 * SideBySideBlock - Layout component for side-by-side diagram and text
 */

import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { useEditMode } from '../context/EditModeContext';
import { DiagramLayoutPicker, normalizeSize } from '../../DiagramLayoutPicker';
import { sizeWidths } from './constants';
import type { LayoutSettings } from '../parsers/types';

interface SideBySideBlockProps {
  diagram: string;
  text: string;
  position: 'left' | 'right';
  size: string;
}

export function SideBySideBlock({ diagram, text, position, size }: SideBySideBlockProps) {
  const { editMode, onDiagramLayoutChange, onMoveDiagram, canMoveDiagram } = useEditMode();
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
