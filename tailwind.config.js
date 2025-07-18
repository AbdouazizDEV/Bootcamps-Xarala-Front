/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#ff7f2a',
        'primary-pink': '#db4061',
        'text-dark': '#1a1a1a',
        'text-gray': '#6b7280',
        'bg-light': '#f9fafb',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff7f2a 0%, #db4061 100%)',
      },
    },
  },
  plugins: [],
} 