/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
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
  plugins: [],
}
