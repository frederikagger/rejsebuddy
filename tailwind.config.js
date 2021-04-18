module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#fff685',
        secondary: '#00ddff'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
