'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-2 w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-card bg-bg-surface border border-border hover:bg-bg-elevated transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-accent-amber" />
      ) : (
        <Moon className="w-5 h-5 text-accent-blue" />
      )}
    </button>
  );
};
