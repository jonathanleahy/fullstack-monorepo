import { useState, useEffect, useCallback } from 'react';

export interface FontPreferences {
  family: 'system' | 'serif' | 'sans' | 'mono' | 'dyslexic';
  size: 'small' | 'normal' | 'large' | 'xlarge';
  lineHeight: 'compact' | 'normal' | 'relaxed';
  contentWidth: 'narrow' | 'normal' | 'wide';
}

export interface UserPreferences {
  font: FontPreferences;
}

const defaultPreferences: UserPreferences = {
  font: {
    family: 'system',
    size: 'normal',
    lineHeight: 'normal',
    contentWidth: 'normal',
  },
};

const STORAGE_KEY = 'course-tutor-preferences';

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to parse preferences:', e);
    }
    return defaultPreferences;
  });

  // Persist to localStorage whenever preferences change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save preferences:', e);
    }
  }, [preferences]);

  const updateFontPreferences = useCallback((updates: Partial<FontPreferences>) => {
    setPreferences(prev => ({
      ...prev,
      font: { ...prev.font, ...updates },
    }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, []);

  return {
    preferences,
    updateFontPreferences,
    resetPreferences,
  };
}

// Font family CSS classes
export const fontFamilyClasses: Record<FontPreferences['family'], string> = {
  system: '',
  serif: 'font-serif',
  sans: 'font-sans',
  mono: 'font-mono',
  dyslexic: 'font-dyslexic',
};

// Font size classes (applied to prose container)
export const fontSizeClasses: Record<FontPreferences['size'], string> = {
  small: 'prose-sm',
  normal: 'prose-base',
  large: 'prose-lg',
  xlarge: 'prose-xl',
};

// Line height classes
export const lineHeightClasses: Record<FontPreferences['lineHeight'], string> = {
  compact: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
};

// Content width classes
export const contentWidthClasses: Record<FontPreferences['contentWidth'], string> = {
  narrow: 'max-w-2xl',
  normal: 'max-w-4xl',
  wide: 'max-w-6xl',
};

// Helper to generate combined classes
export function getFontClasses(font: FontPreferences): string {
  return [
    fontFamilyClasses[font.family],
    lineHeightClasses[font.lineHeight],
  ].filter(Boolean).join(' ');
}
