import { ScreenshotEditor } from "./components/ScreenshotEditor";

export const metadata = {
  title: "App Store Screenshot Generator",
  description: "Create professional app store screenshots for iOS and Android.",
};

export default function MockupPage() {
  return (
    <main className="h-screen bg-[#faf8f1] dark:bg-[#191C1E] overflow-hidden">
      <ScreenshotEditor />
    </main>
  );
}
