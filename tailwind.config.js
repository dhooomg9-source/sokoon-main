/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC', // Soft Background
        paper: '#FFFFFF', // Card Background
        accent: '#3B82F6', // Calm Corporate Blue
        dark: '#0F172A', // Primary Slate (Brand/Text)
        muted: '#475569', // Text Secondary
        borderLight: '#E2E8F0', // Border / Divider
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        data: ['"Space Mono"', 'monospace'],
        body: ['"Space Grotesk"', 'sans-serif'],
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
