import QueryProvider from "@/components/providers/query-provider";

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
