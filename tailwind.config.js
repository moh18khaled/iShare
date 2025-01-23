/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor : '#ea131d',
        hoverColor: '#af1d24 ',
      },
    },
  },
  plugins: [],
}

