import { Link } from 'react-router-dom';
import { usePreferences, FontPreferences } from '../hooks/usePreferences';
import { Button } from '@repo/playbook';

const fontFamilyOptions: { value: FontPreferences['family']; label: string; description: string }[] = [
  { value: 'system', label: 'System Default', description: 'Uses your system font' },
  { value: 'serif', label: 'Serif', description: 'Traditional, book-like appearance' },
  { value: 'sans', label: 'Sans-serif', description: 'Clean, modern look' },
  { value: 'mono', label: 'Monospace', description: 'Fixed-width, code-like font' },
  { value: 'dyslexic', label: 'Dyslexia-friendly', description: 'OpenDyslexic for easier reading' },
];

const fontSizeOptions: { value: FontPreferences['size']; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Large' },
  { value: 'xlarge', label: 'Extra Large' },
];

const lineHeightOptions: { value: FontPreferences['lineHeight']; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'normal', label: 'Normal' },
  { value: 'relaxed', label: 'Relaxed' },
];

const contentWidthOptions: { value: FontPreferences['contentWidth']; label: string }[] = [
  { value: 'narrow', label: 'Narrow' },
  { value: 'normal', label: 'Normal' },
  { value: 'wide', label: 'Wide' },
];

export function SettingsPage() {
  const { preferences, updateFontPreferences, resetPreferences } = usePreferences();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/dashboard"
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold">Reading Preferences</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Preview */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-sm font-medium text-gray-500 mb-3">Preview</h2>
          <div
            className={`prose prose-gray ${
              preferences.font.size === 'small' ? 'prose-sm' :
              preferences.font.size === 'large' ? 'prose-lg' :
              preferences.font.size === 'xlarge' ? 'prose-xl' : ''
            } ${
              preferences.font.family === 'serif' ? 'font-serif' :
              preferences.font.family === 'mono' ? 'font-mono' :
              preferences.font.family === 'dyslexic' ? 'font-dyslexic' :
              preferences.font.family === 'sans' ? 'font-sans' : ''
            } ${
              preferences.font.lineHeight === 'compact' ? 'leading-snug' :
              preferences.font.lineHeight === 'relaxed' ? 'leading-relaxed' : ''
            } ${
              preferences.font.contentWidth === 'narrow' ? 'max-w-2xl' :
              preferences.font.contentWidth === 'wide' ? 'max-w-6xl' : 'max-w-4xl'
            }`}
          >
            <h3>Sample Content</h3>
            <p>
              This is how your course content will appear. The quick brown fox jumps over the lazy dog.
              AWS Lambda is a serverless compute service that runs your code in response to events
              and automatically manages the underlying compute resources for you.
            </p>
            <pre><code>const result = await lambda.invoke(params);</code></pre>
          </div>
        </div>

        {/* Font Family */}
        <section className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="font-semibold mb-4">Font Family</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fontFamilyOptions.map(option => (
              <button
                key={option.value}
                onClick={() => updateFontPreferences({ family: option.value })}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.font.family === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className={`block font-medium ${
                  option.value === 'serif' ? 'font-serif' :
                  option.value === 'mono' ? 'font-mono' :
                  option.value === 'sans' ? 'font-sans' : ''
                }`}>
                  {option.label}
                </span>
                <span className="text-sm text-gray-500">{option.description}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Font Size */}
        <section className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="font-semibold mb-4">Text Size</h2>
          <div className="flex flex-wrap gap-2">
            {fontSizeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => updateFontPreferences({ size: option.value })}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  preferences.font.size === option.value
                    ? 'border-primary bg-primary/5 font-medium'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* Line Height */}
        <section className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="font-semibold mb-4">Line Spacing</h2>
          <div className="flex flex-wrap gap-2">
            {lineHeightOptions.map(option => (
              <button
                key={option.value}
                onClick={() => updateFontPreferences({ lineHeight: option.value })}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  preferences.font.lineHeight === option.value
                    ? 'border-primary bg-primary/5 font-medium'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* Content Width */}
        <section className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="font-semibold mb-4">Content Width</h2>
          <div className="flex flex-wrap gap-2">
            {contentWidthOptions.map(option => (
              <button
                key={option.value}
                onClick={() => updateFontPreferences({ contentWidth: option.value })}
                className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                  preferences.font.contentWidth === option.value
                    ? 'border-primary bg-primary/5 font-medium'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* Reset */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={resetPreferences}>
            Reset to Defaults
          </Button>
        </div>
      </main>
    </div>
  );
}
