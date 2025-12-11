import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeAnalysisQuestion, QuestionProps } from '../types';

export function CodeAnalysis({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  disabled,
}: QuestionProps<CodeAnalysisQuestion>) {
  const handleSelect = (index: number) => {
    if (!disabled) {
      onAnswer(index);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
        {question.question}
      </p>

      <div className="rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language={question.language || 'bash'}
          style={oneDark}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          {question.codeSnippet}
        </SyntaxHighlighter>
      </div>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctIndex;

          let optionClass = 'border-slate-200 dark:border-slate-700 hover:border-blue-400';

          if (showFeedback) {
            if (isCorrect) {
              optionClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            } else if (isSelected && !isCorrect) {
              optionClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            }
          } else if (isSelected) {
            optionClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={disabled}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all ${optionClass} ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 font-medium ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-mono text-sm">
                  {option}
                </span>
                {showFeedback && isCorrect && (
                  <span className="ml-auto text-green-600">✓</span>
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <span className="ml-auto text-red-600">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && question.explanation && (
        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Explanation:
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
