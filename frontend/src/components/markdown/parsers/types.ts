/**
 * Shared types for markdown parsing
 */

export type ContentType = 'mermaid' | 'email' | 'pager' | 'terminal' | 'image' | 'unknown';

export interface LayoutBlock {
  type: 'sidebyside' | 'floating' | 'markdown';
  position?: 'left' | 'right';
  size?: string;
  diagram?: string;
  contentType?: ContentType;
  contentRaw?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  text?: string;
  content?: string;
  blockIndex?: number;
}

export interface DiagramLocation {
  start: number;
  end: number;
  code: string;
}

export type LayoutType = 'normal' | 'sidebyside' | 'floating';
export type Position = 'left' | 'right';
export type Size = '1/3' | '1/2' | '2/3' | 'full';

export interface LayoutSettings {
  layout: LayoutType;
  position: Position;
  size: Size;
}
