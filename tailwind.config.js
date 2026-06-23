import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--ink-2)',
            '--tw-prose-headings': 'var(--ink)',
            '--tw-prose-links': 'var(--brand-blue)',
            '--tw-prose-bold': 'var(--ink)',
            '--tw-prose-bullets': 'var(--ink-3)',
            '--tw-prose-counters': 'var(--ink-3)',
            '--tw-prose-hr': 'var(--line)',
            '--tw-prose-quotes': 'var(--ink-2)',
            '--tw-prose-quote-borders': 'var(--line)',
            '--tw-prose-code': 'var(--ink)',
            '--tw-prose-pre-bg': 'var(--surface-2)',
            '--tw-prose-pre-code': 'var(--ink)',
            '--tw-prose-th-borders': 'var(--line-2)',
            '--tw-prose-td-borders': 'var(--line)',
            maxWidth: 'none',
          },
        },
      },
      colors: {
        house: '#2D5BFF',
        brand: {
          blue: '#1F6FD6',
          red: '#E5341F',
        },
        signal: {
          sec:  '#E5484D',
          data: '#2D5BFF',
          gis:  '#13A36B',
          game: '#8B5CF6',
          prac: '#F5A524',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        heading: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1320px',
      },
    },
  },
  plugins: [typography],
}
