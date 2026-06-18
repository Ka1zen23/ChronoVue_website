import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,astro}'],
  theme: {
    extend: {
      colors: {
        /* shadcn CSS-variable tokens */
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        /* ChronoVue brand tokens */
        brand: {
          blue:       '#0066CC',
          'blue-dk':  '#004FA3',
          'blue-lt':  '#E8F2FF',
          teal:       '#5E97A6',
          sage:       '#8AA68D',
          green:      '#06D6A0',
          gray:       '#8E949A',
          navy:       '#1F3154',
          'navy-mid': '#2B3F62',
          border:     '#D8D8D0',
          bg:         '#F5F4EF',
        },
      },
      borderRadius: {
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '24px',
        full: '9999px',
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Mono', 'monospace'],
      },
      fontSize: {
        /* Design system T scale — matches T object in design-system.ts */
        'display': ['3rem',    { lineHeight: '3.3125rem', fontWeight: '800' }],  /* 48/53 */
        'h1':      ['2.25rem', { lineHeight: '2.625rem',  fontWeight: '700' }],  /* 36/42 */
        'h2':      ['1.75rem', { lineHeight: '2.125rem',  fontWeight: '700' }],  /* 28/34 */
        'h3':      ['1.5rem',  { lineHeight: '1.875rem',  fontWeight: '700' }],  /* 24/30 */
        'section': ['1.25rem', { lineHeight: '1.625rem',  fontWeight: '600' }],  /* 20/26 */
        'body':    ['1rem',    { lineHeight: '1.625rem',  fontWeight: '400' }],  /* 16/26 */
        'small':   ['0.875rem',{ lineHeight: '1.25rem',   fontWeight: '500' }],  /* 14/20 */
        'caption': ['0.75rem', { lineHeight: '1.125rem',  fontWeight: '400' }],  /* 12/18 */
        'label':   ['0.8125rem',{ lineHeight: '1.125rem', fontWeight: '500' }],  /* 13/18 */
        'button':  ['0.9375rem',{ lineHeight: '1.25rem',  fontWeight: '600' }],  /* 15/20 */
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
      },
    },
  },
  plugins: [tailwindAnimate],
};
