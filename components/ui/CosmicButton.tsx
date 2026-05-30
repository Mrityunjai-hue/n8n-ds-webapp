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
        whileHover={(disabled || isLoading) ? {} : { scale: 1.02 }}
        whileTap={(disabled || isLoading) ? {} : { scale: 0.98 }}
        className={`relative group overflow-hidden rounded-2xl p-[2px] transition-all duration-300 shadow-[0_0_30px_rgba(45,212,191,0.1)] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[0_0_30px_rgba(45,212,191,0.1)] ${className}`}
        {...props}
      >
        {/* Spinning comet tail 1 */}
        {!(disabled || isLoading) && (
          <motion.div 
            className="absolute inset-[-100%] w-[300%] h-[300%] bg-[conic-gradient(from_0deg,transparent_70%,#2dd4bf_100%)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
        {/* Spinning comet tail 2 */}
        {!(disabled || isLoading) && (
          <motion.div 
            className="absolute inset-[-100%] w-[300%] h-[300%] bg-[conic-gradient(from_180deg,transparent_70%,#a78bfa_100%)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Inner core */}
        <div className={`relative flex items-center justify-center gap-2 sm:gap-3 bg-[#050b14] transition-colors duration-500 text-white font-extrabold w-full h-full ${sizeClasses} ${!(disabled || isLoading) ? 'hover:bg-[#08101f]' : ''}`}>
          {/* Loading spinner */}
          {isLoading && (
            <svg className="animate-spin h-4 w-4 text-accent-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          <span className={`bg-gradient-to-r bg-clip-text text-transparent ${size === 'sm' ? 'text-xs' : 'text-base'} ${isCompleted ? 'from-[#2dd4bf] to-[#a78bfa]' : 'from-white to-[#cbd5e1]'}`}>
            {children}
          </span> 
          
          {icon && !(disabled || isLoading) && (
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
