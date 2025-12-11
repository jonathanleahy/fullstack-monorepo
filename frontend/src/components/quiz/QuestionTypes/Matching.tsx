import { useState, useEffect, useRef, useCallback } from 'react';
import { MatchingQuestion, QuestionProps } from '../types';

interface LineConnection {
  leftIndex: number;
  rightIndex: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function Matching({
  question,
  onAnswer,
  showFeedback,
  selectedAnswer,
  disabled,
}: QuestionProps<MatchingQuestion>) {
  const [pairs, setPairs] = useState<[number, number][]>(
    Array.isArray(selectedAnswer) ? (selectedAnswer as [number, number][]) : []
  );
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [lines, setLines] = useState<LineConnection[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rightRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (Array.isArray(selectedAnswer)) {
      setPairs(selectedAnswer as [number, number][]);
    }
  }, [selectedAnswer]);

  // Calculate line positions
  const updateLines = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines: LineConnection[] = [];

    pairs.forEach(([leftIndex, rightIndex]) => {
      const leftEl = leftRefs.current[leftIndex];
      const rightEl = rightRefs.current[rightIndex];

      if (leftEl && rightEl) {
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        newLines.push({
          leftIndex,
          rightIndex,
          x1: leftRect.right - containerRect.left,
          y1: leftRect.top + leftRect.height / 2 - containerRect.top,
          x2: rightRect.left - containerRect.left,
          y2: rightRect.top + rightRect.height / 2 - containerRect.top,
        });
      }
    });

    setLines(newLines);
  }, [pairs]);

  useEffect(() => {
    updateLines();
    // Also update on window resize
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, [updateLines]);

  const handleLeftClick = (index: number) => {
    if (disabled) return;
    setSelectedLeft(selectedLeft === index ? null : index);
  };

  const handleRightClick = (rightIndex: number) => {
    if (disabled || selectedLeft === null) return;

    // Remove any existing pair with either the left or right index
    const newPairs = pairs.filter(
      ([l, r]) => l !== selectedLeft && r !== rightIndex
    );

    // Add the new pair
    newPairs.push([selectedLeft, rightIndex]);
    setPairs(newPairs);
    setSelectedLeft(null);
    onAnswer(newPairs);
  };

  const removePair = (leftIndex: number) => {
    if (disabled) return;
    const newPairs = pairs.filter(([l]) => l !== leftIndex);
    setPairs(newPairs);
    onAnswer(newPairs);
  };

  const getLeftPairIndex = (leftIndex: number): number | null => {
    const pair = pairs.find(([l]) => l === leftIndex);
    return pair ? pair[1] : null;
  };

  const getRightPairIndex = (rightIndex: number): number | null => {
    const pair = pairs.find(([, r]) => r === rightIndex);
    return pair ? pair[0] : null;
  };

  const isPairCorrect = (leftIndex: number, rightIndex: number): boolean => {
    return question.correctPairs.some(
      ([l, r]) => l === leftIndex && r === rightIndex
    );
  };

  const getLineColor = (leftIndex: number, rightIndex: number): string => {
    if (showFeedback) {
      return isPairCorrect(leftIndex, rightIndex)
        ? 'stroke-green-500'
        : 'stroke-red-500';
    }
    return 'stroke-blue-500';
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
        {question.question}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Click an item on the left, then click its match on the right
      </p>

      <div ref={containerRef} className="relative">
        {/* SVG layer for connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {lines.map((line) => (
            <line
              key={`line-${line.leftIndex}-${line.rightIndex}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className={`${getLineColor(line.leftIndex, line.rightIndex)} transition-colors`}
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div className="grid grid-cols-[1fr_80px_1fr] gap-0">
          {/* Left column */}
          <div className="space-y-2">
            {question.leftColumn.map((item, index) => {
              const pairedRight = getLeftPairIndex(index);
              const isSelected = selectedLeft === index;
              const isPaired = pairedRight !== null;

              let itemClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900';

              if (showFeedback && isPaired) {
                if (isPairCorrect(index, pairedRight)) {
                  itemClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                } else {
                  itemClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                }
              } else if (isSelected) {
                itemClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500';
              } else if (isPaired) {
                itemClass = 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/10';
              }

              return (
                <button
                  key={`left-${index}`}
                  ref={(el) => { leftRefs.current[index] = el; }}
                  onClick={() => isPaired && !showFeedback ? removePair(index) : handleLeftClick(index)}
                  disabled={disabled}
                  className={`w-full p-3 text-left border-2 rounded-lg transition-all relative ${itemClass} ${
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{item}</span>
                    {isPaired && !showFeedback && (
                      <span className="text-xs text-slate-400 hover:text-red-500" title="Click to remove">
                        ✕
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Middle spacer for lines */}
          <div className="relative" />

          {/* Right column */}
          <div className="space-y-2">
            {question.rightColumn.map((item, index) => {
              const pairedLeft = getRightPairIndex(index);
              const isPaired = pairedLeft !== null;

              let itemClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900';

              if (showFeedback && isPaired) {
                if (isPairCorrect(pairedLeft, index)) {
                  itemClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                } else {
                  itemClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                }
              } else if (isPaired) {
                itemClass = 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/10';
              }

              const canClick = !disabled && selectedLeft !== null && !isPaired;

              return (
                <button
                  key={`right-${index}`}
                  ref={(el) => { rightRefs.current[index] = el; }}
                  onClick={() => handleRightClick(index)}
                  disabled={disabled || selectedLeft === null}
                  className={`w-full p-3 text-left border-2 rounded-lg transition-all relative ${itemClass} ${
                    canClick
                      ? 'cursor-pointer hover:border-blue-400'
                      : disabled || selectedLeft === null
                      ? 'cursor-not-allowed opacity-75'
                      : 'cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
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
