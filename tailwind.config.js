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
          primary: "#009FD4",
          accent:  "#FF6B35",
          dark:    "#FFFFFF",
          surface: "#F8F9FA",
          muted:   "#64748B",
          navy:    "#1A2B4A",
        },
      },
    },
  },
  plugins: [],
}
