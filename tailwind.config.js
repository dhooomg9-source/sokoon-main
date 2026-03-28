/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: 'var(--bg-body)',
        card: 'var(--bg-card)',
        'on-dark': 'var(--text-on-dark)',
        primary: 'var(--text-primary)',
        copy: 'var(--text-body)',
        nav: 'var(--nav-default)',
        accent: 'var(--accent-warm)',
        dark: 'var(--bg-dark)',
        subtle: 'var(--border-subtle)',
        muted: 'var(--text-muted)',
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
