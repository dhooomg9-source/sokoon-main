/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF8F5', // Ivory
        paper: '#FFFFFF', // Card Background
        accent: '#C9A84C', // Champagne
        dark: '#0D0D12', // Obsidian
        muted: '#2A2A35', // Slate
        borderLight: '#E8E4DB', // Border / Divider
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        drama: ['"Playfair Display"', 'serif'],
        data: ['"JetBrains Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        '2rem': '2rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      backgroundImage: {
        'midnight-flow': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'soft-horizon': 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
      }
    },
  },
  plugins: [],
}
