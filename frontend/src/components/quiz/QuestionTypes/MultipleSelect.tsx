import { useState, useEffect } from 'react';
import { MultipleSelectQuestion, QuestionProps } from '../types';

export function MultipleSelect({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  disabled,
}: QuestionProps<MultipleSelectQuestion>) {
  const [selected, setSelected] = useState<number[]>(
    Array.isArray(selectedAnswer) ? (selectedAnswer as number[]) : []
  );

  useEffect(() => {
    if (Array.isArray(selectedAnswer)) {
      setSelected(selectedAnswer as number[]);
    }
  }, [selectedAnswer]);

  const handleToggle = (index: number) => {
    if (disabled) return;

    const newSelected = selected.includes(index)
      ? selected.filter((i) => i !== index)
      : [...selected, index];

    // Enforce max selections
    if (question.maxSelections && newSelected.length > question.maxSelections) {
      return;
    }

    setSelected(newSelected);
    onAnswer(newSelected);
  };

  const minSelections = question.minSelections || 1;
  const maxSelections = question.maxSelections || question.options.length;

  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
        {question.question}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Select {minSelections === maxSelections ? minSelections : `${minSelections}-${maxSelections}`} option{maxSelections > 1 ? 's' : ''}
      </p>
      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selected.includes(index);
          const isCorrect = question.correctIndices.includes(index);

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
              onClick={() => handleToggle(index)}
              disabled={disabled}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all ${optionClass} ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded border-2 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {isSelected && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                <span className="text-slate-700 dark:text-slate-300">{option}</span>
                {showFeedback && isCorrect && (
                  <span className="ml-auto text-green-600">✓ Correct</span>
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <span className="ml-auto text-red-600">✗ Incorrect</span>
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
