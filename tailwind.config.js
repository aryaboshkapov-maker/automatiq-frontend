/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0F62FE",
          accent:  "#6929C4",
          dark:    "#0A0A0F",
          surface: "#111118",
          muted:   "#8B8B9E",
        },
      },
    },
  },
  plugins: [],
}
