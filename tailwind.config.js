/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "dark-blue": "#18214D",
      },
      width: {
        "width-styling": "24.75rem",
      },
    },
  },
  plugins: [],
};
