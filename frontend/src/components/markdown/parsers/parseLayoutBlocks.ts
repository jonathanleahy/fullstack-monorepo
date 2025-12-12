/**
 * parseLayoutBlocks - Parse markdown content into layout blocks
 */

import type { LayoutBlock, ContentType } from './types';

/**
 * Detect content type from code block language
 */
export function detectContentType(language: string): ContentType {
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

/**
 * Parse content into layout blocks (:::floating, :::sidebyside) and markdown
 */
export function parseLayoutBlocks(content: string): LayoutBlock[] {
  const blocks: LayoutBlock[] = [];

  // Pattern: :::sidebyside:position:size or :::floating:position:size
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

    // Try to extract image from inner content
    const imageMatch = innerContent.match(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/);

    if (codeBlockMatch) {
      const [fullMatch, language, codeContent] = codeBlockMatch;
      const contentType = detectContentType(language);
      const text = innerContent.replace(fullMatch, '').trim();

      if (contentType === 'mermaid') {
        blocks.push({
          type: layoutType as 'sidebyside' | 'floating',
          position: position as 'left' | 'right',
          size,
          contentType: 'mermaid',
          diagram: codeContent.trim(),
          text,
          blockIndex: layoutBlockIndex++,
        });
      } else {
        blocks.push({
          type: layoutType as 'sidebyside' | 'floating',
          position: position as 'left' | 'right',
          size,
          contentType,
          contentRaw: codeContent.trim(),
          text,
          blockIndex: layoutBlockIndex++,
        });
      }
    } else if (imageMatch) {
      const [fullMatch, alt, src, caption] = imageMatch;
      const text = innerContent.replace(fullMatch, '').trim();

      blocks.push({
        type: layoutType as 'sidebyside' | 'floating',
        position: position as 'left' | 'right',
        size,
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
