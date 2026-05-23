'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { subjects } from '@/lib/content/subjects';
import { Button } from '@/components/ui/Button';
import { 
  Timer, 
  BrainCircuit, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  ChevronLeft,
  RefreshCcw, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Flat question type
interface FlatQuestion {
  question: string;
  answer: string;
  difficulty: string;
  category: string;
  subjectName: string;
}

export default function MockInterviewPage() {
  const router = useRouter();
  
  // Flatten questions and randomly select 10 for the mock interview
  const interviewPool = useMemo(() => {
    const items: FlatQuestion[] = [];
    subjects.forEach((subject) => {
      subject.topics.forEach((topic) => {
        topic.interviewQuestions.forEach((q) => {
          items.push({
            question: q.question,
            answer: q.answer,
            difficulty: q.difficulty,
            category: q.category,
            subjectName: subject.name,
          });
        });
      });
    });
    // Shuffle and pick 10
    return items.sort(() => 0.5 - Math.random()).slice(0, 10);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes total
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState<{question: FlatQuestion, gotIt: boolean}[]>([]);

  const currentQ = interviewPool[currentIndex];

  useEffect(() => {
    if (isFinished || timeLeft <= 0) {
      if (timeLeft <= 0) setIsFinished(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleNext = (gotIt: boolean) => {
    setResults(prev => [...prev, { question: currentQ, gotIt }]);
    if (gotIt) setScore(prev => prev + 1);
    
    if (currentIndex === interviewPool.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
        <div className="w-full max-w-2xl bg-bg-surface border border-border p-8 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent-teal to-accent-blue" />
          <BrainCircuit className="w-16 h-16 text-accent-teal mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Mock Interview Complete</h1>
          <p className="text-text-secondary mb-8">You reviewed {interviewPool.length} questions in {formatTime((15 * 60) - timeLeft)}.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="p-6 rounded-2xl bg-success/10 border border-success/20">
              <p className="text-success text-5xl font-bold mb-2">{score}</p>
              <p className="text-xs uppercase font-bold tracking-wider text-success">Nailed It</p>
            </div>
            <div className="p-6 rounded-2xl bg-danger/10 border border-danger/20">
              <p className="text-danger text-5xl font-bold mb-2">{interviewPool.length - score}</p>
              <p className="text-xs uppercase font-bold tracking-wider text-danger">Needs Review</p>
            </div>
          </div>

          <div className="text-left mb-8">
            <h3 className="text-lg font-bold mb-4">Your Weak Areas to Review:</h3>
            <ul className="space-y-3">
              {results.filter(r => !r.gotIt).slice(0,3).map((r, i) => (
                <li key={i} className="text-sm p-3 rounded-lg bg-bg-elevated border border-border flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-1">[{r.question.subjectName}] {r.question.category}</span>
                    <span className="text-text-secondary">{r.question.question}</span>
                  </div>
                </li>
              ))}
              {results.filter(r => !r.gotIt).length === 0 && (
                <li className="text-sm text-success">You nailed every question! Awesome job.</li>
              )}
            </ul>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={() => router.push('/interview')}>
              Back to Question Bank
            </Button>
            <Button variant="primary" onClick={() => window.location.reload()} className="gap-2">
              <RefreshCcw className="w-4 h-4" /> Start New Session
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-4xl mx-auto flex flex-col h-screen">
      
      {/* Exit Session link */}
      <div className="mb-4 text-left">
        <button 
          onClick={() => {
            if (confirm("Are you sure you want to end this interview session? Your progress will be lost.")) {
              router.push('/interview');
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-text-secondary hover:text-danger transition-colors cursor-pointer border-none bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" /> EXIT SESSION
        </button>
      </div>

      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mock Interview Session</h1>
          <p className="text-sm text-text-secondary">Simulating a fast-paced technical screen</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm font-bold border ${timeLeft < 60 ? 'bg-danger/20 text-danger border-danger/30 animate-pulse' : 'bg-bg-surface border-border text-text-primary'}`}>
          <Timer className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
          <span>Question {currentIndex + 1} of {interviewPool.length}</span>
          <span>{Math.round(((currentIndex) / interviewPool.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-bg-surface rounded-full overflow-hidden border border-border">
          <div 
            className="h-full bg-accent-teal transition-all duration-500 ease-out" 
            style={{ width: `${((currentIndex) / interviewPool.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Flashcard Area */}
      <div className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col bg-bg-surface border border-border rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Card Header (Meta) */}
            <div className="px-8 py-4 border-b border-border bg-bg-elevated/40 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-text-secondary bg-bg-primary px-3 py-1 rounded-full border border-border">
                {currentQ.subjectName}
              </span>
              <div className="flex gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border
                  ${currentQ.difficulty === 'Fresher' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 
                    currentQ.difficulty === 'Mid' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                    'bg-red-500/10 text-red-400 border-red-500/20'}
                `}>
                  {currentQ.difficulty}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full border bg-purple-500/10 text-purple-400 border-purple-500/20">
                  {currentQ.category}
                </span>
              </div>
            </div>

            {/* Question Area */}
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold leading-relaxed mb-8 max-w-2xl">
                {currentQ.question}
              </h2>
              
              {!showAnswer ? (
                <Button 
                  onClick={() => setShowAnswer(true)}
                  className="gap-2 rounded-full py-6 px-8 text-lg group bg-bg-elevated border-border hover:border-accent-teal hover:bg-bg-surface"
                >
                  <Eye className="w-5 h-5 text-text-secondary group-hover:text-accent-teal" /> 
                  Reveal Answer
                </Button>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full text-left bg-bg-elevated/50 p-6 rounded-2xl border border-border/50 overflow-y-auto max-h-[300px] prose prose-invert"
                >
                  <div dangerouslySetInnerHTML={{ __html: currentQ.answer }} />
                </motion.div>
              )}
            </div>

            {/* Footer Action Bar */}
            <div className={`p-6 border-t border-border flex justify-between gap-4 transition-all duration-300 ${showAnswer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <button 
                onClick={() => handleNext(false)}
                className="flex-1 py-4 rounded-xl border border-danger/30 bg-danger/10 text-danger hover:bg-danger/20 font-bold flex flex-col items-center gap-1 transition-colors"
              >
                <XCircle className="w-6 h-6" />
                <span>Needs Review</span>
              </button>
              <button 
                onClick={() => handleNext(true)}
                className="flex-1 py-4 rounded-xl border border-success/30 bg-success/10 text-success hover:bg-success/20 font-bold flex flex-col items-center gap-1 transition-colors"
              >
                <CheckCircle className="w-6 h-6" />
                <span>Nailed It</span>
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
