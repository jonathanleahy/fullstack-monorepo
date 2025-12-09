interface MistakeListProps {
  content: string;
  title?: string;
}

export function MistakeList({ content, title = "Common Mistakes" }: MistakeListProps) {
  const lines = content
    .trim()
    .split('\n')
    .map(line => line.replace(/^[✗×x\-\*]\s*/, '').trim())
    .filter(line => line.length > 0);

  return (
    <div className="my-6 rounded-lg border border-red-200 bg-red-50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-red-200 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="font-medium text-red-800 text-sm">{title}</span>
      </div>

      {/* Items */}
      <div style={{ padding: '12px 16px' }} className="flex flex-col gap-2.5">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 border border-red-200 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <span className="text-gray-700">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
