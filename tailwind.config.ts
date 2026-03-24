import type { Config } from 'tailwindcss'
import theme from './theme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   theme.primary,
        secondary: theme.secondary,
        accent:    theme.accent,
        light:     theme.light,
        dark:      theme.dark,
      },
    },
  },
  plugins: [],
}

export default config
