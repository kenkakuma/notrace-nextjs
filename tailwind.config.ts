import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        'noto-sans-jp': ['var(--font-noto-sans-jp)', 'sans-serif'],
        'noto-serif-jp': ['var(--font-noto-serif-jp)', 'serif'],
      },
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
