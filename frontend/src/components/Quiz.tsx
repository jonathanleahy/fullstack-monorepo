import { useState, useCallback } from 'react';
import type { Quiz as QuizType } from '../types/course';
import { Button, Card, CardHeader, CardTitle, CardContent, Progress } from '@repo/playbook';

interface QuizProps {
  quiz: QuizType;
  onComplete?: (score: number, total: number) => void;
  onClose?: () => void;
}

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  isSubmitted: boolean;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
  isComplete: boolean;
}

export function Quiz({ quiz, onComplete, onClose }: QuizProps) {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    isSubmitted: false,
    answers: [],
    isComplete: false,
  });

  const currentQuestion = quiz.questions[state.currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((state.currentQuestionIndex + (state.isSubmitted ? 1 : 0)) / totalQuestions) * 100;

  const handleSelectAnswer = useCallback((index: number) => {
    if (!state.isSubmitted) {
      setState(prev => ({ ...prev, selectedAnswer: index }));
    }
  }, [state.isSubmitted]);

  const handleSubmitAnswer = useCallback(() => {
    if (state.selectedAnswer === null) return;

    const isCorrect = state.selectedAnswer === currentQuestion.correctIndex;
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedIndex: state.selectedAnswer,
      isCorrect,
    };

    setState(prev => ({
      ...prev,
      isSubmitted: true,
      answers: [...prev.answers, newAnswer],
    }));
  }, [state.selectedAnswer, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < totalQuestions - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        isSubmitted: false,
      }));
    } else {
      // Quiz complete
      const correctAnswers = state.answers.filter(a => a.isCorrect).length +
        (state.selectedAnswer === currentQuestion.correctIndex ? 1 : 0);
      setState(prev => ({ ...prev, isComplete: true }));
      onComplete?.(correctAnswers, totalQuestions);
    }
  }, [state.currentQuestionIndex, state.answers, state.selectedAnswer, currentQuestion, totalQuestions, onComplete]);

  const handleRetakeQuiz = useCallback(() => {
    setState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      isSubmitted: false,
      answers: [],
      isComplete: false,
    });
  }, []);

  // Calculate final score
  const correctCount = state.answers.filter(a => a.isCorrect).length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  if (state.isComplete) {
    return (
      <div data-testid="quiz-results" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <div
                data-testid="quiz-score"
                className={`text-5xl font-bold mb-2 ${
                  scorePercentage >= 70 ? 'text-green-600' :
                  scorePercentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                }`}
              >
                {scorePercentage}%
              </div>
              <p className="text-muted-foreground">
                You got {correctCount} out of {totalQuestions} questions correct
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Review Your Answers:</h4>
              {quiz.questions.map((question, index) => {
                const answer = state.answers[index];
                const isCorrect = answer?.isCorrect;
                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border ${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm mt-1">
                          <span className="text-muted-foreground">Your answer: </span>
                          {question.options[answer?.selectedIndex ?? 0]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-green-600 mt-1">
                            <span className="font-medium">Correct answer: </span>
                            {question.options[question.correctIndex]}
                          </p>
                        )}
                        {question.explanation && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button variant="outline" onClick={handleRetakeQuiz}>
                Retake Quiz
              </Button>
              {onClose && (
                <Button onClick={onClose}>
                  Continue Learning
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div data-testid="quiz-container" className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quiz</CardTitle>
            <span className="text-sm text-muted-foreground">
              Question {state.currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <div data-testid="quiz-progress">
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div data-testid="quiz-question" className="text-lg font-medium">
            {currentQuestion.question}
          </div>

          <div data-testid="quiz-options" className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = state.selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctIndex;
              const showCorrect = state.isSubmitted && isCorrect;
              const showIncorrect = state.isSubmitted && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  data-testid="quiz-option"
                  onClick={() => handleSelectAnswer(index)}
                  disabled={state.isSubmitted}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${state.isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showCorrect
                        ? 'border-green-500 bg-green-500 text-white'
                        : showIncorrect
                        ? 'border-red-500 bg-red-500 text-white'
                        : isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300'
                    }`}>
                      {showCorrect && '✓'}
                      {showIncorrect && '✗'}
                      {!state.isSubmitted && isSelected && '●'}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {state.isSubmitted && (
            <div data-testid="quiz-feedback" className={`p-4 rounded-lg ${
              state.selectedAnswer === currentQuestion.correctIndex
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`font-medium ${
                state.selectedAnswer === currentQuestion.correctIndex
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}>
                {state.selectedAnswer === currentQuestion.correctIndex
                  ? 'Correct!'
                  : 'Incorrect'}
              </p>
              {currentQuestion.explanation && (
                <p className="text-sm mt-2 text-muted-foreground">
                  {currentQuestion.explanation}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4">
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Exit Quiz
              </Button>
            )}
            <div className="ml-auto">
              {!state.isSubmitted ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={state.selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {state.currentQuestionIndex < totalQuestions - 1
                    ? 'Next Question'
                    : 'See Results'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
