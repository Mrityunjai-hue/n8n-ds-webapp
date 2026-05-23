/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // === BACKGROUND LAYERS ===
        'bg-base':     'var(--bg-base)',
        'bg-primary':  'var(--bg-primary)',   // legacy
        'bg-surface':  'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-hover':    'var(--bg-hover)',
        'bg-subtle':   'var(--bg-subtle)',

        // === TEXT ===
        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted':     'var(--text-muted)',
        'text-inverse':   'var(--text-inverse)',

        // === BORDERS ===
        'border':         'var(--border)',          // legacy
        'border-subtle':  'var(--border-subtle)',
        'border-default': 'var(--border-default)',
        'border-accent':  'var(--border-accent)',

        // === ACCENT COLORS ===
        'accent-teal':    'var(--accent-teal)',      // legacy
        'accent-cyan':    'var(--accent-cyan)',
        'accent-violet':  'var(--accent-violet)',
        'accent-purple':  'var(--accent-purple)',    // legacy
        'accent-blue':    'var(--accent-blue)',
        'accent-amber':   'var(--accent-amber)',
        'accent-emerald': 'var(--accent-emerald)',
        'accent-rose':    'var(--accent-rose)',

        // === STATUS ===
        danger:  'var(--danger)',
        success: 'var(--success)',

        // === RAW PALETTE (for components that need fixed values) ===
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          DEFAULT: '#00C9A7',
        },
        amber: {
          DEFAULT: '#F59E0B',
        },
        navy: {
          900: '#070b14',
          800: '#0d1424',
          700: '#131d30',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        body: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '8px',
        card: '12px',
        modal: '16px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-teal': 'linear-gradient(135deg, #00C9A7 0%, #3B82F6 100%)',
        'gradient-hero': 'linear-gradient(135deg, #070b14 0%, #0d1424 50%, #070b14 100%)',
      },
    },
  },
  plugins: [],
}
