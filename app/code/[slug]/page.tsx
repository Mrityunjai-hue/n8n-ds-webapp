import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ALL_PROBLEMS, getProblemBySlug } from '@/lib/code/data/problems';
import { ProblemWorkspace } from '@/components/code/ide/ProblemWorkspace';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return ALL_PROBLEMS.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const problem = getProblemBySlug(params.slug);
  if (!problem) {
    return {
      title: 'Problem Not Found | 404-Found-Code',
    };
  }

  return {
    title: `${problem.title} (${problem.id.toUpperCase()}) | 404-Found-Code`,
    description: `Solve ${problem.title} SQL challenge with live browser SQLite engine. Sourced from ${problem.source.platform}.`,
  };
}

export default function ProblemDetailPage({ params }: PageProps) {
  const problem = getProblemBySlug(params.slug);

  if (!problem) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="text-6xl">📜</div>
        <div className="p-2 px-3 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-raised)] text-xs font-mono text-[var(--ink-3)]">
          404 &bull; Challenge Missing
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold font-heading"
          style={{ color: 'var(--ink)' }}
        >
          Problem Not Found
        </h1>
        <p className="text-sm font-mono text-[var(--ink-2)] max-w-md">
          The challenge &quot;{params.slug}&quot; could not be located in the 404-Found-Code archive.
        </p>
        <Link
          href="/code"
          className="btn-primary px-5 py-2.5 rounded-xl text-sm font-mono font-bold inline-flex items-center gap-2 mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Problem Bank</span>
        </Link>
      </div>
    );
  }

  // Determine next problem slug
  const currentIndex = ALL_PROBLEMS.findIndex((p) => p.id === problem.id || p.slug === problem.slug);
  const nextProblem = currentIndex >= 0 && currentIndex < ALL_PROBLEMS.length - 1
    ? ALL_PROBLEMS[currentIndex + 1]
    : undefined;

  return (
    <ProblemWorkspace
      problem={problem}
      nextProblemSlug={nextProblem?.slug}
    />
  );
}
