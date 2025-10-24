/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand1: 'var(--brand1)',
        brand2: 'var(--brand2)',
        base: 'var(--base)'
      }
    },
  },
  plugins: [],
};
