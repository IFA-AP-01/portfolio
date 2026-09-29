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
        canvas: "#090A0F",
        surface: {
          DEFAULT: "#12131A",
          hover: "#1A1C26",
        },
        fg: {
          DEFAULT: "#F4F5F8",
          muted: "#9CA3AF",
          subtle: "#52525B",
        },
        line: "rgba(255, 255, 255, 0.08)",
        live: "#10B981",
        beta: "#F59E0B",
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "20px",
      },
      maxWidth: {
        shell: "1200px",
        notch: "760px",
        hero: "840px",
      },
      spacing: {
        section: "128px",
      },
      boxShadow: {
        notch: "0 16px 36px -10px rgba(0, 0, 0, 0.7)",
        lift: "0 24px 48px -12px rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
