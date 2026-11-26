import { Inter } from "next/font/google";

export const bodyFont = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-body",
  display: "swap",
});

export const headlineFont = bodyFont;
