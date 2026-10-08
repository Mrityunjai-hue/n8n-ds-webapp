'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CosmicButtonProps extends Omit<HTMLMotionProps<"button">, 'size'> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isCompleted?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const CosmicButton = React.forwardRef<HTMLButtonElement, CosmicButtonProps>(
  ({ className = '', children, icon, isCompleted, disabled, onClick, size = 'md', isLoading, ...props }, ref) => {
    
    // Determine inner padding and font size based on size prop
    const sizeClasses = {
      sm: 'py-2 px-4 text-xs rounded-xl',
      md: 'py-3.5 px-8 text-base rounded-2xl',
      lg: 'py-4 px-10 text-lg rounded-2xl'
    }[size];

    return (
      <motion.button 
        ref={ref}
        onClick={onClick}
        disabled={disabled || isLoading}
        whileHover={(disabled || isLoading) ? {} : { scale: 1.02, translateY: -1 }}
        whileTap={(disabled || isLoading) ? {} : { scale: 0.98, translateY: 0 }}
        className={`relative group overflow-hidden rounded-xl border border-[var(--canvas-border)] bg-[var(--blue)] text-white font-bold transition-all duration-200 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        style={{ fontFamily: 'var(--font-body)' }}
        {...props}
      >
        <div className={`relative flex items-center justify-center gap-2 sm:gap-3 w-full h-full ${sizeClasses}`}>
          {/* Loading spinner */}
          {isLoading && (
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <span className={`text-white font-medium ${size === 'sm' ? 'text-xs' : 'text-base'}`}>
            {children}
          </span> 
          
          {icon && !(disabled || isLoading) && (
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {icon}
            </motion.div>
          )}
          {icon && (disabled || isLoading) && (
             <div>{icon}</div>
          )}
        </div>
      </motion.button>
    );
  }
);

CosmicButton.displayName = 'CosmicButton';
