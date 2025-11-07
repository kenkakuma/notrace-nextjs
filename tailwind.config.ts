import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E17B47',
        'bg-light': '#FAF9F7',
        'text-dark': '#1A1A1A',
        'text-secondary': '#666666',
      },
      borderRadius: {
        DEFAULT: '16px',
      },
    },
  },
  plugins: [],
}
export default config
