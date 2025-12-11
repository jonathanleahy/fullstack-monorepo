import { useState, useCallback, useMemo } from 'react';
import {
  Quiz,
  QuizQuestion,
  QuestionAnswer,
  MasteryLevel,
  ConfidenceLevel,
  getMasteryLevel,
  getMasteryEmoji,
  getMasteryColor,
  calculateScore,
} from './types';
import {
  MultipleChoice,
  TrueFalse,
  MultipleSelect,
  CodeAnalysis,
  Matching,
  Ordering,
} from './QuestionTypes';

interface QuizContainerProps {
  quiz: Quiz;
  onComplete: (score: number, totalQuestions: number, percentage: number, responses: QuestionResponse[]) => void;
  onAbandon?: () => void;
}

interface QuestionResponse {
  questionId: string;
  answer: QuestionAnswer;
  isCorrect: boolean;
  confidence?: ConfidenceLevel;
  timeTaken: number;
}

type QuizState = 'start' | 'in-progress' | 'completed';

export function QuizContainer({ quiz, onComplete, onAbandon }: QuizContainerProps) {
  const [state, setState] = useState<QuizState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<QuestionAnswer | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;

  const isAnswerCorrect = useCallback((question: QuizQuestion, answer: QuestionAnswer): boolean => {
    switch (question.type) {
      case 'multiple_choice':
      case 'code_analysis':
        return answer === question.correctIndex;
      case 'true_false':
        return answer === question.correctAnswer;
      case 'multiple_select': {
        const selected = answer as number[];
        const correct = question.correctIndices;
        return (
          selected.length === correct.length &&
          selected.every((i) => correct.includes(i)) &&
          correct.every((i) => selected.includes(i))
        );
      }
      case 'matching': {
        const pairs = answer as [number, number][];
        return question.correctPairs.every(([l, r]) =>
          pairs.some(([pl, pr]) => pl === l && pr === r)
        );
      }
      case 'ordering': {
        const order = answer as number[];
        return order.every((item, idx) => item === question.correctOrder[idx]);
      }
      default:
        return false;
    }
  }, []);

  const handleStartQuiz = () => {
    setState('in-progress');
    setQuestionStartTime(Date.now());
  };

  const handleAnswer = (answer: QuestionAnswer) => {
    setCurrentAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (currentAnswer === null) return;

    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    const isCorrect = isAnswerCorrect(currentQuestion, currentAnswer);

    const response: QuestionResponse = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      isCorrect,
      confidence: confidence ?? undefined,
      timeTaken,
    };

    setResponses((prev) => [...prev, response]);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswer(null);
      setShowFeedback(false);
      setConfidence(null);
      setQuestionStartTime(Date.now());
    } else {
      // Quiz complete
      const finalResponses = [...responses];
      const { score, maxScore } = calculateScore(quiz.questions, finalResponses.map((r, i) => ({
        ...r,
        difficulty: quiz.questions[i].difficulty,
      })));
      const percentage = Math.round((score / maxScore) * 100);

      setState('completed');
      onComplete(score, totalQuestions, percentage, finalResponses);
    }
  };

  const handleAbandon = () => {
    if (onAbandon) {
      onAbandon();
    }
  };

  // Calculate final score for completed state
  const finalScore = useMemo(() => {
    if (state !== 'completed') return null;

    const correctCount = responses.filter((r) => r.isCorrect).length;
    const { score, maxScore } = calculateScore(
      quiz.questions,
      responses.map((r, i) => ({
        ...r,
        difficulty: quiz.questions[i].difficulty,
      }))
    );
    const percentage = Math.round((score / maxScore) * 100);
    const mastery = getMasteryLevel(percentage);

    return { correctCount, score, maxScore, percentage, mastery };
  }, [state, responses, quiz.questions]);

  const renderQuestion = () => {
    const props = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      showFeedback,
      selectedAnswer: currentAnswer,
      disabled: showFeedback,
    };

    switch (currentQuestion.type) {
      case 'multiple_choice':
        return <MultipleChoice {...props} question={currentQuestion} />;
      case 'true_false':
        return <TrueFalse {...props} question={currentQuestion} />;
      case 'multiple_select':
        return <MultipleSelect {...props} question={currentQuestion} />;
      case 'code_analysis':
        return <CodeAnalysis {...props} question={currentQuestion} />;
      case 'matching':
        return <Matching {...props} question={currentQuestion} />;
      case 'ordering':
        return <Ordering {...props} question={currentQuestion} />;
      default:
        return <p>Unknown question type</p>;
    }
  };

  // Start screen
  if (state === 'start') {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            This quiz has {totalQuestions} question{totalQuestions !== 1 ? 's' : ''}.
            Answer each question to test your understanding.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No time limit</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Unlimited retakes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Instant feedback</span>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // In-progress screen
  if (state === 'in-progress') {
    const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
        {/* Header with progress */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <button
              onClick={handleAbandon}
              className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Exit Quiz
            </button>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {currentQuestion.difficulty && (
            <div className="mt-2 flex items-center gap-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">Difficulty:</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < currentQuestion.difficulty
                      ? 'bg-amber-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Question content */}
        <div className="p-6">
          {renderQuestion()}
        </div>

        {/* Footer with actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl">
          {!showFeedback ? (
            <div className="flex items-center justify-between">
              {/* Confidence selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">Confidence:</span>
                {(['low', 'medium', 'high'] as ConfidenceLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setConfidence(level)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      confidence === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSubmitAnswer}
                disabled={currentAnswer === null}
                className={`px-6 py-2 font-medium rounded-lg transition-colors ${
                  currentAnswer === null
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Check Answer
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                {currentIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Completed screen
  if (state === 'completed' && finalScore) {
    const { correctCount, percentage, mastery } = finalScore;

    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="text-center">
          {/* Mastery badge */}
          <div className="mb-4">
            <span className="text-6xl">{getMasteryEmoji(mastery)}</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Quiz Complete!
          </h2>

          {/* Score display */}
          <div className={`text-5xl font-bold mb-2 ${getMasteryColor(mastery)}`}>
            {percentage}%
          </div>

          <p className="text-slate-600 dark:text-slate-400 mb-1">
            You got {correctCount} out of {totalQuestions} correct
          </p>

          <p className={`text-lg font-medium mb-6 ${getMasteryColor(mastery)}`}>
            {mastery === 'expert' && 'Outstanding! You\'ve mastered this material!'}
            {mastery === 'proficient' && 'Great job! You have a solid understanding.'}
            {mastery === 'developing' && 'Good effort! Keep practicing to improve.'}
            {mastery === 'novice' && 'Keep studying! Review the material and try again.'}
          </p>

          {/* Mastery level indicator */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-2">
              {(['novice', 'developing', 'proficient', 'expert'] as MasteryLevel[]).map((level) => (
                <div
                  key={level}
                  className={`flex flex-col items-center ${
                    level === mastery ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <span className="text-2xl">{getMasteryEmoji(level)}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                    {level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Question breakdown */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Question Breakdown
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {responses.map((response, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    response.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}
                  title={`Question ${index + 1}: ${response.isCorrect ? 'Correct' : 'Incorrect'}`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setState('start');
                setCurrentIndex(0);
                setResponses([]);
                setCurrentAnswer(null);
                setShowFeedback(false);
                setConfidence(null);
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Retake Quiz
            </button>
            {onAbandon && (
              <button
                onClick={onAbandon}
                className="px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors"
              >
                Continue Learning
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
