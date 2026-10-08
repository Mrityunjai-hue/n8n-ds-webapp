import type { Metadata } from 'next';
import { Caveat, Patrick_Hand, Fragment_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthModal } from '@/components/layout/AuthModal';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { GlobalSearch } from '@/components/search/GlobalSearch';
import { ButtonAnimations } from '@/components/layout/ButtonAnimations';
import { SplashScreenWrapper } from '@/components/layout/SplashScreenWrapper';

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  variable: '--font-patrick-hand',
  weight: ['400'],
  display: 'swap',
});

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  variable: '--font-fragment-mono',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '404 Found — Data Science Learning Hub & Practice Platform',
  description: 'Free. Structured. We were not found — until now. From SQL to Agentic AI.',
  keywords: ['Data Science', 'Learning', 'SQL', 'Python', 'Machine Learning', 'AI', '404 Found'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1a0a2e' },
    { media: '(prefers-color-scheme: light)', color: '#f5f0e8' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${patrickHand.variable} ${fragmentMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${caveat.variable} ${patrickHand.variable} ${fragmentMono.variable} antialiased min-h-screen flex flex-col doodle-canvas`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={true}
        >
          <SplashScreenWrapper>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-card focus:font-bold border border-[var(--canvas-border)] shadow-[var(--shadow-md)]"
              style={{ backgroundColor: 'var(--yellow)', color: 'var(--ink)' }}
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

            <ButtonAnimations />
          </SplashScreenWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
