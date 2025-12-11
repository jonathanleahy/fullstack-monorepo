interface TerminalBlockProps {
  content: string;
  title?: string;
}

export function TerminalBlock({ content, title = 'Terminal' }: TerminalBlockProps) {
  const lines = content.trim().split('\n');

  // Pre-process lines to determine which are commands (including continuations)
  const lineInfo = lines.map((line, index) => {
    const startsWithPrompt = line.startsWith('$') || line.startsWith('>');
    const isComment = line.startsWith('#');
    const isEmpty = line.trim() === '';
    const endsWithBackslash = line.trimEnd().endsWith('\\');

    return { line, startsWithPrompt, isComment, isEmpty, endsWithBackslash };
  });

  // Second pass: mark continuation lines
  let inContinuation = false;
  const processedLines = lineInfo.map((info, index) => {
    const isContinuation = inContinuation && !info.startsWithPrompt;
    const isCommand = info.startsWithPrompt || isContinuation;

    // Update for next line
    inContinuation = isCommand && info.endsWithBackslash;

    return { ...info, isCommand, isContinuation };
  });

  return (
    <div className="my-6 rounded-xl overflow-hidden shadow-lg">
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
          </div>
          <span className="text-xs text-gray-400 ml-2 font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
      </div>

      {/* Terminal content */}
      <div className="bg-gray-900 p-4 font-mono text-sm overflow-x-auto">
        {processedLines.map(({ line, startsWithPrompt, isComment, isEmpty, isCommand, isContinuation }, index) => {
          if (isEmpty) {
            return <div key={index} className="h-4" />;
          }

          return (
            <div key={index} className="leading-relaxed py-0.5">
              {isCommand && startsWithPrompt && (
                <span className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{line.charAt(0)}</span>
                  <span className="text-gray-100">{line.slice(1).trim()}</span>
                </span>
              )}
              {isCommand && isContinuation && (
                <span className="text-gray-100 pl-5">{line}</span>
              )}
              {isComment && !isCommand && (
                <span className="text-gray-500 italic">{line}</span>
              )}
              {!isCommand && !isComment && (
                <span className="text-gray-400">{line}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
