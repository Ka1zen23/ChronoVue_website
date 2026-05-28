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
        mono:    ['JetBrains Mono', 'Fira Mono', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
      },
    },
  },
  plugins: [],
};
