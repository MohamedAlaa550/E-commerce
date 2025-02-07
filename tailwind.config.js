/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        mainColor: "#0aad0a",
        secBackground: "#f3f4f6 ",
        hoverBg: "#16a34a",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

