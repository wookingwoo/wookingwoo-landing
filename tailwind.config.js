/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0070f3",
        secondary: "#6c757d",
        dark: "#212529",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["'Instrument Serif'", "Georgia", "serif"],
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "33%": { transform: "translate3d(48px, -36px, 0)" },
          "66%": { transform: "translate3d(-36px, 28px, 0)" },
        },
      },
      animation: {
        aurora: "aurora 16s ease-in-out infinite",
        "aurora-slow": "aurora 24s ease-in-out infinite reverse",
      },
    },
  },
  plugins: [],
};
