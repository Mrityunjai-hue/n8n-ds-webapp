'use client';

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 200); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-danger" />,
    info: <Info className="w-5 h-5 text-accent-blue" />,
  };

  const backgrounds = {
    success: 'border-success/20 bg-success/10',
    error: 'border-danger/20 bg-danger/10',
    info: 'border-accent-blue/20 bg-accent-blue/10',
  };

  return (
    <div className={`
      fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-card border shadow-lg
      animate-slide-up transition-opacity duration-200
      ${backgrounds[type]} ${isVisible ? 'opacity-100' : 'opacity-0'}
    `}>
      {icons[type]}
      <span className="text-sm font-bold text-text-primary">{message}</span>
      <button onClick={() => setIsVisible(false)} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4 text-text-secondary" />
      </button>
    </div>
  );
};
