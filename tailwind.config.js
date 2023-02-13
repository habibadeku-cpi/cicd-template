/** @type {import('tailwindcss').Config} */

const theme = require('./styles/theme')

module.exports = {
  content : ['./src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{js,ts,jsx,tsx}', 'node_modules/@chargepoint/**/*'],
  theme   : {
    colors : {},
    extend : {
      colors   : theme.colors,
      fontSize : {
        xs    : '0.75rem',
        sm    : '0.875rem',
        base  : '1rem',
        lg    : '1.125rem',
        xl    : '1.25rem',
        '2xl' : '1.5rem',
        '3xl' : '1.75rem',
        '4xl' : '2rem',
        '5xl' : '2.375rem',
        '6xl' : '3rem',
        '7xl' : '4rem',
      },
      fontFamily : { sans: ['GothamNarrSSm'] },
      fontWeight : {
        // `book` is an alias for `normal`
        book: 400,
      },
      lineHeight: {
        xxs   : '0.9375rem',
        xs    : '1.125rem',
        sm    : '1.3125rem',
        base  : '1.5rem',
        lg    : '1.6875rem',
        xl    : '1.875rem',
        '2xl' : '2.125rem',
        '3xl' : '2.375rem',
        '4xl' : '2.75rem',
        '5xl' : '3.625rem',
        '6xl' : '4.8125rem',
      },
    },
  },
  plugins: [],
}
