import React, { useState } from 'react';
import { QuizQuestion } from '@/lib/types/content';
import { Check, X, HelpCircle, RefreshCw, Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizSectionProps {
  questions: QuizQuestion[];
}

export const QuizSection: React.FC<QuizSectionProps> = ({ questions }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  if (!questions || questions.length === 0) return null;

  const currentQuestion = questions[currentIdx];

  const handleOptionClick = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedIdx(optIdx);
    setIsAnswered(true);
    if (optIdx === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setIsAnswered(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="w-full bg-bg-surface/50 backdrop-blur-md border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-teal/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-purple/10 rounded-full filter blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header / Progress bar */}
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary font-mono">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-accent-teal font-bold font-mono">
                Score: {score}
              </span>
            </div>

            {/* Progress line */}
            <div className="w-full h-1 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent-teal to-accent-purple transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-lg md:text-xl font-bold text-text-primary mt-2">
              {currentQuestion.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                let btnStyle = "border-border bg-bg-surface hover:bg-bg-surface/80 hover:border-text-secondary/30";
                let icon = <HelpCircle className="w-5 h-5 text-text-secondary/50 shrink-0" />;

                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) {
                    btnStyle = "border-accent-teal bg-accent-teal/10 text-accent-teal font-medium";
                    icon = <Check className="w-5 h-5 text-accent-teal shrink-0" />;
                  } else if (idx === selectedIdx) {
                    btnStyle = "border-danger bg-danger/10 text-danger font-medium";
                    icon = <X className="w-5 h-5 text-danger shrink-0" />;
                  } else {
                    btnStyle = "border-border bg-bg-surface opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswered}
                    className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all duration-200 text-left text-sm ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-bg-surface border border-border rounded-xl space-y-2"
              >
                <span className="text-xs font-bold text-accent-purple uppercase tracking-wider block">
                  Explanation
                </span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}

            {/* Next / Submit Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-teal to-accent-purple text-bg-primary rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-8 space-y-6"
          >
            <div className="w-20 h-20 bg-accent-teal/10 border border-accent-teal/20 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-accent-teal" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-text-primary">
                Quiz Completed!
              </h3>
              <p className="text-text-secondary text-sm">
                You got {score} out of {questions.length} questions correct.
              </p>
            </div>

            {/* Score Ring */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  className="stroke-border"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  className="stroke-accent-teal"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 45}
                  strokeDashoffset={2 * Math.PI * 45 * (1 - score / questions.length)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-2xl font-mono font-bold text-text-primary">
                {Math.round((score / questions.length) * 100)}%
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 border border-border hover:bg-bg-surface rounded-xl font-bold text-sm transition-colors mt-4"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
