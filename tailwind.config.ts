import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'p2b-black': '#0a0a0a',
        'p2b-dark': '#111111',
        'p2b-darker': '#1a1a1a',
        'p2b-lime': '#a3e635',
        'p2b-white': '#ffffff',
        'p2b-grey': '#a0a0a0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
