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
        // === BACKGROUND LAYERS (mapped to CSS vars) ===
        'bg-base':     'var(--bg-base)',
        'bg-primary':  'var(--bg-primary)',
        'bg-surface':  'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-hover':    'var(--bg-hover)',
        'bg-subtle':   'var(--bg-subtle)',

        // === INK LAYERS (raw values for direct use) ===
        ink: {
          void: '#07070e',
          deep: '#0f0f1c',
          3:    '#16162a',
        },
        surface: {
          DEFAULT: '#1e1e32',
          2:       '#26263e',
          3:       '#2e2e48',
        },

        // === TEXT ===
        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted':     'var(--text-muted)',
        'text-inverse':   'var(--text-inverse)',
        fg: {
          DEFAULT: '#f0f0fa',
          2:       '#9898b8',
          3:       '#5a5a78',
          4:       '#3a3a55',
        },

        // === BORDERS ===
        'border':         'var(--border)',
        'border-subtle':  'var(--border-subtle)',
        'border-default': 'var(--border-default)',
        'border-accent':  'var(--border-accent)',

        // === PRIMARY ACCENT — Lime ===
        lime: {
          DEFAULT: '#c8f135',
          hover:   '#d4f558',
          dim:     '#a8d41e',
        },

        // === SECONDARY ACCENT — Acid Cyan ===
        acid: {
          DEFAULT: '#00ffe0',
        },

        // === ACCENT COLORS (legacy aliases) ===
        'accent-teal':    'var(--accent-teal)',
        'accent-cyan':    'var(--accent-cyan)',
        'accent-violet':  'var(--accent-violet)',
        'accent-purple':  'var(--accent-purple)',
        'accent-blue':    'var(--accent-blue)',
        'accent-amber':   'var(--accent-amber)',
        'accent-emerald': 'var(--accent-emerald)',
        'accent-rose':    'var(--accent-rose)',

        // === STATUS ===
        danger:  'var(--danger)',
        success: '#00c9a0',
        warning: '#ffb830',
        error:   '#ff4060',
        info:    '#6366f1',

        // === RAW PALETTE (for components that need fixed values) ===
        teal: {
          400: '#c8f135',
          500: '#a8d41e',
          DEFAULT: '#c8f135',
        },
        amber: {
          DEFAULT: '#ffb830',
        },
        navy: {
          900: '#07070e',
          800: '#0f0f1c',
          700: '#16162a',
        },
      },
      fontFamily: {
        heading: ['var(--font-caveat)', 'Caveat', 'cursive', 'sans-serif'],
        display: ['var(--font-caveat)', 'Caveat', 'cursive', 'sans-serif'],
        body:    ['var(--font-patrick-hand)', 'Patrick Hand', 'cursive', 'sans-serif'],
        mono:    ['var(--font-fragment-mono)', 'Fragment Mono', 'monospace'],
        sans:    ['var(--font-patrick-hand)', 'Patrick Hand', 'cursive', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(36px, 5vw, 64px)', { lineHeight: '0.93', letterSpacing: '0.04em' }],
        'h2':      ['20px',  { lineHeight: '1.25', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h3':      ['15px',  { lineHeight: '1.4',  letterSpacing: '-0.02em', fontWeight: '600' }],
        'lead':    ['14px',  { lineHeight: '1.78', fontWeight: '300' }],
        'body-sm': ['13px',  { lineHeight: '1.8'  }],
        'ui':      ['12px',  { lineHeight: '1.5',  letterSpacing: '-0.01em' }],
        'label':   ['9px',   { lineHeight: '1.6',  letterSpacing: '0.2em'  }],
        'micro':   ['10px',  { lineHeight: '1.6'  }],
        'code':    ['12px',  { lineHeight: '1.75' }],
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
        'hero-idle': 'hero-idle 3s ease-in-out infinite',
        'hero-pulse': 'hero-pulse 0.5s ease-in-out infinite',
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
        'hero-idle': {
          '0%, 100%': { boxShadow: '0 0 0 0 transparent, 0 0 0 0 transparent' },
          '50%': { boxShadow: '0 0 0 5px rgba(200,241,53,.1), 0 0 0 10px rgba(200,241,53,.05)' },
        },
        'hero-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(200,241,53,.4)' },
          '100%': { boxShadow: '0 0 0 18px rgba(200,241,53,0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-lime': 'linear-gradient(135deg, #c8f135 0%, #00ffe0 100%)',
        'gradient-hero': 'linear-gradient(135deg, #07070e 0%, #0f0f1c 50%, #07070e 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}
