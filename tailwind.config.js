const defaultTheme = require("tailwindcss/defaultTheme")
// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky
      },
      fontFamily: {
        "open": ["'Open Sans'", ...defaultTheme.fontFamily.sans],
        "rale": ["Raleway", ...defaultTheme.fontFamily.serif],
        "work": ["'Work Sans'", ...defaultTheme.fontFamily.sans],
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/forms'),
  ],
}
