import React from 'react';

interface DoodleDividerProps {
  className?: string;
  variant?: 'wavy' | 'zigzag' | 'sketch';
}

export const DoodleDivider: React.FC<DoodleDividerProps> = ({
  className = '',
  variant = 'wavy',
}) => {
  if (variant === 'zigzag') {
    return (
      <div className={`w-full overflow-hidden py-4 select-none ${className}`}>
        <svg
          viewBox="0 0 400 16"
          preserveAspectRatio="none"
          className="w-full h-3 opacity-60 text-[var(--canvas-border)]"
        >
          <path
            d="M0,8 L20,2 L40,14 L60,2 L80,14 L100,2 L120,14 L140,2 L160,14 L180,2 L200,14 L220,2 L240,14 L260,2 L280,14 L300,2 L320,14 L340,2 L360,14 L380,2 L400,8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // Default wavy hand-drawn divider
  return (
    <div className={`w-full overflow-hidden py-4 select-none ${className}`}>
      <svg
        viewBox="0 0 400 20"
        preserveAspectRatio="none"
        className="w-full h-4 opacity-75 text-[var(--canvas-border)]"
      >
        <path
          d="M0,10 Q20,2 40,10 T80,10 T120,10 T160,10 T200,10 T240,10 T280,10 T320,10 T360,10 T400,10"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default DoodleDivider;
