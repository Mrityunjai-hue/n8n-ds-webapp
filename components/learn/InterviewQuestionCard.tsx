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
      className={`overflow-hidden transition-all duration-300 bg-bg-surface/30 backdrop-blur-sm border
        ${isReviewed 
          ? 'border-accent-teal/40 hover:border-accent-teal/80 shadow-md shadow-accent-teal/5' 
          : 'border-border/40 hover:border-accent-teal/30'
        }
      `}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 select-none">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-bg-primary border border-border/40 text-accent-teal">
            <BrainCircuit className="w-5 h-5" />
          </div>
          {subjectName && topicName ? (
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                {subjectName}
              </span>
              <span className="text-[10px] text-text-secondary/70 truncate max-w-[200px]">
                {topicName}
              </span>
            </div>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
              Interview Prep
            </span>
          )}
        </div>
        
        {/* Buttons / Badges Toolbar */}
        <div className="flex items-center gap-3.5 flex-wrap justify-end">
          {/* Mark Reviewed Toggle */}
          <button
            onClick={() => toggleReviewedQuestion(question)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer
              ${isReviewed 
                ? 'bg-accent-teal/15 border-accent-teal/30 text-accent-teal' 
                : 'bg-bg-surface/40 border-border/40 text-text-secondary hover:border-accent-teal/40 hover:text-text-primary'
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
      <h4 className="text-lg font-bold mb-6 leading-tight text-text-primary">
        {question}
      </h4>

      {/* Action reveal */}
      <div className="space-y-4">
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className={`
            w-full flex items-center justify-between px-5 py-3 rounded-xl font-bold text-sm transition-all duration-250 cursor-pointer border-none
            ${isRevealed 
              ? 'bg-bg-primary text-text-primary border border-border/60' 
              : 'bg-gradient-to-r from-accent-teal to-accent-purple text-text-inverse hover:opacity-90 shadow-md shadow-accent-teal/10'}
          `}
        >
          <span>{isRevealed ? 'Hide Baseline Answer' : 'Reveal recommended Answer'}</span>
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
              <div className="p-6 bg-bg-surface/50 border border-border/60 rounded-xl space-y-6">
                
                {/* Baseline Answer text */}
                <div className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed text-sm">
                  {answer.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>

                {/* AI Extension Section */}
                <div className="border-t border-border/40 pt-5 space-y-4">
                  {!aiExplanation ? (
                    <Button
                      onClick={handleAskAI}
                      disabled={isAiLoading}
                      variant="secondary"
                      className="w-full text-xs py-2 bg-gradient-to-r hover:from-accent-teal/5 hover:to-accent-purple/5 border-border/60 hover:border-accent-teal/40 text-text-primary gap-2"
                    >
                      {isAiLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-accent-teal" />
                          <span>Generating AI explanation...</span>
                        </>
                      ) : (
                        <>
                          <Bot className="w-4 h-4 text-accent-purple" />
                          <span>Ask AI Tutor to Explain More</span>
                        </>
                      )}
                    </Button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-gradient-to-br from-bg-surface/40 to-bg-surface/10 border border-border/60 rounded-xl space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-border/20">
                        <div className="flex items-center gap-2 text-xs font-bold text-accent-purple uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-accent-teal" />
                          <span>AI Tutor Deep Dive</span>
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
