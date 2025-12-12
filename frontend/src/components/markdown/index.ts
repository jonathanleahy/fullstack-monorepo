/**
 * Markdown Module - Exports for markdown rendering with custom components
 */

// Main components
export { MarkdownRenderer } from './MarkdownRenderer';
export { MDXRenderer } from './MDXRenderer';

// Context
export { EditModeContext, EditModeProvider, useEditMode } from './context/EditModeContext';
export type { EditModeContextType } from './context/EditModeContext';

// Components
export { MermaidDiagram } from './components/MermaidDiagram';
export { ExpandableImage } from './components/ExpandableImage';
export { EditableDiagram } from './components/EditableDiagram';
export { CodeBlockRouter } from './components/CodeBlockRouter';
export { ImageEditor } from './components/ImageEditor';
export type { ImageCropSettings } from './components/ImageEditor';

// Layouts
export { SideBySideBlock } from './layouts/SideBySideBlock';
export { FloatingBlock } from './layouts/FloatingBlock';
export { ImageLayoutBlock } from './layouts/ImageLayoutBlock';
export { sizeWidths, floatWidths, normalizeSize } from './layouts/constants';

// Parsers
export { parseLayoutBlocks, detectContentType } from './parsers/parseLayoutBlocks';
export { findMermaidDiagrams, rebuildContentWithModifications } from './parsers/contentModifier';
export type { LayoutBlock, ContentType, DiagramLocation, LayoutSettings, LayoutType, Position, Size } from './parsers/types';

// Hooks
export { useDiagramEditor } from './hooks/useDiagramEditor';
