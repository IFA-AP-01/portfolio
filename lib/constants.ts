import { TEMPLATES } from "./templates";
import { ScreenshotData } from "./types";

export const FONTS = [
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "'Roboto', sans-serif" },
  { name: "Open Sans", value: "'Open Sans', sans-serif" },
  { name: "Lato", value: "'Lato', sans-serif" },
  { name: "Montserrat", value: "'Montserrat', sans-serif" },
  { name: "Oswald", value: "'Oswald', sans-serif" },
  { name: "Raleway", value: "'Raleway', sans-serif" },
  { name: "Poppins", value: "'Poppins', sans-serif" },
  { name: "Noto Sans", value: "'Noto Sans', sans-serif" },
  { name: "Source Sans 3", value: "'Source Sans 3', sans-serif" },
  { name: "Merriweather", value: "'Merriweather', serif" },
  { name: "Roboto Mono", value: "'Roboto Mono', monospace" },
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Ubuntu", value: "'Ubuntu', sans-serif" },
  { name: "Mulish", value: "'Mulish', sans-serif" },
  { name: "Lora", value: "'Lora', serif" },
  { name: "Work Sans", value: "'Work Sans', sans-serif" },
  { name: "Nunito", value: "'Nunito', sans-serif" },
  { name: "Titillium Web", value: "'Titillium Web', sans-serif" },
  { name: "Quicksand", value: "'Quicksand', sans-serif" },
  { name: "Inconsolata", value: "'Inconsolata', monospace" },
];

export const SOLID_PRESETS = [
  "#1a1a1a",
  "#ffffff",
  "#f3f4f6",
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
];

export const GRADIENT_PRESETS = [
  { from: "#6366f1", to: "#ec4899" },
  { from: "#92400e", to: "#d97706" },
  { from: "#7c3aed", to: "#db2777" },
  { from: "#0f172a", to: "#319795" },
  { from: "#312e81", to: "#6366f1" },
  { from: "#0c4a6e", to: "#38bdf8" },
  { from: "#064e3b", to: "#34d399" },
  { from: "#78350f", to: "#fbbf24" },
];

export const GRADIENT_ANGLES = [135, 180, 225, 270];

export const DEFAULT_IOS_SCALE = 0.75;
export const DEFAULT_ANDROID_SCALE = 0.65;

export const INITIAL_DATA: ScreenshotData = {
  title: "Your title here",
  subtitle: "Place your subtitle here",
  titleFontFamily: "Montserrat",
  subtitleFontFamily: "Montserrat",
  titleTextAlign: "center",
  subtitleTextAlign: "center",
  titleFontSize: 100,
  titleFontWeight: "bold",
  titleFontStyle: "normal",
  titleTextDecoration: "none",
  titleLetterSpacing: 0,
  titleLineHeight: 1.2,
  titleTextShadow: false,
  subtitleFontSize: 56,
  subtitleFontWeight: "normal",
  subtitleFontStyle: "normal",
  subtitleTextDecoration: "none",
  subtitleLetterSpacing: 0,
  subtitleLineHeight: 1.4,
  subtitleTextShadow: false,
  titleColor: "#ffffff",
  subtitleColor: "#e0e0e0",
  backgroundColor: "#1a1a1a",
  backgroundType: "gradient",
  gradientColorFrom: "#4094b0",
  gradientColorTo: "#0f172a",
  gradientAngle: 0,
  templateId: TEMPLATES[1].id,
  showNotch: true,
  textTranslateX: 0,
  textTranslateY: 0,
  deviceTranslateX: 0,
  deviceTranslateY: 0,
  deviceRotate: 0,
  deviceScale: 1,
};

