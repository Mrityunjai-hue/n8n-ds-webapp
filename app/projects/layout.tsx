import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects Lab | 404 Found',
  description: 'Industry-grade data science projects modelled on real problems. Learn by doing.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
