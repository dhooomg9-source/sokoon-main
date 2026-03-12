/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F3EE', // Off-white
        paper: '#E8E4DD', // Paper (Primary/Brutalist Concrete)
        accent: '#E63B2E', // Signal Red
        dark: '#111111', // Black/System
        muted: '#555555', // Industrial Grey
        borderLight: '#DCD6CE', // Border / Divider
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
