'use client';

import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export const SplashScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("404found_loaded") === "1";
    }
    return false;
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("404found_loaded", "1");
    setLoaded(true);
  };

  // Avoid hydration mismatch by rendering canvas background until mounted
  if (!mounted) {
    return <div className="invisible h-screen w-screen bg-[var(--canvas,#f5f0e8)]" />;
  }

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleComplete} />}
      <div 
        style={{ 
          opacity: loaded ? 1 : 0, 
          transition: 'opacity 0.4s ease',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          pointerEvents: loaded ? 'auto' : 'none'
        }}
      >
        {children}
      </div>
    </>
  );
};
