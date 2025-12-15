import QueryProvider from "@/components/providers/query-provider";

export const metadata = {
  title: "Stats",
  description:
    "Free link shortener. Quick and easy. No registration required. No ads.",
  keywords: [
    "shorten link",
    "link shortener",
    "free link shortener",
    "quick and easy",
    "no registration required",
    "no ads",
  ],
  openGraph: {
    title: "Stats",
    description:
      "Free link shortener. Quick and easy. No registration required. No ads.",
    type: "website",
    siteName: "Stats",
  },
  canonical: "https://www.ifateam.dev/stats",
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <QueryProvider>{children}</QueryProvider>
    </div>
  );
}
