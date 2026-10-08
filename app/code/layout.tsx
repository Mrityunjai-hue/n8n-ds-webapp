import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404-Found-Code | Data Science & SQL Coding Practice',
  description: 'Interactive browser-based SQL coding challenges for data science and data engineering interviews. 155 real interview problems with zero-setup SQLite engine.',
};

export default function CodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[calc(100vh-4rem)] doodle-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </main>
  );
}
