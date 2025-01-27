/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blueLink: "#4C4CFF",
        grayText: "#8585AD",
      },
    },
  },
  plugins: [],
};
