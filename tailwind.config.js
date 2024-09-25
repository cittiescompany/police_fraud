/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lt-417': { 'max': '416px' }, // Custom media query for screens less than 417px
      },
    },
  },
  plugins: [],
}

