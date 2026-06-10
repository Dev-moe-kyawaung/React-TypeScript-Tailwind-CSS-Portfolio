/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neon Colors
        'neon-cyan': '#00F5FF',
        'neon-pink': '#FF3DF2',
        'neon-yellow': '#FFE600',
        'neon-green': '#29FF88',
        
        // Background
        'bg-dark': '#050816',
        'bg-dark-2': '#0B1124',
        'surface': '#111731',
        'surface-2': '#182448',
        
        // Text
        'text-primary': '#EAF2FF',
        'text-muted': '#9FB2D0',
        
        // Border
        'border-light': '#1F1F1F',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 6s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
