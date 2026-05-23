'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, X, Send, Sparkles, HelpCircle, BookOpen, Code, Award, RefreshCw, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { getTopicBySlug } from '@/lib/content';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [subjectSlug, setSubjectSlug] = useState<string | null>(null);
  const [topicSlug, setTopicSlug] = useState<string | null>(null);
  const [topicTitle, setTopicTitle] = useState<string | null>(null);
  
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Monitor route context for topics
  useEffect(() => {
    const parts = pathname.split('/');
    // Check if path is /learn/[subject]/[topic]
    if (parts[1] === 'learn' && parts[2] && parts[3]) {
      const sSlug = parts[2];
      const tSlug = parts[3];
      setSubjectSlug(sSlug);
      setTopicSlug(tSlug);
      
      const resolved = getTopicBySlug(sSlug, tSlug);
      if (resolved) {
        setTopicTitle(resolved.topic.title);
        // Add a system welcome message when entering a new topic context
        setMessages([
          {
            role: 'model',
            text: `Hi! I'm your AI Study Partner. Let's learn **${resolved.topic.title}** together! How can I help you master this concept?`,
            timestamp: Date.now()
          }
        ]);
      }
    } else {
      setSubjectSlug(null);
      setTopicSlug(null);
      setTopicTitle(null);
      setMessages([
        {
          role: 'model',
          text: `Hello! I'm your AI Data Science Partner. Ask me anything about SQL, Python, NumPy, Pandas, Machine Learning, or Deep Learning!`,
          timestamp: Date.now()
        }
      ]);
    }
  }, [pathname]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          subjectSlug,
          topicSlug,
          history
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'model',
          text: data.text,
          timestamp: Date.now()
        }]);
      } else {
        throw new Error('API Route error');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: `Sorry, I encountered an issue connecting to my core brain. Let me know if you would like me to explain **${topicTitle || 'this concept'}** using my offline database!`,
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render markdown text in messages
  const renderMessageText = (text: string) => {
    const lines = text.split('\n');
    let insideCodeBlock = false;
    let codeContent: string[] = [];
    
    return lines.map((line, lineIdx) => {
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const codeText = codeContent.join('\n');
          codeContent = [];
          return (
            <pre key={lineIdx} className="my-3 p-4 rounded-xl bg-bg-elevated border border-border-subtle text-xs font-mono text-accent-teal overflow-x-auto whitespace-pre">
              <code>{codeText}</code>
            </pre>
          );
        } else {
          insideCodeBlock = true;
          return null;
        }
      }

      if (insideCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Handle Headers
      if (line.startsWith('### ')) {
        return <h4 key={lineIdx} className="text-sm font-bold text-text-primary mt-3 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={lineIdx} className="text-base font-bold text-text-primary mt-3 mb-1">{line.replace('## ', '')}</h3>;
      }

      // Handle Lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <ul key={lineIdx} className="list-disc pl-5 my-1 text-sm text-text-secondary">
            <li>{parseInlineFormatting(line.trim().substring(2))}</li>
          </ul>
        );
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Standard paragraphs
      return (
        <p key={lineIdx} className="text-sm text-text-secondary leading-relaxed">
          {parseInlineFormatting(line)}
        </p>
      );
    }).filter(el => el !== null);
  };

  // Parses inline bolding and inline code blocks
  const parseInlineFormatting = (text: string) => {
    // Regex for inline code: `code`
    // Regex for bold: **bold**
    const parts = [];
    let currentIdx = 0;
    
    // Simple state machine parsing for inline elements
    while (currentIdx < text.length) {
      const boldStart = text.indexOf('**', currentIdx);
      const codeStart = text.indexOf('`', currentIdx);
      
      // Determine what comes next
      if (boldStart !== -1 && (codeStart === -1 || boldStart < codeStart)) {
        // Append text before bold
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
        // Append text before code
        if (codeStart > currentIdx) {
          parts.push(text.substring(currentIdx, codeStart));
        }
        
        const codeEnd = text.indexOf('`', codeStart + 1);
        if (codeEnd !== -1) {
          parts.push(
            <code key={codeStart} className="px-1.5 py-0.5 rounded bg-bg-primary text-xs font-mono text-accent-teal border border-border/60">
              {text.substring(codeStart + 1, codeEnd)}
            </code>
          );
          currentIdx = codeEnd + 1;
        } else {
          parts.push(text.substring(codeStart));
          currentIdx = text.length;
        }
      } else {
        // No formatting left
        parts.push(text.substring(currentIdx));
        currentIdx = text.length;
      }
    }
    
    return parts;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-accent-teal to-accent-purple text-bg-primary font-bold flex items-center justify-center shadow-lg shadow-accent-teal/20 transition-transform active:scale-95 duration-200 cursor-pointer relative overflow-hidden group hover:scale-105 border-none"
        aria-label="Toggle AI Study Assistant"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6 text-text-inverse" />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="flex items-center justify-center">
              <Bot className="w-6 h-6 text-text-inverse animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Drawer Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-18 right-0 w-[360px] sm:w-[400px] h-[550px] bg-bg-surface border border-border rounded-2xl flex flex-col shadow-2xl overflow-hidden relative backdrop-blur-md"
          >
            {/* Decorative background blurs */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-teal/10 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent-purple/10 rounded-full filter blur-2xl pointer-events-none" />

            {/* Chat Header */}
            <header className="px-5 py-4 border-b border-border flex items-center justify-between z-10 bg-bg-surface/60 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accent-teal to-accent-purple flex items-center justify-center text-bg-primary shadow shadow-accent-teal/10">
                  <Sparkles className="w-5 h-5 text-text-inverse" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm">AI Study Partner</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-bg-primary rounded-lg text-text-secondary hover:text-text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Teaching Context Banner */}
            {topicTitle && (
              <div className="px-5 py-2.5 bg-accent-teal/5 border-b border-accent-teal/10 text-xs text-text-secondary flex items-center gap-2 shrink-0 z-10 font-bold">
                <BookOpen className="w-3.5 h-3.5 text-accent-teal" />
                <span>Teaching context:</span>
                <Badge variant="teal" className="text-[9px] uppercase tracking-wider py-0 px-2">{topicTitle}</Badge>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4 no-scrollbar z-10">
              {messages.map((msg, idx) => {
                const isAI = msg.role === 'model';
                return (
                  <div key={idx} className={`flex gap-3 max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                    {isAI && (
                      <div className="w-7 h-7 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-accent-purple" />
                      </div>
                    )}
                    <div className={`p-3.5 rounded-2xl border text-sm space-y-2
                      ${isAI 
                        ? 'bg-bg-surface/50 border-border/80 text-text-secondary rounded-tl-none' 
                        : 'bg-accent-teal/10 border-accent-teal/20 text-text-primary rounded-tr-none'
                      }
                    `}>
                      {renderMessageText(msg.text)}
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-7 h-7 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0 mt-1 animate-pulse">
                    <Bot className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div className="p-4 bg-bg-surface/50 border border-border/80 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-accent-teal animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-accent-teal animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-accent-teal animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Cards (Contextual) */}
            {topicTitle && messages.length <= 2 && !loading && (
              <div className="px-5 py-3 border-t border-border/60 bg-bg-surface/40 z-10 shrink-0 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary/60">Study Shortcuts</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSendMessage(`Explain ${topicTitle} simply (ELI5 explanation)`)}
                    className="flex items-center gap-2 p-2 border border-border/40 hover:border-accent-teal/30 hover:bg-accent-teal/5 rounded-xl text-left text-xs font-bold text-text-secondary transition-all cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                    <span>Explain simply</span>
                  </button>
                  <button
                    onClick={() => handleSendMessage(`Show me a code example for ${topicTitle}`)}
                    className="flex items-center gap-2 p-2 border border-border/40 hover:border-accent-teal/30 hover:bg-accent-teal/5 rounded-xl text-left text-xs font-bold text-text-secondary transition-all cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                    <span>Show code</span>
                  </button>
                  <button
                    onClick={() => handleSendMessage(`What are the interview questions for ${topicTitle}?`)}
                    className="flex items-center gap-2 p-2 border border-border/40 hover:border-accent-teal/30 hover:bg-accent-teal/5 rounded-xl text-left text-xs font-bold text-text-secondary transition-all cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-accent-purple shrink-0" />
                    <span>Interview prep</span>
                  </button>
                  <button
                    onClick={() => handleSendMessage(`Give me a practice quiz question for ${topicTitle}`)}
                    className="flex items-center gap-2 p-2 border border-border/40 hover:border-accent-teal/30 hover:bg-accent-teal/5 rounded-xl text-left text-xs font-bold text-text-secondary transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-accent-purple shrink-0" />
                    <span>Quiz me</span>
                  </button>
                </div>
              </div>
            )}

            {/* Message Input Panel */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(message);
              }}
              className="p-4 border-t border-border z-10 bg-bg-surface/80 backdrop-blur-sm flex gap-3 shrink-0"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                placeholder={topicTitle ? `Ask tutor about ${topicTitle}...` : "Ask a data science question..."}
                className="flex-grow px-4 py-2.5 text-sm bg-bg-primary border border-border/60 focus:border-accent-teal rounded-xl focus:outline-none placeholder:text-text-secondary/50 text-text-primary"
              />
              <button
                type="submit"
                disabled={!message.trim() || loading}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-teal to-accent-purple flex items-center justify-center text-bg-primary hover:opacity-95 shadow-md active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer border-none"
              >
                <Send className="w-4.5 h-4.5 text-text-inverse" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
