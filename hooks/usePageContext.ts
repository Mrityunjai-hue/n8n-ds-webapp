'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { subjects } from '@/lib/content/subjects';

export interface PageContext {
  currentSubject: string | null;
  currentSubjectSlug: string | null;
  currentTopic: string | null;
  currentTopicSlug: string | null;
  topicContent: string | null;
  isOnLesson: boolean;
  pageType: 'home' | 'subject' | 'topic' | 'projects' | 'interview' | 'dashboard' | 'other';
}

export function usePageContext(): PageContext {
  const pathname = usePathname();

  return useMemo(() => {
    // Detect page type from pathname
    const pageType = (() => {
      if (pathname === '/') return 'home';
      if (pathname.startsWith('/dashboard')) return 'dashboard';
      if (pathname.startsWith('/projects')) return 'projects';
      if (pathname.startsWith('/interview')) return 'interview';
      if (pathname.match(/^\/learn\/[^/]+\/[^/]+/)) return 'topic';
      if (pathname.match(/^\/learn\/[^/]+/)) return 'subject';
      return 'other';
    })();

    // Match /learn/[subject]/[topic]
    const match = pathname.match(/^\/learn\/([^/]+)(?:\/([^/]+))?/);
    if (!match) {
      return {
        currentSubject: null,
        currentSubjectSlug: null,
        currentTopic: null,
        currentTopicSlug: null,
        topicContent: null,
        isOnLesson: false,
        pageType,
      };
    }

    const subjectSlug = match[1];
    const topicSlug = match[2] ?? null;

    const subject = subjects.find(s => s.slug === subjectSlug);
    if (!subject) {
      return {
        currentSubject: null,
        currentSubjectSlug: subjectSlug,
        currentTopic: null,
        currentTopicSlug: topicSlug,
        topicContent: null,
        isOnLesson: true,
        pageType,
      };
    }

    const topic = topicSlug
      ? subject.topics.find(t => t.slug === topicSlug)
      : subject.topics[0];

    // Build a condensed text summary of the topic for the AI
    let topicContent: string | null = null;
    if (topic?.sections) {
      const s = topic.sections as Record<string, unknown>;
      const parts: string[] = [];

      const what = s.what as { text?: string; eli5?: string; points?: string[] } | undefined;
      const why = s.why as { text?: string; tip?: string } | undefined;
      const proTip = s.proTip as { title?: string; text?: string } | undefined;
      const warning = s.warning as { title?: string; text?: string } | undefined;
      const keyPoints = s.keyPoints as { points?: string[] } | undefined;

      if (what?.text) parts.push(`CONCEPT: ${what.text.slice(0, 500)}`);
      if (what?.eli5) parts.push(`SIMPLE EXPLANATION: ${what.eli5}`);
      if (what?.points?.length) parts.push(`KEY POINTS: ${what.points.join(' | ')}`);
      if (why?.text) parts.push(`WHY IT MATTERS: ${why.text.slice(0, 300)}`);
      if (why?.tip) parts.push(`PRO TIP: ${why.tip}`);
      if (proTip?.text) parts.push(`ADVANCED TIP: ${proTip.text}`);
      if (warning?.text) parts.push(`COMMON MISTAKE: ${warning.text}`);
      if (keyPoints?.points?.length) parts.push(`SUMMARY POINTS: ${keyPoints.points.join(' | ')}`);

      topicContent = parts.length > 0 ? parts.join('\n\n') : null;
    }

    return {
      currentSubject: subject.name,
      currentSubjectSlug: subjectSlug,
      currentTopic: topic?.title ?? null,
      currentTopicSlug: topicSlug,
      topicContent,
      isOnLesson: !!topicSlug,
      pageType,
    };
  }, [pathname]);
}
