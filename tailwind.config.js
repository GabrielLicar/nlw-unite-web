/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange": {
          400: "#F48F56"
        },
        "green": {
          light: "#9FF9CC",
          dark: "#00292E"
        }
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/forms")
  ],
}