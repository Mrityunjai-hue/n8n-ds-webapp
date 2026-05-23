'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  Bot, X, Send, Sparkles, HelpCircle, BookOpen, Code, Award,
  RefreshCw, MessageSquare, Copy, Check, Trash2, ChevronRight,
  Zap, Map, Globe, GitCompare, BarChart2, Briefcase, Target, Lightbulb
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { getTopicBySlug } from '@/lib/content';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  followUps?: string[];
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  prompt: string;
  color: 'teal' | 'purple';
}

type PageType = 'home' | 'subject' | 'topic' | 'projects' | 'interview' | 'dashboard' | 'other';

function getPageType(pathname: string): PageType {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return 'home';
  if (parts[0] === 'learn' && parts[1] && parts[2]) return 'topic';
  if (parts[0] === 'learn' && parts[1]) return 'subject';
  if (parts[0] === 'projects') return 'projects';
  if (parts[0] === 'interview') return 'interview';
  if (parts[0] === 'dashboard') return 'dashboard';
  return 'other';
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [subjectSlug, setSubjectSlug] = useState<string | null>(null);
  const [topicSlug, setTopicSlug] = useState<string | null>(null);
  const [topicTitle, setTopicTitle] = useState<string | null>(null);
  const [subjectName, setSubjectName] = useState<string | null>(null);
  const [pageType, setPageType] = useState<PageType>('home');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Page Context Detection ──────────────────────────────────────────────
  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean);
    const type = getPageType(pathname);
    setPageType(type);

    if (type === 'topic' && parts[1] && parts[2]) {
      const sSlug = parts[1];
      const tSlug = parts[2];
      setSubjectSlug(sSlug);
      setTopicSlug(tSlug);
      const resolved = getTopicBySlug(sSlug, tSlug);
      if (resolved) {
        setTopicTitle(resolved.topic.title);
        setSubjectName(resolved.subject.name);
        setMessages([{
          role: 'model',
          text: `Hi! I'm your AI Study Partner 🚀\n\nI'm loaded up with full context on **${resolved.topic.title}**. Ask me anything — I can explain concepts, show code examples, run you through interview questions, or quiz you!\n\nWhat would you like to explore first?`,
          timestamp: Date.now(),
          followUps: [
            `Explain ${resolved.topic.title} in simple terms`,
            `What are the key points of ${resolved.topic.title}?`,
            `Give me a real-world use case`
          ]
        }]);
      }
    } else if (type === 'subject' && parts[1]) {
      const sName = parts[1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      setSubjectSlug(parts[1]);
      setTopicSlug(null);
      setTopicTitle(null);
      setSubjectName(sName);
      setMessages([{
        role: 'model',
        text: `Hi! You're exploring **${sName}** 📚\n\nI can help you plan your study path, understand the curriculum, and figure out which topics to tackle first. What do you need?`,
        timestamp: Date.now(),
        followUps: [
          `What topics are covered in ${sName}?`,
          `Give me a study plan for ${sName}`,
          `Which ${sName} topics are most asked in interviews?`
        ]
      }]);
    } else if (type === 'projects') {
      setSubjectSlug(null); setTopicSlug(null); setTopicTitle(null); setSubjectName(null);
      setMessages([{
        role: 'model',
        text: `Welcome to Projects! 🏗️\n\nI can help you choose the right project, understand the tech stack, guide you through implementation, or review your approach. What are you working on?`,
        timestamp: Date.now(),
        followUps: [
          'What project should I build first as a beginner?',
          'What tech stack is used in these projects?',
          'How do I approach a data science project end-to-end?'
        ]
      }]);
    } else if (type === 'interview') {
      setSubjectSlug(null); setTopicSlug(null); setTopicTitle(null); setSubjectName(null);
      setMessages([{
        role: 'model',
        text: `Interview Prep Mode activated! 🎯\n\nI can simulate mock interviews, give you tips on structuring answers, and share what top companies really ask for data science roles. Ready to practice?`,
        timestamp: Date.now(),
        followUps: [
          'What are the most common data science interview questions?',
          'How do I structure a STAR format answer?',
          'Give me a mock SQL interview question'
        ]
      }]);
    } else if (type === 'dashboard') {
      setSubjectSlug(null); setTopicSlug(null); setTopicTitle(null); setSubjectName(null);
      setMessages([{
        role: 'model',
        text: `Hey! Looking at your dashboard 📊\n\nI can help you plan what to study next, understand your progress, or suggest a learning strategy tailored to your goals. What would you like to work on today?`,
        timestamp: Date.now(),
        followUps: [
          'What should I study next based on my progress?',
          'How many hours a day should I study data science?',
          'Give me a 30-day data science learning plan'
        ]
      }]);
    } else {
      setSubjectSlug(null); setTopicSlug(null); setTopicTitle(null); setSubjectName(null);
      setMessages([{
        role: 'model',
        text: `Hello! I'm your AI Data Science Mentor 🤖✨\n\nI cover **Python, SQL, Pandas, NumPy, Machine Learning, Deep Learning, Gen-AI, and more**. Navigate to any topic and I'll automatically tune my knowledge to match it!\n\nWhat can I help you with today?`,
        timestamp: Date.now(),
        followUps: [
          'Where should a complete beginner start?',
          'What are the most in-demand data science skills in 2025?',
          'Explain the difference between ML and Deep Learning'
        ]
      }]);
    }
  }, [pathname]);

  // ── Scroll to bottom ────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // ── New message badge on closed chat ───────────────────────────────────
  useEffect(() => {
    if (!isOpen && messages.length > 0 && messages[messages.length - 1].role === 'model') {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // ── Send message ────────────────────────────────────────────────────────
  const handleSendMessage = useCallback(async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, subjectSlug, topicSlug, pageType, history })
      });

      if (response.ok) {
        const data = await response.json();
        // Parse follow-up suggestions if the API returns them
        const followUps = data.followUps || generateFollowUps(textToSend, topicTitle, pageType);
        setMessages(prev => [...prev, {
          role: 'model',
          text: data.text,
          timestamp: Date.now(),
          followUps
        }]);
      } else {
        throw new Error('API Route error');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: `Sorry, I hit a connection issue. Try asking again — or navigate to a topic page for rich offline answers!`,
        timestamp: Date.now()
      }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading, subjectSlug, topicSlug, pageType, topicTitle]);

  // ── Generate smart follow-up suggestions ────────────────────────────────
  const generateFollowUps = (lastQuestion: string, topic: string | null, page: PageType): string[] => {
    const q = lastQuestion.toLowerCase();
    if (topic) {
      if (q.includes('explain') || q.includes('what is')) return [`Show me code for ${topic}`, `Quiz me on ${topic}`, `Real-world example of ${topic}`];
      if (q.includes('code') || q.includes('example')) return [`Explain this step by step`, `What are common mistakes?`, `Interview question on ${topic}`];
      if (q.includes('quiz') || q.includes('question')) return [`Give me another question`, `Explain the answer`, `Harder question please`];
      return [`Give me a practice question`, `What should I study next?`, `Common interview questions on ${topic}`];
    }
    if (page === 'interview') return ['Give me another interview question', 'How do I improve my answer?', 'What topics are most tested?'];
    if (page === 'projects') return ['What skills does this project teach?', 'How do I deploy this?', 'Suggest a project extension'];
    return ['Tell me more', 'Give me an example', 'What should I learn next?'];
  };

  // ── Quick Actions (page-aware) ───────────────────────────────────────────
  const getQuickActions = (): QuickAction[] => {
    if (pageType === 'topic' && topicTitle) {
      return [
        { icon: <HelpCircle className="w-3.5 h-3.5" />, label: 'Explain Simply', prompt: `Explain ${topicTitle} as simply as possible (ELI5)`, color: 'teal' },
        { icon: <Code className="w-3.5 h-3.5" />, label: 'Show Code', prompt: `Show me a practical code example for ${topicTitle}`, color: 'teal' },
        { icon: <Award className="w-3.5 h-3.5" />, label: 'Interview Q', prompt: `What are the top interview questions for ${topicTitle}?`, color: 'purple' },
        { icon: <RefreshCw className="w-3.5 h-3.5" />, label: 'Quiz Me', prompt: `Give me a challenging quiz question about ${topicTitle}`, color: 'purple' },
        { icon: <Zap className="w-3.5 h-3.5" />, label: 'Key Points', prompt: `What are the 5 most important things to know about ${topicTitle}?`, color: 'teal' },
        { icon: <Globe className="w-3.5 h-3.5" />, label: 'Real World', prompt: `Give me a real-world use case of ${topicTitle} in industry`, color: 'teal' },
        { icon: <Map className="w-3.5 h-3.5" />, label: 'Study Plan', prompt: `Create a 1-week study plan to master ${topicTitle}`, color: 'purple' },
        { icon: <GitCompare className="w-3.5 h-3.5" />, label: 'Compare', prompt: `How does ${topicTitle} compare to related concepts?`, color: 'purple' },
      ];
    }
    if (pageType === 'subject' && subjectName) {
      return [
        { icon: <Map className="w-3.5 h-3.5" />, label: 'Study Plan', prompt: `Give me a study plan for ${subjectName}`, color: 'teal' },
        { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Topics List', prompt: `What topics are covered in ${subjectName}?`, color: 'teal' },
        { icon: <Target className="w-3.5 h-3.5" />, label: 'Start Here', prompt: `Which topic in ${subjectName} should I start with as a beginner?`, color: 'purple' },
        { icon: <Award className="w-3.5 h-3.5" />, label: 'Interview Q', prompt: `What are the most common ${subjectName} interview questions?`, color: 'purple' },
        { icon: <BarChart2 className="w-3.5 h-3.5" />, label: 'Job Demand', prompt: `How in-demand is ${subjectName} in the job market?`, color: 'teal' },
        { icon: <Zap className="w-3.5 h-3.5" />, label: 'Quick Win', prompt: `What's one quick ${subjectName} skill I can learn today?`, color: 'purple' },
      ];
    }
    if (pageType === 'interview') {
      return [
        { icon: <Target className="w-3.5 h-3.5" />, label: 'Mock Q', prompt: 'Give me a mock data science interview question', color: 'teal' },
        { icon: <MessageSquare className="w-3.5 h-3.5" />, label: 'STAR Method', prompt: 'How do I use the STAR method to answer behavioural questions?', color: 'teal' },
        { icon: <Code className="w-3.5 h-3.5" />, label: 'SQL Round', prompt: 'Give me a tough SQL interview question with answer', color: 'purple' },
        { icon: <RefreshCw className="w-3.5 h-3.5" />, label: 'ML Question', prompt: 'What are the top 5 machine learning interview questions?', color: 'purple' },
        { icon: <Briefcase className="w-3.5 h-3.5" />, label: 'DS Roles', prompt: 'What is the difference between Data Analyst, Data Scientist, and ML Engineer?', color: 'teal' },
        { icon: <Award className="w-3.5 h-3.5" />, label: 'Salary Tips', prompt: 'How do I negotiate a data science salary?', color: 'purple' },
      ];
    }
    if (pageType === 'projects') {
      return [
        { icon: <Target className="w-3.5 h-3.5" />, label: 'Best Project', prompt: 'What project should I build first to impress employers?', color: 'teal' },
        { icon: <Code className="w-3.5 h-3.5" />, label: 'Stack Guide', prompt: 'What tech stack is used in data science projects?', color: 'teal' },
        { icon: <Globe className="w-3.5 h-3.5" />, label: 'Deploy It', prompt: 'How do I deploy a data science project online?', color: 'purple' },
        { icon: <Lightbulb className="w-3.5 h-3.5" />, label: 'Project Ideas', prompt: 'Suggest 5 creative data science project ideas for my portfolio', color: 'purple' },
      ];
    }
    if (pageType === 'dashboard') {
      return [
        { icon: <Map className="w-3.5 h-3.5" />, label: '30-Day Plan', prompt: 'Give me a 30-day data science learning roadmap', color: 'teal' },
        { icon: <Target className="w-3.5 h-3.5" />, label: 'What Next?', prompt: 'I know Python basics. What should I learn next for data science?', color: 'teal' },
        { icon: <Zap className="w-3.5 h-3.5" />, label: 'Daily Goals', prompt: 'What are good daily study habits for data science?', color: 'purple' },
        { icon: <BarChart2 className="w-3.5 h-3.5" />, label: 'Track Progress', prompt: 'How do I know if I am ready to apply for data science jobs?', color: 'purple' },
      ];
    }
    // Home / default
    return [
      { icon: <HelpCircle className="w-3.5 h-3.5" />, label: 'Where to Start', prompt: 'I am a complete beginner. Where should I start with data science?', color: 'teal' },
      { icon: <BarChart2 className="w-3.5 h-3.5" />, label: 'Career Path', prompt: 'What is the best career path to become a data scientist in 2025?', color: 'teal' },
      { icon: <Code className="w-3.5 h-3.5" />, label: 'Python vs R', prompt: 'Should I learn Python or R for data science?', color: 'purple' },
      { icon: <Award className="w-3.5 h-3.5" />, label: 'Top Skills', prompt: 'What are the top 5 most in-demand data science skills right now?', color: 'purple' },
      { icon: <Map className="w-3.5 h-3.5" />, label: 'Roadmap', prompt: 'Give me a complete data science learning roadmap', color: 'teal' },
      { icon: <Briefcase className="w-3.5 h-3.5" />, label: 'Job Ready', prompt: 'How long does it take to become job-ready in data science?', color: 'purple' },
    ];
  };

  // ── Copy message ────────────────────────────────────────────────────────
  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // ── Clear chat ───────────────────────────────────────────────────────────
  const handleClearChat = () => {
    setMessages(prev => [prev[0]]); // Keep only the welcome message
  };

  // ── Context badge label ─────────────────────────────────────────────────
  const getContextLabel = () => {
    if (topicTitle) return topicTitle;
    if (subjectName && pageType === 'subject') return subjectName;
    if (pageType === 'interview') return 'Interview Prep';
    if (pageType === 'projects') return 'Projects';
    if (pageType === 'dashboard') return 'Dashboard';
    return null;
  };

  // ── Render message text (markdown) ──────────────────────────────────────
  const renderMessageText = (text: string) => {
    const lines = text.split('\n');
    let insideCodeBlock = false;
    let codeContent: string[] = [];
    let codeLang = '';

    return lines.map((line, lineIdx) => {
      if (line.trim().startsWith('```')) {
        if (insideCodeBlock) {
          insideCodeBlock = false;
          const codeText = codeContent.join('\n');
          codeContent = [];
          return (
            <pre key={lineIdx} className="my-3 p-4 rounded-xl bg-[#0d1117] border border-border-subtle text-xs font-mono text-accent-teal overflow-x-auto whitespace-pre">
              <code>{codeText}</code>
            </pre>
          );
        } else {
          insideCodeBlock = true;
          codeLang = line.trim().replace('```', '');
          return null;
        }
      }
      if (insideCodeBlock) { codeContent.push(line); return null; }
      if (line.startsWith('### ')) return <h4 key={lineIdx} className="text-sm font-bold text-text-primary mt-3 mb-1">{line.replace('### ', '')}</h4>;
      if (line.startsWith('## ')) return <h3 key={lineIdx} className="text-base font-bold text-text-primary mt-3 mb-1">{line.replace('## ', '')}</h3>;
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <ul key={lineIdx} className="list-disc pl-5 my-1 text-sm text-text-secondary">
            <li>{parseInline(line.trim().substring(2))}</li>
          </ul>
        );
      }
      if (/^\d+\.\s/.test(line.trim())) {
        return (
          <ol key={lineIdx} className="list-decimal pl-5 my-1 text-sm text-text-secondary">
            <li>{parseInline(line.trim().replace(/^\d+\.\s/, ''))}</li>
          </ol>
        );
      }
      if (!line.trim()) return <div key={lineIdx} className="h-2" />;
      return <p key={lineIdx} className="text-sm text-text-secondary leading-relaxed">{parseInline(line)}</p>;
    }).filter(el => el !== null);
  };

  const parseInline = (text: string) => {
    const parts: React.ReactNode[] = [];
    let idx = 0;
    while (idx < text.length) {
      const boldStart = text.indexOf('**', idx);
      const codeStart = text.indexOf('`', idx);
      if (boldStart !== -1 && (codeStart === -1 || boldStart < codeStart)) {
        if (boldStart > idx) parts.push(text.substring(idx, boldStart));
        const boldEnd = text.indexOf('**', boldStart + 2);
        if (boldEnd !== -1) {
          parts.push(<strong key={boldStart} className="text-text-primary font-bold">{text.substring(boldStart + 2, boldEnd)}</strong>);
          idx = boldEnd + 2;
        } else { parts.push(text.substring(boldStart)); idx = text.length; }
      } else if (codeStart !== -1) {
        if (codeStart > idx) parts.push(text.substring(idx, codeStart));
        const codeEnd = text.indexOf('`', codeStart + 1);
        if (codeEnd !== -1) {
          parts.push(<code key={codeStart} className="px-1.5 py-0.5 rounded bg-bg-primary text-xs font-mono text-accent-teal border border-border/60">{text.substring(codeStart + 1, codeEnd)}</code>);
          idx = codeEnd + 1;
        } else { parts.push(text.substring(codeStart)); idx = text.length; }
      } else { parts.push(text.substring(idx)); idx = text.length; }
    }
    return parts;
  };

  const quickActions = getQuickActions();
  const contextLabel = getContextLabel();

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-accent-teal to-accent-purple font-bold flex items-center justify-center shadow-lg shadow-accent-teal/20 transition-transform active:scale-95 duration-200 cursor-pointer relative overflow-hidden group hover:scale-105 border-none"
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
        {/* Unread badge */}
        {hasNewMessage && !isOpen && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-bg-primary animate-bounce" />
        )}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-18 right-0 w-[370px] sm:w-[420px] h-[580px] bg-bg-surface border border-border rounded-2xl flex flex-col shadow-2xl overflow-hidden backdrop-blur-md"
          >
            {/* Decorative blurs */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-teal/10 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent-purple/10 rounded-full filter blur-2xl pointer-events-none" />

            {/* ── Header ────────────────────────────────────────────────── */}
            <header className="px-5 py-4 border-b border-border flex items-center justify-between z-10 bg-bg-surface/60 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accent-teal to-accent-purple flex items-center justify-center shadow shadow-accent-teal/10">
                  <Sparkles className="w-5 h-5 text-text-inverse" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-sm">AI Study Partner</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
                    <span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Gemini Powered</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    onClick={handleClearChat}
                    title="Clear chat"
                    className="p-1.5 hover:bg-bg-primary rounded-lg text-text-secondary hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-bg-primary rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* ── Context Banner ─────────────────────────────────────────── */}
            {contextLabel && (
              <div className="px-5 py-2 bg-accent-teal/5 border-b border-accent-teal/10 text-xs text-text-secondary flex items-center gap-2 shrink-0 z-10">
                <BookOpen className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                <span className="font-semibold">Context:</span>
                <Badge variant="teal" className="text-[9px] uppercase tracking-wider py-0 px-2">{contextLabel}</Badge>
                <span className="ml-auto text-text-secondary/50 font-mono">{pageType}</span>
              </div>
            )}

            {/* ── Messages ───────────────────────────────────────────────── */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 z-10 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {messages.map((msg, idx) => {
                const isAI = msg.role === 'model';
                return (
                  <div key={idx} className={`flex gap-2.5 ${isAI ? 'mr-auto max-w-[90%]' : 'ml-auto flex-row-reverse max-w-[85%]'}`}>
                    {isAI && (
                      <div className="w-7 h-7 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-accent-purple" />
                      </div>
                    )}
                    <div className="space-y-2 w-full">
                      <div className={`relative group p-3.5 rounded-2xl border text-sm space-y-1
                        ${isAI
                          ? 'bg-bg-surface/50 border-border/80 text-text-secondary rounded-tl-none'
                          : 'bg-accent-teal/10 border-accent-teal/20 text-text-primary rounded-tr-none'
                        }`}
                      >
                        {renderMessageText(msg.text)}
                        {/* Copy button */}
                        {isAI && (
                          <button
                            onClick={() => handleCopy(msg.text, idx)}
                            className="absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-bg-primary text-text-secondary hover:text-text-primary transition-all"
                            title="Copy response"
                          >
                            {copiedIdx === idx
                              ? <Check className="w-3 h-3 text-accent-teal" />
                              : <Copy className="w-3 h-3" />
                            }
                          </button>
                        )}
                      </div>

                      {/* Follow-up suggestions */}
                      {isAI && msg.followUps && msg.followUps.length > 0 && idx === messages.length - 1 && !loading && (
                        <div className="flex flex-col gap-1 mt-1">
                          {msg.followUps.map((fu, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => handleSendMessage(fu)}
                              className="flex items-center gap-1.5 text-left text-xs text-text-secondary hover:text-accent-teal border border-border/40 hover:border-accent-teal/30 hover:bg-accent-teal/5 rounded-xl px-3 py-1.5 transition-all cursor-pointer w-full"
                            >
                              <ChevronRight className="w-3 h-3 shrink-0 text-accent-teal" />
                              <span>{fu}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading indicator */}
              {loading && (
                <div className="flex gap-2.5 max-w-[90%] mr-auto">
                  <div className="w-7 h-7 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0 mt-1 animate-pulse">
                    <Bot className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div className="p-4 bg-bg-surface/50 border border-border/80 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-accent-teal animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-accent-teal animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-accent-teal animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-text-secondary/60 italic">
                      {topicTitle ? `Thinking about ${topicTitle}...` : 'Thinking...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Action Chips (Contextual, scrollable) ────────────── */}
            {messages.length <= 2 && !loading && (
              <div className="px-4 py-3 border-t border-border/60 bg-bg-surface/40 z-10 shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary/50 block mb-2">Quick Actions</span>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(action.prompt)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0
                        ${action.color === 'teal'
                          ? 'border-border/40 hover:border-accent-teal/40 hover:bg-accent-teal/5 text-text-secondary hover:text-accent-teal'
                          : 'border-border/40 hover:border-accent-purple/40 hover:bg-accent-purple/5 text-text-secondary hover:text-accent-purple'
                        }`}
                    >
                      <span className={action.color === 'teal' ? 'text-accent-teal' : 'text-accent-purple'}>{action.icon}</span>
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Input Area ─────────────────────────────────────────────── */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(message); }}
              className="p-4 border-t border-border z-10 bg-bg-surface/80 backdrop-blur-sm shrink-0"
            >
              <div className="flex gap-2 items-end">
                <div className="flex-grow relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    maxLength={500}
                    placeholder={
                      topicTitle ? `Ask about ${topicTitle}...`
                      : pageType === 'interview' ? 'Ask an interview question...'
                      : pageType === 'projects' ? 'Ask about projects...'
                      : 'Ask anything about data science...'
                    }
                    className="w-full px-4 py-2.5 text-sm bg-bg-primary border border-border/60 focus:border-accent-teal rounded-xl focus:outline-none placeholder:text-text-secondary/40 text-text-primary pr-12"
                  />
                  {message.length > 400 && (
                    <span className="absolute right-3 bottom-2.5 text-[10px] text-text-secondary/50 font-mono">{message.length}/500</span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!message.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-teal to-accent-purple flex items-center justify-center hover:opacity-95 shadow-md active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer border-none shrink-0"
                >
                  <Send className="w-4 h-4 text-text-inverse" />
                </button>
              </div>
              <p className="text-[10px] text-text-secondary/30 text-center mt-2">Powered by Gemini · Context-aware responses</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
