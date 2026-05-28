/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:       '#0066CC',
          'blue-dk':  '#004FA3',
          'blue-lt':  '#E8F2FF',
          teal:       '#00B4D8',
          green:      '#06D6A0',
          navy:       '#0A1628',
          'navy-mid': '#1A2B4B',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
      keyframes: {
        'badge-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 3px rgba(6,214,160,.25)' },
          '50%':       { boxShadow: '0 0 0 7px rgba(6,214,160,.08)' },
        },
      },
      animation: {
        'badge-pulse': 'badge-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
