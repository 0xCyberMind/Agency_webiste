/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#0a0e27',
        'cyber-dark': '#1a1f3a',
        'cyber-blue': '#00d4ff',
        'cyber-purple': '#a78bfa',
        'cyber-pink': '#ec4899',
        'neon-cyan': '#00f0ff',
        'neon-purple': '#b344ff',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-dark': 'rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'glass': '10px',
        'intense': '20px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-purple': '0 0 30px rgba(163, 139, 250, 0.5)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
