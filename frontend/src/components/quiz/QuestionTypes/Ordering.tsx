import { useState, useEffect } from 'react';
import { OrderingQuestion, QuestionProps } from '../types';

export function Ordering({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  disabled,
}: QuestionProps<OrderingQuestion>) {
  const [order, setOrder] = useState<number[]>(
    Array.isArray(selectedAnswer)
      ? (selectedAnswer as number[])
      : question.items.map((_, i) => i)
  );
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (Array.isArray(selectedAnswer)) {
      setOrder(selectedAnswer as number[]);
    }
  }, [selectedAnswer]);

  const handleDragStart = (index: number) => {
    if (disabled) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (disabled || draggedIndex === null || draggedIndex === index) return;

    const newOrder = [...order];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedItem);
    setOrder(newOrder);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    onAnswer(order);
  };

  const moveItem = (fromIndex: number, direction: 'up' | 'down') => {
    if (disabled) return;
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= order.length) return;

    const newOrder = [...order];
    [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
    setOrder(newOrder);
    onAnswer(newOrder);
  };

  const isCorrectPosition = (itemIndex: number, position: number): boolean => {
    return question.correctOrder[position] === itemIndex;
  };

  const isFullyCorrect = (): boolean => {
    return order.every((itemIndex, position) => isCorrectPosition(itemIndex, position));
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
        {question.question}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Drag items to reorder, or use the arrow buttons
      </p>

      <div className="space-y-2">
        {order.map((itemIndex, position) => {
          const isCorrect = isCorrectPosition(itemIndex, position);
          const isDragging = draggedIndex === position;

          let itemClass = 'border-slate-200 dark:border-slate-700';

          if (showFeedback) {
            if (isCorrect) {
              itemClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            } else {
              itemClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            }
          } else if (isDragging) {
            itemClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 opacity-50';
          }

          return (
            <div
              key={`order-${itemIndex}`}
              draggable={!disabled}
              onDragStart={() => handleDragStart(position)}
              onDragOver={(e) => handleDragOver(e, position)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all ${itemClass} ${
                disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
              }`}
            >
              {/* Position number */}
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-sm font-medium">
                {position + 1}
              </span>

              {/* Drag handle */}
              <div className="flex-shrink-0 text-slate-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </div>

              {/* Item text */}
              <span className="flex-grow text-sm text-slate-700 dark:text-slate-300">
                {question.items[itemIndex]}
              </span>

              {/* Arrow buttons */}
              {!disabled && (
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(position, 'up')}
                    disabled={position === 0}
                    className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 ${
                      position === 0 ? 'opacity-30 cursor-not-allowed' : ''
                    }`}
                    aria-label="Move up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(position, 'down')}
                    disabled={position === order.length - 1}
                    className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 ${
                      position === order.length - 1 ? 'opacity-30 cursor-not-allowed' : ''
                    }`}
                    aria-label="Move down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Feedback indicator */}
              {showFeedback && (
                <span className={`flex-shrink-0 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {showFeedback && (
        <>
          {/* Overall result */}
          <div className={`p-3 rounded-lg ${
            isFullyCorrect()
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
          }`}>
            <p className="text-sm font-medium">
              {isFullyCorrect()
                ? 'Perfect! All items are in the correct order.'
                : `${order.filter((itemIndex, position) => isCorrectPosition(itemIndex, position)).length} of ${order.length} items are in the correct position.`}
            </p>
          </div>

          {/* Correct order display */}
          {!isFullyCorrect() && (
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Correct order:
              </p>
              <ol className="list-decimal list-inside space-y-1">
                {question.correctOrder.map((itemIndex, position) => (
                  <li key={position} className="text-sm text-slate-600 dark:text-slate-400">
                    {question.items[itemIndex]}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Explanation */}
          {question.explanation && (
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Explanation:
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {question.explanation}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
