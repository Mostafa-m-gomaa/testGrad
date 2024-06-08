/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "dark",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      gold: "var(--primary-clr2)",
      dark: "var(--primary-clr3)",
      gray: "var(--gray)",
      lightGray: "var(--lightGray)",
      lightGold: "var(--lightGold)",
      blackGold: "var(--blackGold)",
      goldenGray: "var(--goldenGray)",
      red: "var(--red)",
      blue: "var(--blue)",
    },
  },
  plugins: [],
};
