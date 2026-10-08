'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-raised)]" />;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDark = currentTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-8 h-8 rounded-full border border-[var(--canvas-border)] bg-[var(--canvas-raised)] hover:bg-[var(--canvas-sunken)] flex items-center justify-center text-[var(--ink)] transition-colors shadow-[var(--shadow-sm)]"
      aria-label={isDark ? "Switch to daylight notebook" : "Switch to night notebook"}
      title={isDark ? "Switch to daylight notebook (Light mode)" : "Switch to night notebook (Dark mode)"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--yellow)] animate-in fade-in duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--blue)] animate-in fade-in duration-200" />
      )}
    </button>
  );
};
