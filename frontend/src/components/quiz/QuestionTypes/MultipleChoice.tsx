import { MultipleChoiceQuestion, QuestionProps } from '../types';

export function MultipleChoice({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  disabled,
}: QuestionProps<MultipleChoiceQuestion>) {
  const handleSelect = (index: number) => {
    if (!disabled) {
      onAnswer(index);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
        {question.question}
      </p>
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
                <span className="text-slate-700 dark:text-slate-300">{option}</span>
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
