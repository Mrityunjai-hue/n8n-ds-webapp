import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/layout/AuthModal';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { GlobalSearch } from '@/components/search/GlobalSearch';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'N8N Data Science Community Learning Hub',
  description: 'Free. Structured. Built by students, for students. From SQL to Agentic AI.',
  keywords: ['Data Science', 'Learning', 'SQL', 'Python', 'Machine Learning', 'AI', 'N8N'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable} font-body bg-bg-primary text-text-primary antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-teal focus:text-white focus:rounded-card focus:font-bold"
          >
            Skip to content
          </a>
          
          <Navbar />
          
          <AuthProvider>
            <main id="main-content" className="flex-grow pt-20">
              {children}
            </main>

            <Footer />
            <AuthModal />
            <GlobalSearch />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
