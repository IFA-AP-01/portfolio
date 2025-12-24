"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import FeedItem from "./FeedItem";
import ArticleDialog from "./ArticleDialog";
import { FeedItem as IFeedItem } from "@/lib/rss";

export default function FeedList() {
  const [items, setItems] = useState<IFeedItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dialog state
  const [selectedItem, setSelectedItem] = useState<IFeedItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Infinite scroll refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchItems = useCallback(async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/explore?page=${pageNumber}&limit=12`);
      if (!res.ok) throw new Error("Failed to fetch feeds");
      const data = await res.json();
      
      if (pageNumber === 1) {
        setItems(data.data);
      } else {
        setItems((prev) => [...prev, ...data.data]);
      }
      
      setHasMore(data.meta.hasMore);
    } catch (err) {
      console.error(err);
      setError("Failed to load news feeds.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchItems(1);
  }, [fetchItems]);

  // Infinite Scroll Observer
  useEffect(() => {
    if (loading) return;
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => {
            const nextPage = prev + 1;
            fetchItems(nextPage);
            return nextPage;
        });
      }
    }, { threshold: 0.5 }); // Trigger when 50% of the loader is visible

    if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
    }
    
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore, fetchItems]);


  const handleItemClick = (item: IFeedItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full">
      {error && page === 1 && (
        <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button onClick={() => fetchItems(1)} className="underline mt-2">Try Again</button>
        </div>
      )}

      {items.length === 0 && !loading && !error && (
        <div className="text-center py-12">
            <p className="text-xl font-bold text-gray-400">No news found right now.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {items.map((item, index) => (
          <FeedItem 
            key={`${item.link}-${index}`} 
            item={item} 
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>

      {/* Infinite Scroll Sentinel / Loading State */}
      <div 
        ref={loadMoreRef} 
        className="flex justify-center py-12 w-full min-h-[100px]"
      >
        {loading && (
             <div className="flex flex-col items-center gap-3">
                 <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-black"></div>
                 <p className="text-sm font-bold text-gray-500 animate-pulse">Loading more stories...</p>
             </div>
        )}
        {!hasMore && items.length > 0 && (
          <div className="text-center">
               <p className="text-gray-400 font-medium">You've reached the end.</p>
               <div className="w-16 h-1 bg-gray-200 mx-auto mt-4 rounded-full"></div>
          </div>
        )}
      </div>

      <ArticleDialog 
        item={selectedItem}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
