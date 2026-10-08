'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  BrainCircuit, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Bot, 
  Loader2 
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useProgressStore } from '@/lib/store/useProgressStore';
import { motion, AnimatePresence } from 'framer-motion';

interface InterviewQuestionCardProps {
  question: string;
  answer: string;
  difficulty: 'Fresher' | 'Mid' | 'Senior';
  category: string;
  topicHref?: string;
  subjectName?: string;
  topicName?: string;
}

export const InterviewQuestionCard: React.FC<InterviewQuestionCardProps> = ({
  question,
  answer,
  difficulty,
  category,
  topicHref,
  subjectName,
  topicName,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  
  const { reviewedQuestions, toggleReviewedQuestion } = useProgressStore();
  const isReviewed = reviewedQuestions.includes(question);

  const difficultyColor =
    difficulty === 'Fresher' ? 'teal' :
    difficulty === 'Mid' ? 'amber' : 'red';

  const handleAskAI = async () => {
    if (isAiLoading) return;
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Explain this interview question in detail, with typical follow-up questions, edge cases, and code/examples if relevant: "${question}". The recommended baseline answer is: "${answer}".`
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiExplanation(data.text);
      } else {
        throw new Error('API Route failed');
      }
    } catch (err) {
      console.error('AI explanation error:', err);
      setAiExplanation('Sorry, I had trouble contacting my AI brain. Let me know if you would like me to explain this concept in another way!');
    } finally {
      setIsAiLoading(false);
    }
  };

  // Helper to parse basic markdown inside card
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    let insideCode = false;
    let codeBlock: string[] = [];

    return lines.map((line, idx) => {
      if (line.trim().startsWith('```')) {
        if (insideCode) {
          insideCode = false;
          const codeText = codeBlock.join('\n');
          codeBlock = [];
          return (
            <pre key={idx} className="my-3 p-4 rounded-xl bg-bg-elevated border border-border-subtle text-xs font-mono text-accent-teal overflow-x-auto">
              <code>{codeText}</code>
            </pre>
          );
        } else {
          insideCode = true;
          return null;
        }
      }

      if (insideCode) {
        codeBlock.push(line);
        return null;
      }

      if (line.startsWith('### ')) {
        return <h5 key={idx} className="text-xs font-bold text-text-primary mt-3 mb-1 uppercase tracking-wider">{line.replace('### ', '')}</h5>;
      }
      if (line.startsWith('## ') || line.startsWith('# ')) {
        return <h4 key={idx} className="text-sm font-bold text-text-primary mt-3 mb-1">{line.replace(/## |# /, '')}</h4>;
      }

      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <ul key={idx} className="list-disc pl-5 my-1 text-xs text-text-secondary leading-relaxed">
            <li>{parseInlineFormatting(line.trim().substring(2))}</li>
          </ul>
        );
      }

      if (!line.trim()) return <div key={idx} className="h-2" />;

      return (
        <p key={idx} className="text-xs text-text-secondary leading-relaxed">
          {parseInlineFormatting(line)}
        </p>
      );
    }).filter(el => el !== null);
  };

  const parseInlineFormatting = (text: string) => {
    const parts = [];
    let currentIdx = 0;
    
    while (currentIdx < text.length) {
      const boldStart = text.indexOf('**', currentIdx);
      const codeStart = text.indexOf('`', currentIdx);
      
      if (boldStart !== -1 && (codeStart === -1 || boldStart < codeStart)) {
        if (boldStart > currentIdx) {
          parts.push(text.substring(currentIdx, boldStart));
        }
        const boldEnd = text.indexOf('**', boldStart + 2);
        if (boldEnd !== -1) {
          parts.push(
            <strong key={boldStart} className="text-text-primary font-bold">
              {text.substring(boldStart + 2, boldEnd)}
            </strong>
          );
          currentIdx = boldEnd + 2;
        } else {
          parts.push(text.substring(boldStart));
          currentIdx = text.length;
        }
      } else if (codeStart !== -1) {
        if (codeStart > currentIdx) {
          parts.push(text.substring(currentIdx, codeStart));
        }
        const codeEnd = text.indexOf('`', codeStart + 1);
        if (codeEnd !== -1) {
          parts.push(
            <code key={codeStart} className="px-1 py-0.5 rounded bg-bg-primary text-[10px] font-mono text-accent-teal border border-border/40">
              {text.substring(codeStart + 1, codeEnd)}
            </code>
          );
          currentIdx = codeEnd + 1;
        } else {
          parts.push(text.substring(codeStart));
          currentIdx = text.length;
        }
      } else {
        parts.push(text.substring(currentIdx));
        currentIdx = text.length;
      }
    }
    
    return parts;
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 bg-[var(--canvas-raised)] border-2 doodle-card shadow-[var(--shadow-sm)]
        ${isReviewed 
          ? 'border-[var(--green)] hover:border-[var(--green)]' 
          : 'border-[var(--canvas-border)] hover:border-[var(--blue)]'
        }
      `}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 select-none">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] text-[var(--blue)]">
            <BrainCircuit className="w-5 h-5" />
          </div>
          {subjectName && topicName ? (
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-3)] font-mono">
                {subjectName}
              </span>
              <span className="text-[10px] text-[var(--ink-3)] truncate max-w-[200px] font-mono">
                {topicName}
              </span>
            </div>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-3)] font-mono">
              Interview Prep
            </span>
          )}
        </div>
        
        {/* Buttons / Badges Toolbar */}
        <div className="flex items-center gap-3.5 flex-wrap justify-end">
          {/* Mark Reviewed Toggle */}
          <button
            onClick={() => toggleReviewedQuestion(question)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider uppercase font-mono transition-all duration-200 cursor-pointer
              ${isReviewed 
                ? 'bg-[var(--green-tint)] border-[var(--green)] text-[var(--green)]' 
                : 'bg-[var(--canvas-sunken)] border-[var(--canvas-border)] text-[var(--ink-3)] hover:border-[var(--blue)] hover:text-[var(--ink)]'
              }
            `}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isReviewed ? 'Reviewed' : 'Mark Reviewed'}</span>
          </button>

          <Badge variant={difficultyColor as any}>{difficulty}</Badge>
          <Badge variant="gray">{category}</Badge>
        </div>
      </div>

      {/* Question Headline */}
      <h4 className="text-lg font-bold mb-6 leading-tight text-[var(--ink)] font-heading">
        {question}
      </h4>

      {/* Action reveal */}
      <div className="space-y-4">
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className={`
            w-full flex items-center justify-between px-5 py-3 rounded-xl font-bold text-sm font-mono transition-all duration-200 cursor-pointer border
            ${isRevealed 
              ? 'bg-[var(--canvas-sunken)] text-[var(--ink)] border-[var(--canvas-border)]' 
              : 'bg-[var(--blue)] text-white border-[var(--blue-dim)] hover:bg-[var(--blue-dim)] shadow-[var(--shadow-sm)]'}
          `}
        >
          <span>{isRevealed ? 'Hide Baseline Answer' : 'Reveal Recommended Answer'}</span>
          {isRevealed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Revealed Content */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-[var(--canvas-sunken)] border border-[var(--canvas-border)] rounded-xl space-y-6">
                
                {/* Baseline Answer text */}
                <div className="prose dark:prose-invert prose-neutral max-w-none text-[var(--ink-2)] leading-relaxed text-sm font-body">
                  {answer.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>

                {/* AI Extension Section */}
                <div className="border-t-2 border-[var(--canvas-border)] pt-5 space-y-4">
                  {!aiExplanation ? (
                    <Button
                      onClick={handleAskAI}
                      disabled={isAiLoading}
                      variant="secondary"
                      className="w-full text-xs py-2.5 bg-[var(--canvas-sunken)] hover:bg-[var(--canvas)] border-2 border-[var(--canvas-border)] text-[var(--ink)] gap-2.5 font-bold shadow-xs cursor-pointer"
                    >
                      {isAiLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[var(--blue)]" />
                          <span>Generating conceptual deep-dive breakdown...</span>
                        </>
                      ) : (
                        <>
                          <div className="w-5 h-5 rounded-full bg-[var(--blue-tint)] border border-[var(--blue)] flex items-center justify-center text-[var(--blue)]">
                            <Sparkles className="w-3 h-3" />
                          </div>
                          <span>Explore Deep-Dive Conceptual Breakdown</span>
                        </>
                      )}
                    </Button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-[var(--canvas-sunken)] border-2 border-[var(--canvas-border)] rounded-2xl space-y-3 shadow-inner"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--canvas-border)]">
                        <div className="flex items-center gap-2 text-xs font-bold text-[var(--blue)] uppercase tracking-wider">
                          <div className="w-5 h-5 rounded-full bg-[var(--yellow-tint)] border border-[var(--yellow)] flex items-center justify-center text-[var(--ink)]">
                            <Sparkles className="w-3 h-3 text-[var(--blue)]" />
                          </div>
                          <span>Detailed Concept Breakdown</span>
                        </div>
                        <button
                          onClick={() => setAiExplanation(null)}
                          className="text-[10px] font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary cursor-pointer hover:underline"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="space-y-3 text-xs leading-relaxed text-text-secondary">
                        {renderMarkdown(aiExplanation)}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Jump to full topic */}
                {topicHref && (
                  <div className="pt-4 border-t border-border/30 flex justify-end">
                    <Link
                      href={topicHref}
                      className="text-[10px] font-bold uppercase tracking-widest text-accent-teal flex items-center gap-2 hover:underline"
                    >
                      Jump to full topic <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};
