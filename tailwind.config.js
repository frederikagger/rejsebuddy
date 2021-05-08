module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#ECECEC',
        secondary: '#374255'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
