/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dourado: "#facc15",
        fundo: "#0d0d1a"
      }
    },
  },
  plugins: [],
}
