import FeedList from "./components/FeedList";

export const metadata = {
  title: "Explore Tech News | Dev Tools", // Assuming site name context from other files
  description: "Stay updated with the latest technology news from TechCrunch, Dev.to, and Hacker News.",
};

export default function ExplorePage() {
  return (
    <main className="min-h-screen pt-28 pb-12 lg:px-0 px-4 max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
          Explore
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl font-medium border-l-4 pl-4">
          Curated technology news from top sources, aggregated in one place.
        </p>
      </div>
      
      <FeedList />
    </main>
  );
}
