/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor : '#800020',
        hoverColor: '#af1d24 ',
      },
    },
  },
  plugins: [],
}

