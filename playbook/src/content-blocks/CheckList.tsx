interface CheckListProps {
  content: string;
  title?: string;
}

export function CheckList({ content, title = "Key Takeaways" }: CheckListProps) {
  const lines = content
    .trim()
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.replace(/^[✓✔√\-\*]\s*/, '').trim());

  return (
    <div className="my-6 rounded-xl overflow-hidden shadow-sm border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <div className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-semibold text-white">{title}</span>
      </div>

      {/* Items */}
      <ul className="p-5 space-y-3">
        {lines.map((line, index) => (
          <li key={index} className="flex items-start gap-3 group">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mt-0.5 group-hover:bg-emerald-200 transition-colors">
              <svg
                className="w-3.5 h-3.5 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span className="text-gray-700 leading-relaxed flex-1">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
