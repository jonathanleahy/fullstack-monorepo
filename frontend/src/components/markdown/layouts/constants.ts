/**
 * Layout size constants for diagrams and content blocks
 */

// Proportional widths for side-by-side layout
export const sizeWidths: Record<string, string> = {
  '1/3': 'w-1/3',
  '1/2': 'w-1/2',
  '2/3': 'w-2/3',
  'full': 'w-full',
  // Backwards compatibility
  'small': 'w-1/3',
  'medium': 'w-1/2',
  'large': 'w-2/3',
};

// Proportional widths for floating layout
export const floatWidths: Record<string, string> = {
  '1/3': 'w-1/3',
  '1/2': 'w-1/2',
  '2/3': 'w-2/3',
  'full': 'w-full',
  // Backwards compatibility
  'small': 'w-1/3',
  'medium': 'w-1/2',
  'large': 'w-2/3',
};

// Normalize legacy size values to new format
export function normalizeSize(size: string): '1/3' | '1/2' | '2/3' | 'full' {
  switch (size) {
    case 'small':
    case '1/3':
      return '1/3';
    case 'medium':
    case '1/2':
      return '1/2';
    case 'large':
    case '2/3':
      return '2/3';
    case 'full':
      return 'full';
    default:
      return '1/2';
  }
}
