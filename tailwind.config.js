/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111111",
          muted: "#6E6862",
        },
        canvas: {
          DEFAULT: "#FBF5EE",
          deep: "#EFE9E2",
        },
        surface: "#FFFFFF",
        accent: {
          orange: "#F6A656",
        },
      },
      fontFamily: {
        heading: [
          "var(--font-body)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        body: [
          "var(--font-body)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      maxWidth: {
        shell: "1200px",
      },
      borderRadius: {
        card: "30px",
        media: "20px",
      },
    },
  },
  plugins: [],
};
