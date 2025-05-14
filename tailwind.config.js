/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor : '#FF0000',
        hoverColor: '#af1d24 ',
      },
      fontFamily: {
        linotte: ['Linotte', 'sans-serif'],
        geometos: ['Geometos Neue', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        'ge-ss-two-light': ['GE SS Two Light', 'sans-serif'],
        sans: ['Proxima Nova', 'sans-serif'], // Set Proxima Nova as the default sans font
      },
      fontWeight: {
        'semi-bold': '600', // Ensure this matches Linotte Semi-Bold weight
      }
    },
  },
  plugins: [],
}

