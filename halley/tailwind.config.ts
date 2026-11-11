import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#121512', 2: '#191d19', 3: '#232823', line: 'rgba(233,238,230,0.10)' },
        paper: { DEFAULT: '#F5F0E6', 2: '#ECE5D6', 3: '#E2DACA' },
        sage: { DEFAULT: '#8FB39A', deep: '#3E6A50', soft: '#C9DDCD' },
        mint: { DEFAULT: '#B7E6C8', glow: '#D6F5E1' },
        clay: '#C98B6B',
        txt: { DEFAULT: '#1B1F1C', muted: '#5E645F', faint: '#737871' },
        cream: { DEFAULT: '#EEF1EA', muted: 'rgba(238,241,234,0.62)', faint: 'rgba(238,241,234,0.5)' },
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Manrope Variable"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { page: '1240px' },
      transitionTimingFunction: { soft: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
};
export default config;
