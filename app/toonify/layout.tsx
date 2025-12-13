export const metadata = {
  title: "JSON to TOON Converter - Convert JSON to TOON Format",
  description:
    "Free JSON to TOON converter that reduces LLM token usage by 30-60% with TOON format",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf8f1",
};

export default function JsonConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen pt-28 pb-10 px-4 sm:px-10">
      <h1 className="max-w-4xl text-2xl sm:text-4xl font-bold mb-8 text-center text-gray-950 dark:text-gray-50 uppercase tracking-widest">
        JSON to <span className="text-[#e9945b]">TOON</span> Converter - Convert
        JSON to <span className="text-[#e9945b]">TOON</span> Format
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-center pb-8">
        Free JSON to <span className="text-[#e9945b]">TOON</span> converter that
        reduces <span className="text-[#e9945b]">LLM</span> token usage by
        30-60% with <span className="text-[#e9945b]">TOON</span> format
      </p>
      {children}
    </main>
  );
}
