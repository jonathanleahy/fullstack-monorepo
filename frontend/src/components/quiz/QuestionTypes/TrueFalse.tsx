import { TrueFalseQuestion, QuestionProps } from '../types';

export function TrueFalse({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  disabled,
}: QuestionProps<TrueFalseQuestion>) {
  const handleSelect = (value: boolean) => {
    if (!disabled) {
      onAnswer(value);
    }
  };

  const options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
        {question.question}
      </p>
      <div className="flex gap-4">
        {options.map(({ value, label }) => {
          const isSelected = selectedAnswer === value;
          const isCorrect = value === question.correctAnswer;

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
              key={String(value)}
              onClick={() => handleSelect(value)}
              disabled={disabled}
              className={`flex-1 p-4 text-center border-2 rounded-lg transition-all font-medium ${optionClass} ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className={`text-lg ${
                isSelected ? 'text-blue-600' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {label}
              </span>
              {showFeedback && isCorrect && (
                <span className="ml-2 text-green-600">✓</span>
              )}
              {showFeedback && isSelected && !isCorrect && (
                <span className="ml-2 text-red-600">✗</span>
              )}
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
