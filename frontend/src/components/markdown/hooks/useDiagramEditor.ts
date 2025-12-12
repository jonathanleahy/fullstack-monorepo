/**
 * useDiagramEditor - Hook for managing diagram editing and movement
 */

import { useCallback, useRef, useEffect } from 'react';
import { rebuildContentWithModifications } from '../parsers/contentModifier';

interface UseDiagramEditorProps {
  content: string;
  onContentChange?: (newContent: string) => void;
}

export function useDiagramEditor({ content, onContentChange }: UseDiagramEditorProps) {
  // Track diagram modifications
  const diagramModificationsRef = useRef<Map<string, string>>(new Map());

  // Reset modifications when content changes
  useEffect(() => {
    diagramModificationsRef.current.clear();
  }, [content]);

  // Handle diagram layout changes
  const handleDiagramLayoutChange = useCallback((diagramCode: string, newMarkdown: string) => {
    diagramModificationsRef.current.set(diagramCode, newMarkdown);

    if (onContentChange) {
      const newContent = rebuildContentWithModifications(content, diagramModificationsRef.current);
      onContentChange(newContent);
    }
  }, [content, onContentChange]);

  // Handle moving a diagram up or down
  const handleMoveDiagram = useCallback((diagramCode: string, direction: 'up' | 'down') => {
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

    // Parse the layout block
    const innerContent = targetBlock.fullMatch.match(/:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/);
    if (!innerContent) return;

    const layoutType = innerContent[1] as 'sidebyside' | 'floating';
    const position = innerContent[2] || 'right';
    const size = innerContent[3] || 'medium';
    const blockInnerContent = innerContent[4];

    const mermaidMatch = blockInnerContent.match(/```mermaid\n([\s\S]*?)```/);
    if (!mermaidMatch) return;

    const mermaidBlock = mermaidMatch[0];
    const textInsideBlock = blockInnerContent.replace(mermaidMatch[0], '').trim();

    const contentBefore = content.slice(0, targetBlock.start);
    const contentAfter = content.slice(targetBlock.end);

    const beforeParagraphs = contentBefore.trim().split(/\n\n+/).filter(p => p.trim());
    const afterTrimmed = contentAfter.trim();

    if (direction === 'up') {
      if (beforeParagraphs.length === 0) return;

      const paragraphToWrapWith = beforeParagraphs.pop()!;
      const remainingBefore = beforeParagraphs.join('\n\n');
      const newLayoutBlock = `:::${layoutType}:${position}:${size}\n${mermaidBlock}\n\n${paragraphToWrapWith}\n:::`;

      const parts: string[] = [];
      if (remainingBefore) parts.push(remainingBefore);
      parts.push(newLayoutBlock);
      if (textInsideBlock) parts.push(textInsideBlock);
      if (afterTrimmed) parts.push(afterTrimmed);

      const newContent = parts.join('\n\n');
      if (onContentChange) {
        onContentChange(newContent.trim());
      }
    } else {
      const layoutBlockMatch = afterTrimmed.match(/^:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/);

      let firstParagraphAfter: string;
      let remainingAfter: string;

      if (layoutBlockMatch) {
        const nextBlockText = layoutBlockMatch[4].replace(/```mermaid\n[\s\S]*?```/, '').trim();
        if (!nextBlockText) return;
        firstParagraphAfter = nextBlockText;
        remainingAfter = afterTrimmed.slice(layoutBlockMatch[0].length).trim();
      } else {
        const afterParagraphs = afterTrimmed.split(/\n\n+/).filter(p => p.trim());
        if (afterParagraphs.length === 0) return;
        firstParagraphAfter = afterParagraphs.shift()!;
        remainingAfter = afterParagraphs.join('\n\n');
      }

      const newLayoutBlock = `:::${layoutType}:${position}:${size}\n${mermaidBlock}\n\n${firstParagraphAfter}\n:::`;

      const parts: string[] = [];
      if (contentBefore.trim()) parts.push(contentBefore.trim());
      if (textInsideBlock) parts.push(textInsideBlock);
      parts.push(newLayoutBlock);
      if (remainingAfter) parts.push(remainingAfter);

      const newContent = parts.join('\n\n');
      if (onContentChange) {
        onContentChange(newContent.trim());
      }
    }
  }, [content, onContentChange]);

  // Check if a diagram can be moved
  const canMoveDiagram = useCallback((diagramCode: string, direction: 'up' | 'down'): boolean => {
    const layoutPattern = /:::(sidebyside|floating)(?::(left|right))?(?::(small|medium|large|1\/3|1\/2|2\/3|full))?\n([\s\S]*?):::/g;
    let match;

    while ((match = layoutPattern.exec(content)) !== null) {
      const innerContent = match[4];
      const mermaidMatch = innerContent.match(/```mermaid\n([\s\S]*?)```/);
      if (mermaidMatch && mermaidMatch[1].trim() === diagramCode) {
        const contentBefore = content.slice(0, match.index);
        const contentAfter = content.slice(match.index + match[0].length);

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

  return {
    handleDiagramLayoutChange,
    handleMoveDiagram,
    canMoveDiagram,
  };
}
