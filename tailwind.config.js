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
        // Backgrounds
        'bg-primary': 'var(--bg-primary)',
        'bg-surface': 'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        // Accents
        'accent-teal': 'var(--accent-teal)',
        'accent-amber': 'var(--accent-amber)',
        'accent-blue': 'var(--accent-blue)',
        // Status
        danger: 'var(--danger)',
        success: 'var(--success)',
        // Text
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        // Border
        border: 'var(--border)',
        // Raw palette for direct use
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          DEFAULT: '#00C9A7',
        },
        amber: {
          DEFAULT: '#F59E0B',
        },
        navy: {
          900: '#0D1117',
          800: '#161B22',
          700: '#1C2128',
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
        'gradient-hero': 'linear-gradient(135deg, #0D1117 0%, #161B22 50%, #0D1117 100%)',
      },
    },
  },
  plugins: [],
}
