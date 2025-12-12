/**
 * Content modification utilities for diagram editing
 */

import type { DiagramLocation } from './types';

/**
 * Find all mermaid diagrams in content and return their positions
 */
export function findMermaidDiagrams(content: string): DiagramLocation[] {
  const diagrams: DiagramLocation[] = [];

  // First find layout blocks with mermaid diagrams
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

  // Sort by position
  diagrams.sort((a, b) => a.start - b.start);

  return diagrams;
}

/**
 * Rebuild content with diagram modifications applied
 */
export function rebuildContentWithModifications(
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
