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
        ink: "#0D0F26",
        navy: {
          DEFAULT: "#001A72",
          deep: "#0A0C20",
        },
        indigo: "#524BF4",
        paper: "#FFFFFF",
        mist: "#F4F5FA",
        periwinkle: {
          DEFAULT: "#EDF0FE",
          edge: "#D5DBF8",
        },
        cream: "#FBF5EE",
        accent: {
          orange: "#F6A656",
          blue: "#97A5ED",
          coral: "#F07A6E",
        },
        live: "#10B981",
        beta: "#F59E0B",
      },
      fontFamily: {
        heading: [
          "var(--font-heading)",
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
        hero: "880px",
      },
      spacing: {
        section: "120px",
      },
    },
  },
  plugins: [],
};
