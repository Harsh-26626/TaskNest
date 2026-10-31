export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        surface: "#0e1510",
        "surface-container-low": "#161d18",
        "surface-container": "#1a211c",
        "surface-container-high": "#242c26",
        "on-surface": "#dde5dc",
        "on-surface-variant": "#bbcabf",
        outline: "#86948a",
        "outline-variant": "#3c4a42",
        primary: "#4edea3",
        "on-primary": "#003824",
        "primary-container": "#10b981",
        "on-primary-container": "#00422b",
        secondary: "#adc6ff",
        tertiary: "#ffb95f",
      },
    },
  },
  plugins: [],
};
