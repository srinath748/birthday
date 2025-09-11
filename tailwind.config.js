// tailwind.config.js

module.exports = {
  content: ["./index.html", "./script.js"], 
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: false, // disable dark mode entirely
  theme: {
    extend: {
      colors: {
        background: "#111827", // gray-900
        card: "#1f2937",      // gray-800
        text: "#d1d5db"       // gray-300
      }
    }
  }
}
