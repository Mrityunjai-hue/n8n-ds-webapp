'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Trophy, 
  Target, 
  Flame, 
  Bookmark, 
  ArrowRight, 
  Clock, 
  BookOpen,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  Database,
  Code2,
  Layout,
  Binary,
  Table,
  BarChart3,
  Cpu,
  Network,
  Bot,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useUserStore } from '@/lib/store/useUserStore';
import { useProgressStore } from '@/lib/store/useProgressStore';
import { getAllSubjects } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useFirebaseAuth } from '@/lib/hooks/useFirebaseAuth';
import { useRecentStore } from '@/lib/store/useRecentStore';
import { useDashboardData } from '@/lib/hooks/useDashboardData';
import { useAchievementStore } from '@/lib/store/useAchievementStore';
import { SettingsModal } from '@/components/dashboard/SettingsModal';

// Map subject IDs to Lucide Icons
const subjectIconMap: Record<string, React.ComponentType<any>> = {
  sql: Database,
  python: Code2,
  bi: Layout,
  numpy: Binary,
  pandas: Table,
  ml: Cpu,
  visualization: BarChart3,
  dl: Network,
  genai: Sparkles,
  agentic: Bot,
};

// Map subject IDs to Tailwind Gradient Border/Text Colors
const subjectColorMap: Record<string, { text: string; border: string; bg: string; stroke: string; gradient: string }> = {
  sql: { text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-500/30 hover:border-blue-500', bg: 'bg-blue-500/10', stroke: 'stroke-blue-600 dark:stroke-blue-500', gradient: 'from-blue-600 to-cyan-600' },
  python: { text: 'text-amber-800 dark:text-yellow-400', border: 'border-amber-500/30 hover:border-amber-500', bg: 'bg-amber-500/10', stroke: 'stroke-amber-600 dark:stroke-yellow-500', gradient: 'from-yellow-500 to-orange-500' },
  bi: { text: 'text-orange-800 dark:text-amber-500', border: 'border-orange-500/30 hover:border-orange-500', bg: 'bg-orange-500/10', stroke: 'stroke-orange-600 dark:stroke-amber-500', gradient: 'from-yellow-600 to-amber-600' },
  numpy: { text: 'text-cyan-800 dark:text-cyan-400', border: 'border-cyan-500/30 hover:border-cyan-500', bg: 'bg-cyan-500/10', stroke: 'stroke-cyan-600 dark:stroke-cyan-400', gradient: 'from-cyan-600 to-teal-600' },
  pandas: { text: 'text-indigo-800 dark:text-indigo-400', border: 'border-indigo-500/30 hover:border-indigo-500', bg: 'bg-indigo-500/10', stroke: 'stroke-indigo-600 dark:stroke-indigo-400', gradient: 'from-indigo-600 to-blue-600' },
  ml: { text: 'text-emerald-800 dark:text-green-400', border: 'border-emerald-500/30 hover:border-emerald-500', bg: 'bg-emerald-500/10', stroke: 'stroke-emerald-600 dark:stroke-green-400', gradient: 'from-green-600 to-emerald-600' },
  visualization: { text: 'text-orange-800 dark:text-orange-400', border: 'border-orange-500/30 hover:border-orange-500', bg: 'bg-orange-500/10', stroke: 'stroke-orange-600 dark:stroke-orange-400', gradient: 'from-orange-600 to-red-600' },
  dl: { text: 'text-purple-800 dark:text-purple-400', border: 'border-purple-500/30 hover:border-purple-500', bg: 'bg-purple-500/10', stroke: 'stroke-purple-600 dark:stroke-purple-400', gradient: 'from-purple-600 to-violet-600' },
  genai: { text: 'text-pink-800 dark:text-pink-400', border: 'border-pink-500/30 hover:border-pink-500', bg: 'bg-pink-500/10', stroke: 'stroke-pink-600 dark:stroke-pink-400', gradient: 'from-pink-600 to-rose-600' },
  agentic: { text: 'text-violet-800 dark:text-violet-400', border: 'border-violet-500/30 hover:border-violet-500', bg: 'bg-violet-500/10', stroke: 'stroke-violet-600 dark:stroke-violet-500', gradient: 'from-violet-600 to-indigo-600' },
};

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useUserStore();
  const { completedTopics, streak, lastVisit } = useProgressStore();
  const { lastTopic } = useRecentStore();
  const { signOut } = useFirebaseAuth();
  const { bookmarkedTopics, isLoading: dashboardLoading } = useDashboardData();
  const { unlockAchievement } = useAchievementStore();
  const router = useRouter();
  const [greeting, setGreeting] = useState('Welcome back');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const allSubjects = getAllSubjects();
  const completedTopicsCount = completedTopics.length;

  useEffect(() => {
    if (completedTopicsCount >= 1) unlockAchievement('genesis');
    if (streak >= 3) unlockAchievement('consistency');
    if (completedTopicsCount >= 15) unlockAchievement('polymath');
    
    const sqlSubj = allSubjects.find(s => s.id === 'sql');
    if (sqlSubj && sqlSubj.topics.every(t => completedTopics.includes(t.id))) {
      unlockAchievement('sql_commander');
    }
    const pySubj = allSubjects.find(s => s.id === 'python');
    if (pySubj && pySubj.topics.every(t => completedTopics.includes(t.id))) {
      unlockAchievement('pythonic');
    }
    const aiSubjectIds = ['ml', 'dl', 'genai', 'agentic'];
    const hasAITopic = allSubjects
      .filter(s => aiSubjectIds.includes(s.id))
      .some(s => s.topics.some(t => completedTopics.includes(t.id)));
    if (hasAITopic) {
      unlockAchievement('ai_vanguard');
    }
  }, [completedTopicsCount, streak, completedTopics, allSubjects, unlockAchievement]);

  if (authLoading) return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center doodle-canvas">
      <div className="w-12 h-12 border-4 border-[var(--canvas-border)] border-t-[var(--blue)] rounded-full animate-spin" />
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen doodle-canvas flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl p-8 text-center space-y-6 doodle-card shadow-[var(--shadow-md)]">
          <div className="w-16 h-16 rounded-full bg-[var(--blue-tint)] text-[var(--blue)] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-bold text-[var(--ink)]">Access Restricted</h1>
          <p className="text-[var(--ink-2)] text-sm font-body">Please sign in to access your personal AI learning command center.</p>
          <Link href="/">
            <Button className="w-full py-3 bg-[var(--blue)] text-white hover:bg-[var(--blue-dim)]">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalTopicsCount = allSubjects.reduce((acc, s) => acc + s.topics.length, 0);
  const overallProgress = totalTopicsCount > 0 ? Math.round((completedTopicsCount / totalTopicsCount) * 100) : 0;
  
  // Calculate total and completed questions
  const totalQuestionsCount = allSubjects.reduce((acc, s) => {
    return acc + s.topics.reduce((sum, t) => sum + (t.interviewQuestions?.length || 0), 0);
  }, 0);
  
  const completedQuestionsCount = allSubjects.reduce((acc, s) => {
    return acc + s.topics.reduce((sum, t) => {
      if (completedTopics.includes(t.id)) {
        return sum + (t.interviewQuestions?.length || 0);
      }
      return sum;
    }, 0);
  }, 0);

  // Smart Recommender Algorithm
  let recommendedTopic: any = null;
  let recommendedSubject: any = null;
  
  // Look through subjects in level order to find the first incomplete topic
  for (const subj of allSubjects) {
    const incomplete = subj.topics.find(t => !completedTopics.includes(t.id));
    if (incomplete) {
      recommendedTopic = incomplete;
      recommendedSubject = subj;
      break;
    }
  }

  // Activity Heatmap: compute last 7 days of activity based on streak & lastVisit
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

  const isDateActive = (date: Date) => {
    if (!lastVisit || streak === 0) return false;
    const visitDate = new Date(lastVisit);
    
    // Normalize dates to midnight for accurate calculation
    const dMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const visitMidnight = new Date(visitDate.getFullYear(), visitDate.getMonth(), visitDate.getDate());
    visitMidnight.setHours(0, 0, 0, 0);
    const visitTime = visitMidnight.getTime();
    
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((visitTime - dMidnight) / oneDay);
    
    return diffDays >= 0 && diffDays < streak;
  };

  // Achievements Definition
  const achievements = [
    {
      id: 'genesis',
      title: 'Genesis',
      description: 'Mastered your first topic',
      icon: Trophy,
      unlocked: completedTopicsCount >= 1,
      color: 'from-teal-500 to-emerald-500',
    },
    {
      id: 'consistency',
      title: 'Tri-Burner',
      description: 'Achieved a 3-day learning streak',
      icon: Flame,
      unlocked: streak >= 3,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'sql_commander',
      title: 'SQL Commander',
      description: 'Completed the SQL curriculum',
      icon: Database,
      unlocked: (() => {
        const sqlSubj = allSubjects.find(s => s.id === 'sql');
        return !!sqlSubj && sqlSubj.topics.every(t => completedTopics.includes(t.id));
      })(),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'pythonic',
      title: 'Pythonic',
      description: 'Completed the Python curriculum',
      icon: Code2,
      unlocked: (() => {
        const pySubj = allSubjects.find(s => s.id === 'python');
        return !!pySubj && pySubj.topics.every(t => completedTopics.includes(t.id));
      })(),
      color: 'from-yellow-500 to-amber-600',
    },
    {
      id: 'ai_vanguard',
      title: 'AI Vanguard',
      description: 'Mastered your first AI or ML topic',
      icon: Sparkles,
      unlocked: (() => {
        const aiSubjectIds = ['ml', 'dl', 'genai', 'agentic'];
        return allSubjects
          .filter(s => aiSubjectIds.includes(s.id))
          .some(s => s.topics.some(t => completedTopics.includes(t.id)));
      })(),
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'polymath',
      title: 'DS Polymath',
      description: 'Mastered 15+ topics across curriculum',
      icon: Target,
      unlocked: completedTopicsCount >= 15,
      color: 'from-indigo-500 to-violet-600',
    },
  ];

  // Stats Grid data
  const stats = [
    { 
      label: 'Topics Mastered', 
      value: `${completedTopicsCount} / ${totalTopicsCount}`, 
      icon: Trophy, 
      color: 'text-accent-teal bg-accent-teal/10 border-accent-teal/20',
      description: `${overallProgress}% total progress`
    },
    { 
      label: 'Day Streak', 
      value: `${streak} Days`, 
      icon: Flame, 
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
      description: streak > 0 ? 'Keep the streak alive!' : 'Start studying today!'
    },
    { 
      label: 'Estimated Study Time', 
      value: `${(completedTopicsCount * 0.5).toFixed(1)} Hrs`, 
      icon: Clock, 
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: 'Time spent in labs'
    },
    { 
      label: 'Interview Readiness', 
      value: `${completedQuestionsCount} Qs`, 
      icon: Target, 
      color: 'text-accent-amber bg-accent-amber/10 border-accent-amber/20',
      description: `Out of ${totalQuestionsCount} questions`
    },
  ];

  return (
    <div className="min-h-screen doodle-canvas py-12 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Command Center Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--canvas-border)]">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] p-[2px] shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-2xl bg-[var(--yellow)] flex items-center justify-center text-[#111111] text-3xl font-display font-bold">
                {user.displayName?.[0] || 'S'}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-[var(--ink)] break-words">
                {greeting}, <span className="text-[var(--blue)] inline-block">{user.displayName?.split(' ')[0] || 'Student'}</span>!
              </h1>
              <p className="text-[var(--ink-2)] mt-1 break-words font-body">Learning Operating System is online. Ready to build skills?</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2 border-[var(--canvas-border)] bg-[var(--canvas-raised)] text-[var(--ink)] hover:bg-[var(--canvas-sunken)]" onClick={() => signOut()}>
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
            <Button 
              className="gap-2 bg-[var(--blue)] text-white hover:bg-[var(--blue-dim)] border-none shadow-[var(--shadow-sm)]"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="w-4 h-4" /> Settings
            </Button>
          </div>
        </header>

        {/* Dynamic Stats Grid */}
        {/* Dynamic Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="p-6 flex flex-col justify-between group hover:border-[var(--blue)] transition-all duration-300 relative overflow-hidden bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] doodle-card shadow-[var(--shadow-sm)]">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl border ${stat.color} shrink-0`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-3)] font-mono">{stat.label}</div>
                  <div className="text-2xl font-display font-bold text-[var(--ink)] mt-0.5">{stat.value}</div>
                </div>
              </div>
              <div className="text-xs text-[var(--ink-3)] border-t border-[var(--canvas-border)] pt-3 font-body">{stat.description}</div>
            </Card>
          ))}
        </section>

        {/* Main Columns */}
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Main Dashboard Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Intelligent Recommender & Streak */}
            <section className="space-y-6">
              <h2 className="text-2xl font-display font-bold flex items-center gap-3 text-[var(--ink)]">
                <Sparkles className="w-6 h-6 text-[var(--yellow)]" /> 
                Next Learning Objective
              </h2>
              
              {recommendedTopic ? (
                <div className="bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-[var(--blue)] transition-all duration-300 relative overflow-hidden doodle-card shadow-[var(--shadow-md)]">
                  <div className="flex-grow z-10 text-center md:text-left space-y-4">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                      <Badge variant="teal">Recommended Next</Badge>
                      <span className="text-xs font-bold text-[var(--ink-3)] uppercase tracking-wider font-mono">{recommendedSubject?.name}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--blue)] transition-colors duration-200 break-words font-heading">{recommendedTopic.title}</h3>
                      <p className="text-[var(--ink-2)] text-sm max-w-md mt-2 leading-relaxed break-words font-body">{recommendedTopic.description}</p>
                    </div>
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <Link href={`/learn/${recommendedSubject?.slug}/${recommendedTopic.slug}`}>
                        <Button className="gap-2 px-8 bg-[var(--blue)] text-white hover:bg-[var(--blue-dim)] border-none shadow-[var(--shadow-sm)] font-mono">
                          Start Lesson <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      {lastTopic && (
                        <Link href={`/learn/${lastTopic.subjectSlug}/${lastTopic.topicSlug}`}>
                          <Button variant="secondary" className="gap-2 border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--ink)] hover:bg-[var(--canvas)] font-mono">
                            Resume: {lastTopic.topicTitle.length > 18 ? lastTopic.topicTitle.substring(0, 15) + '...' : lastTopic.topicTitle}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Active Streak Tracker Panel */}
                  <div className="w-full md:w-56 space-y-4 z-10 bg-[var(--canvas-sunken)] p-5 rounded-2xl border-2 border-[var(--canvas-border)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ink-3)] font-mono">7-Day Streak</span>
                      <Flame className="w-4 h-4 text-orange-500 fill-current" />
                    </div>
                    
                    {/* Horizontal 7-day grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {last7Days.map((date, idx) => {
                        const active = isDateActive(date);
                        const isToday = date.toDateString() === today.toDateString();
                        const dayLabel = date.toLocaleDateString('en-US', { weekday: 'narrow' });
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1.5">
                            <div 
                              className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold border transition-all duration-300
                                ${active 
                                  ? 'bg-[var(--yellow)] text-[#111111] border-black/20 font-extrabold shadow-sm' 
                                  : isToday 
                                    ? 'bg-[var(--canvas-raised)] border-[var(--blue)] text-[var(--blue)] animate-pulse' 
                                    : 'bg-[var(--canvas-raised)] border-[var(--canvas-border)] text-[var(--ink-4)]'
                                }
                              `}
                              title={`${date.toLocaleDateString()}: ${active ? 'Active' : 'Inactive'}`}
                            >
                              {dayLabel}
                            </div>
                            <span className="text-[9px] font-mono text-[var(--ink-3)]">{date.getDate()}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-[10px] text-[var(--ink-3)] leading-relaxed text-center font-body">
                      {streak > 0 
                        ? `You are on a ${streak}-day streak! Keep checking in.` 
                        : 'Study a topic today to start your streak.'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] border-dashed rounded-2xl p-12 text-center space-y-6 doodle-card">
                  <div className="w-16 h-16 rounded-full bg-[var(--green-tint)] text-[var(--green)] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[var(--ink)] font-heading">Curriculum Mastered!</h3>
                    <p className="text-[var(--ink-2)] text-sm max-w-md mx-auto font-body">You have completed all topics. Prepare for interviews, build projects, or review concepts.</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Link href="/interview">
                      <Button className="gap-2 bg-[var(--blue)] text-white hover:bg-[var(--blue-dim)]">Interview Hub <ArrowRight className="w-4 h-4" /></Button>
                    </Link>
                    <Link href="/projects">
                      <Button variant="secondary" className="gap-2 border-[var(--canvas-border)] bg-[var(--canvas-sunken)] text-[var(--ink)]">Project Lab</Button>
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* Subject Mastery List (All 10 Subjects) */}
            <section className="space-y-6">
              <h2 className="text-2xl font-display font-bold text-[var(--ink)]">Curriculum Progression</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {allSubjects.map((subject) => {
                  const subjectTopics = subject.topics || [];
                  const subjectCompleted = subjectTopics.filter(t => completedTopics.includes(t.id)).length;
                  const subjectPercent = subjectTopics.length > 0 ? Math.round((subjectCompleted / subjectTopics.length) * 100) : 0;
                  
                  const colors = subjectColorMap[subject.id] || { 
                    text: 'text-[var(--ink-2)]', 
                    border: 'border-[var(--canvas-border)] hover:border-[var(--blue)]', 
                    bg: 'bg-[var(--canvas-sunken)]', 
                    stroke: 'stroke-[var(--blue)]', 
                    gradient: 'from-blue-600 to-indigo-600' 
                  };
                  const Icon = subjectIconMap[subject.id] || BookOpen;

                  return (
                    <Link key={subject.id} href={`/learn/${subject.slug}`} className="block">
                      <Card className={`p-5 flex items-center justify-between group transition-all duration-300 cursor-pointer bg-[var(--canvas-raised)] border-2 border-[var(--canvas-border)] doodle-card hover:border-[var(--blue)]`}>
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl border border-[var(--canvas-border)] transition-all duration-300 ${colors.text} ${colors.bg} group-hover:scale-105`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[var(--ink)] text-sm group-hover:text-[var(--blue)] transition-colors duration-200 font-heading">{subject.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-[var(--ink-3)] mt-1 font-mono">
                              <span>{subjectCompleted} / {subjectTopics.length} Topics</span>
                            </div>
                          </div>
                        </div>

                        {/* Circular Progress Ring */}
                        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="24"
                              cy="24"
                              r="18"
                              className="stroke-border/40"
                              strokeWidth="3"
                              fill="transparent"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="18"
                              className={colors.stroke}
                              strokeWidth="3.5"
                              fill="transparent"
                              strokeDasharray={2 * Math.PI * 18}
                              strokeDashoffset={2 * Math.PI * 18 * (1 - subjectPercent / 100)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute text-[10px] font-mono font-bold text-text-primary">
                            {subjectPercent}%
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar Dashboard Column */}
          <div className="space-y-10">
            
            {/* Bookmarks Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">Bookmarks</h2>
                <Link href="/roadmap" className="text-xs font-bold text-accent-teal hover:underline tracking-wider">
                  View Roadmap
                </Link>
              </div>
              <div className="space-y-3">
                {dashboardLoading ? (
                  <div className="text-sm text-text-secondary italic">Loading bookmarked lessons...</div>
                ) : bookmarkedTopics.length > 0 ? (
                  bookmarkedTopics.slice(0, 5).map((topic) => {
                    // Try to find subject details
                    let topicSubject = allSubjects.find(s => s.topics.some(t => t.id === topic.id));
                    return (
                      <Link key={topic.id} href={`/learn/${topicSubject?.slug || 'sql'}/${topic.slug}`} className="block">
                        <Card className="p-4 flex items-center justify-between group cursor-pointer hover:border-accent-teal/40 bg-bg-surface/30 backdrop-blur-sm border-border/40 transition-all duration-300">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-accent-amber/10 flex items-center justify-center text-accent-amber border border-accent-amber/20 shrink-0">
                              <Bookmark className="w-4.5 h-4.5 fill-current" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-bold group-hover:text-accent-teal transition-colors duration-200 truncate">{topic.title}</div>
                              <div className="text-[9px] uppercase tracking-wider text-text-secondary/70 font-bold mt-0.5">{topicSubject?.name || 'Topic'}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-text-secondary/40 group-hover:text-accent-teal transition-colors shrink-0" />
                        </Card>
                      </Link>
                    );
                  })
                ) : (
                  <div className="text-center py-10 border border-dashed border-border/40 rounded-2xl bg-bg-surface/10">
                    <Bookmark className="w-8 h-8 text-text-secondary/30 mx-auto mb-3" />
                    <p className="text-xs text-text-secondary leading-relaxed max-w-[200px] mx-auto">Study topic pages and click the ribbon icon to save bookmarks here.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Achievement Badges Grid */}
            <section className="space-y-6">
              <h2 className="text-2xl font-display font-bold">Milestones & Badges</h2>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div 
                      key={badge.id}
                      className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all duration-300 relative overflow-hidden group
                        ${badge.unlocked 
                          ? `bg-bg-surface/30 border-accent-teal/20 hover:border-accent-teal/50 shadow-md shadow-accent-teal/5` 
                          : 'bg-bg-surface/15 border-border/20 opacity-40 select-none grayscale'
                        }
                      `}
                      title={badge.description}
                    >
                      {/* Active glow inside unlocked badge */}
                      {badge.unlocked && (
                        <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${badge.color} opacity-5 rounded-full filter blur-xl group-hover:opacity-10 transition-opacity`} />
                      )}

                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 relative z-10
                          ${badge.unlocked 
                            ? `bg-gradient-to-br ${badge.color} text-[#030712] shadow-lg shadow-accent-teal/10` 
                            : 'bg-bg-surface/40 text-text-secondary/40 border border-border/20'
                          }
                        `}>
                          <Icon className="w-6 h-6" />
                        </div>
                        {!badge.unlocked && (
                          <div className="absolute -bottom-1 -right-1 bg-bg-surface border border-border/40 rounded-full p-1 z-20">
                            <Lock className="w-2.5 h-2.5 text-text-secondary/60" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-bold text-text-primary">{badge.title}</div>
                        <div className="text-[9px] text-text-secondary/80 leading-snug line-clamp-2">{badge.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
}
