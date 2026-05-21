import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef9ff',
          100: '#d9f2ff',
          200: '#bae8ff',
          300: '#8adaff',
          400: '#52c4fd',
          500: '#29a3f5',
          600: '#1484ea',
          700: '#0c69d4',
          800: '#1056ab',
          900: '#134a87',
          950: '#0f2e52',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark:    '#0f1117',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            a: { color: theme('colors.brand.600'), textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            'h1, h2, h3, h4': { fontWeight: '700', scrollMarginTop: '5rem' },
            code: {
              backgroundColor: theme('colors.gray.100'),
              borderRadius: theme('borderRadius.sm'),
              padding: '0.125rem 0.375rem',
              fontWeight: '400',
              '&::before': { content: 'none' },
              '&::after':  { content: 'none' },
            },
            pre: {
              backgroundColor: '#0d1117',
              code: { backgroundColor: 'transparent', padding: 0 },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: { color: theme('colors.brand.400') },
            code: { backgroundColor: theme('colors.gray.800') },
          },
        },
      }),
      animation: {
        'fade-in':    'fadeIn 0.3s ease-in-out',
        'slide-in':   'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideIn: { '0%': { transform: 'translateX(-10px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
