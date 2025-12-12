/**
 * MermaidDiagram - Renders Mermaid diagrams with expand functionality
 */

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with default config
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
});

export interface MermaidDiagramProps {
  chart: string;
  compact?: boolean;
  hideExpandButton?: boolean;
}

export function MermaidDiagram({ chart, compact = false, hideExpandButton = false }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);

        // Parse SVG and adjust viewBox to remove excess padding
        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const svgEl = doc.querySelector('svg');

        if (svgEl) {
          const tempContainer = document.createElement('div');
          tempContainer.style.position = 'absolute';
          tempContainer.style.visibility = 'hidden';
          tempContainer.innerHTML = svg;
          document.body.appendChild(tempContainer);

          const tempSvg = tempContainer.querySelector('svg');
          if (tempSvg) {
            const bbox = tempSvg.getBBox();
            const padding = 8;
            const newViewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`;
            svgEl.setAttribute('viewBox', newViewBox);
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
