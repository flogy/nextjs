import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [ //never purge these classes if they don't exist in code
    'bg-red-500',
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": '#081A51',
        "light-white": 'rgba(255, 255, 255, 0.18)'
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
      themes: ["cmyk"],
      base: true, // applies background color and foreground color for root element by default
      styled: true, // include daisyUI colors and design decisions for all components
      utils: true // adds responsive and modifier utility classes
  },
}
export default config
