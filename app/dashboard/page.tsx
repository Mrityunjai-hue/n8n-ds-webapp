'use client';

import React from 'react';
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
  Database
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

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useUserStore();
  const { completedTopics } = useProgressStore();
  const { lastTopic } = useRecentStore();
  const { signOut } = useFirebaseAuth();
  const { bookmarkedTopics, isLoading: dashboardLoading } = useDashboardData();
  const router = useRouter();

  if (authLoading) return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent-teal/30 border-t-accent-teal rounded-full animate-spin" />
    </div>
  );

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">Please sign in to view your dashboard</h1>
        <Button onClick={() => router.push('/')}>Go Home</Button>
      </div>
    );
  }

  const subjects = getAllSubjects();
  const totalTopicsCount = subjects.reduce((acc, s) => acc + s.topics.length, 0);
  const overallProgress = Math.round((completedTopics.length / totalTopicsCount) * 100);

  // Stats for the grid
  const stats = [
    { label: 'Topics Mastered', value: completedTopics.length, icon: Trophy, color: 'text-accent-teal' },
    { label: 'Total Progress', value: `${overallProgress}%`, icon: Target, color: 'text-accent-amber' },
    { label: 'Day Streak', value: '5', icon: Flame, color: 'text-orange-500' },
    { label: 'Learning Hours', value: Math.round(completedTopics.length * 0.5), icon: Clock, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-teal to-accent-blue flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              {user.displayName?.[0] || 'S'}
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold tracking-tight">
                Welcome back, <span className="text-accent-teal">{user.displayName?.split(' ')[0] || 'Student'}</span>!
              </h1>
              <p className="text-text-secondary mt-1">You've mastered {completedTopics.length} topics so far. Keep the momentum going!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2" onClick={() => signOut()}>
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
            <Button className="gap-2">
              <Settings className="w-4 h-4" /> Settings
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="p-6 flex flex-col items-center text-center group hover:border-accent-teal transition-all">
              <div className={`p-3 rounded-xl bg-bg-surface border border-border mb-4 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl font-display font-bold">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mt-1">{stat.label}</div>
            </Card>
          ))}
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Dashboard Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Continue Learning CTA */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-accent-amber" /> 
                Continue Learning
              </h2>
              {lastTopic ? (
                <div className="bg-bg-surface border border-border rounded-modal p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-accent-teal transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Database className="w-32 h-32" />
                  </div>
                  <div className="flex-grow z-10 text-center md:text-left">
                    <Badge variant="teal" className="mb-4">Most Recent</Badge>
                    <h3 className="text-2xl font-bold mb-2">{lastTopic.topicTitle}</h3>
                    <p className="text-text-secondary max-w-md mb-6">Pick up where you left off in the {lastTopic.subjectSlug.toUpperCase()} module.</p>
                    <Link href={`/learn/${lastTopic.subjectSlug}/${lastTopic.topicSlug}`}>
                      <Button className="gap-2 px-8">
                        Resume Lesson <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="w-full md:w-48 space-y-4 z-10 bg-bg-primary/50 p-4 rounded-xl border border-border">
                    <div className="text-xs font-bold uppercase tracking-widest text-text-secondary">Ready to continue?</div>
                    <ProgressBar progress={10} />
                    <div className="text-[10px] text-text-secondary">Your progress is being tracked.</div>
                  </div>
                </div>
              ) : (
                <div className="bg-bg-surface border border-border border-dashed rounded-modal p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-bg-primary border border-border flex items-center justify-center text-text-secondary mx-auto mb-6">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Ready to start your journey?</h3>
                  <p className="text-text-secondary mb-8 max-w-md mx-auto">Explore our roadmap and start mastering SQL, Python, and AI today.</p>
                  <Link href="/roadmap">
                    <Button className="gap-2">Explore Roadmap <ArrowRight className="w-4 h-4" /></Button>
                  </Link>
                </div>
              )}
            </section>

            {/* Subject Mastery List */}
            <section>
              <h2 className="text-2xl font-display font-bold mb-6">Subject Mastery</h2>
              <div className="grid gap-4">
                {subjects.slice(0, 3).map((subject) => {
                  const subProgress = Math.round((subject.topics.filter(t => completedTopics.includes(t.id)).length / subject.topics.length) * 100) || 0;
                  return (
                    <div key={subject.id} onClick={() => router.push(`/learn/${subject.slug}`)}>
                      <Card className="p-5 flex items-center justify-between group hover:border-accent-teal transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-bg-surface border border-border text-text-secondary group-hover:text-accent-teal transition-colors">
                            <subject.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold">{subject.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                              <BookOpen className="w-3 h-3" /> {subject.topics.length} Topics
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="hidden md:block w-32 space-y-1.5">
                            <ProgressBar progress={subProgress} size="sm" />
                            <div className="text-[10px] text-right font-bold text-text-secondary">{subProgress}%</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-accent-teal transition-colors" />
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar Dashboard Column */}
          <div className="space-y-12">
            {/* Bookmarks Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Bookmarks</h2>
                <Link href="/bookmarks" className="text-xs font-bold text-accent-teal hover:underline uppercase tracking-widest">View All</Link>
              </div>
              <div className="space-y-3">
                {dashboardLoading ? (
                  <div className="text-sm text-text-secondary">Loading bookmarks...</div>
                ) : bookmarkedTopics.length > 0 ? (
                  bookmarkedTopics.slice(0, 5).map((topic) => (
                    <div key={topic.id} onClick={() => router.push(`/learn/sql/${topic.slug}`)}>
                      <Card className="p-4 flex items-center gap-4 group cursor-pointer hover:border-accent-teal transition-all">
                        <div className="w-10 h-10 rounded-lg bg-bg-surface flex items-center justify-center text-accent-amber border border-border">
                          <Bookmark className="w-5 h-5 fill-current" />
                        </div>
                        <div className="flex-grow">
                          <div className="text-sm font-bold group-hover:text-accent-teal transition-colors truncate max-w-[150px]">{topic.title}</div>
                          <div className="text-[10px] uppercase tracking-widest text-text-secondary">Topic</div>
                        </div>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 border border-dashed border-border rounded-xl">
                    <p className="text-xs text-text-secondary italic">Save more topics to see them here.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Upcoming Challenges/Community */}
            <section className="bg-accent-teal/5 border border-accent-teal/20 rounded-modal p-6">
              <h3 className="font-display font-bold text-accent-teal mb-2 flex items-center gap-2">
                <Flame className="w-5 h-5" /> Active Challenges
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                Complete 3 SQL lessons this week to earn the <strong>Query Master</strong> badge.
              </p>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold">Progress</span>
                <span className="text-accent-teal font-bold">1/3</span>
              </div>
              <ProgressBar progress={33} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
