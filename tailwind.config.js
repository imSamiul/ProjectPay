/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lexend: ["Lexend", "sans-serif"],
    },

    extend: {
      colors: {
        mallard: {
          50: "#f5faeb",
          100: "#e9f3d4",
          200: "#d4e8ae",
          300: "#b6d87e",
          400: "#9ac556",
          500: "#7caa38",
          600: "#5f8729",
          700: "#4a6823",
          800: "#3d5321",
          900: "#283618",
          950: "#1a260d",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "night"],
  },
  darkMode: ["class", '[data-theme="night"]'],
};
