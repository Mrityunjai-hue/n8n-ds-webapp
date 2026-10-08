'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  name: string;
  href: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  name,
  href,
  badge,
  onClick,
  className = '',
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative inline-flex items-center text-[15px] font-medium transition-colors duration-150 group py-1 px-1.5 ${className}`}
      style={{
        color: isActive ? 'var(--ink)' : 'var(--ink-2)',
        fontFamily: 'var(--font-body)',
        textDecoration: 'none',
      }}
    >
      <span className="relative z-10 group-hover:text-[var(--ink)]">
        {name}
      </span>

      {badge && (
        <span
          className="relative z-10"
          style={{
            background: 'var(--red)',
            color: '#ffffff',
            fontSize: '9px',
            fontFamily: 'var(--font-mono)',
            padding: '1px 5px',
            borderRadius: '3px',
            marginLeft: '4px',
            verticalAlign: 'super',
            letterSpacing: '0.05em',
            transform: 'rotate(-2deg)',
            display: 'inline-block',
            fontWeight: 700,
          }}
        >
          {badge}
        </span>
      )}

      {/* Highlighter underline on active state */}
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-2 -z-0 rounded-[2px] transition-all"
          style={{
            background: 'var(--yellow)',
            opacity: 0.6,
          }}
        />
      )}

      {/* Subtle hover sketch underline if not active */}
      {!isActive && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-1 -z-0 rounded-[2px] opacity-0 group-hover:opacity-40 transition-opacity"
          style={{
            background: 'var(--canvas-border)',
          }}
        />
      )}
    </Link>
  );
};
