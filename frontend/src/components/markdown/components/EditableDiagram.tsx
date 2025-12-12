/**
 * EditableDiagram - Diagram wrapper with layout editing support
 */

import { useState, useCallback } from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { useEditMode } from '../context/EditModeContext';
import { DiagramLayoutPicker } from '../../DiagramLayoutPicker';
import { sizeWidths, floatWidths } from '../layouts/constants';
import type { LayoutSettings } from '../parsers/types';

interface EditableDiagramProps {
  chart: string;
}

export function EditableDiagram({ chart }: EditableDiagramProps) {
  const { editMode, onDiagramLayoutChange, onMoveDiagram, canMoveDiagram } = useEditMode();
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    layout: 'normal',
    position: 'right',
    size: '1/2',
  });

  const handleLayoutChange = useCallback((settings: LayoutSettings) => {
    setLayoutSettings(settings);

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

  const handleMoveUp = useCallback(() => {
    onMoveDiagram?.(chart, 'up');
  }, [chart, onMoveDiagram]);

  const handleMoveDown = useCallback(() => {
    onMoveDiagram?.(chart, 'down');
  }, [chart, onMoveDiagram]);

  const canMoveUp = canMoveDiagram?.(chart, 'up') ?? false;
  const canMoveDown = canMoveDiagram?.(chart, 'down') ?? false;

  // If not in edit mode, just render the normal diagram
  if (!editMode) {
    return <MermaidDiagram chart={chart} />;
  }

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
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        canMoveUp={canMoveUp}
        canMoveDown={canMoveDown}
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
