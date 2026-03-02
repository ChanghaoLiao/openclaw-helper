/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crystal: {
          50: '#f8f9fa',
          100: '#f3f4f5',
          200: '#e9eaeb',
          300: '#dcddde',
          400: '#c8c9ca',
          500: '#b0b1b3',
          600: '#8e8f91',
          700: '#6b6c6e',
        },
        cosmic: {
          orange: '#c4995c',
          gold: '#d4a853',
          glow: '#e8c97a',
          amber: '#f5d799',
          light: '#faf0d8',
        },
        burgundy: {
          50: '#fdf2f4',
          100: '#fce4e8',
          200: '#f9c9d2',
          300: '#f5a3b5',
          400: '#ee7291',
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
        },
        aurora: {
          blue: '#7ec8e3',
          indigo: '#a78bfa',
          mint: '#6ee7b7',
        },
      },
      animation: {
        'iridescent': 'iridescent 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.4s ease-out',
        'progress-glow': 'progress-glow 2s ease-in-out infinite',
        'celebrate': 'celebrate 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        iridescent: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'progress-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(212, 168, 83, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 168, 83, 0.6)' },
        },
        celebrate: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.4' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      backgroundImage: {
        'iridescent-gradient': 'linear-gradient(135deg, rgba(196, 153, 92, 0.1) 0%, rgba(212, 168, 83, 0.15) 25%, rgba(232, 201, 122, 0.1) 50%, rgba(180, 190, 220, 0.15) 75%, rgba(196, 153, 92, 0.1) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },
      boxShadow: {
        'crystal': '0 8px 32px rgba(255, 255, 255, 0.08), 0 2px 8px rgba(0, 0, 0, 0.15)',
        'crystal-hover': '0 12px 48px rgba(255, 255, 255, 0.12), 0 4px 16px rgba(0, 0, 0, 0.2)',
        'crystal-inset': 'inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.03)',
        'glow-orange': '0 0 20px rgba(212, 168, 83, 0.3)',
        'glow-orange-lg': '0 0 40px rgba(212, 168, 83, 0.4), 0 0 80px rgba(212, 168, 83, 0.1)',
        'glow-burgundy': '0 0 20px rgba(225, 29, 72, 0.3)',
        'glass': '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'glass-hover': '0 8px 40px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        'xl': '24px',
        '2xl': '40px',
      },
    },
  },
  plugins: [],
}
