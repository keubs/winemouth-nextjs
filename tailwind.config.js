/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FBF6EA',
        red: {
          500: '#DD2E17',
        },
      },
      fontFamily: {
        serif: ['var(--font-garamond)', 'ui-serif', 'Georgia'],
        sansSerif: ['Arial', 'ui-sans-serif'],
      },
      letterSpacing: {
        tight: '-0.02em',
        wide: "1px",
        wider: "1.5px",
        widest: "2px",
      },
      borderWidth: {
        2: '1px',
      },
    },
  },
  plugins: [],
}