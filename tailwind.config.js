/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js, ts, tsx, jsx}', './src/**/*'],
  darkMode: 'media',
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    fontFamily: {
      sans: ['Arial', 'sans-serif'],
      serif: ['Garamond', 'serif'],
    },
    extend: {
      spacing: {
        1.5: '0.375rem',
      },
    },
  },
  plugins: [],
};
