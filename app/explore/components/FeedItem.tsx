import { FeedItem as IFeedItem } from "@/lib/rss";
import { getFaviconUrl } from "@/lib/utils";
import Image from "next/image";

// Helper to format date relative to now (e.g., "2 hours ago")
function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  
  return Math.floor(seconds) + "s ago";
}

interface FeedItemProps {
    item: IFeedItem;
    onClick: () => void;
}

export default function FeedItem({ item, onClick }: FeedItemProps) {
  const faviconUrl = getFaviconUrl(item.link);

  return (
    <div 
        className="neo-card p-0 rounded-none duration-200 cursor-pointer group h-full flex flex-col"
        onClick={onClick}
    >
        
        <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {faviconUrl && (
                        <Image src={faviconUrl} alt="" width={0} height={0} className="w-6 h-6 border border-black neo-shadow" />
                    )}
                    <span className="text-xs font-bold">
                        {item.source}
                    </span>
                </div>
                <span className="text-xs text-gray-500 font-bold font-mono">
                    {timeAgo(item.pubDate)}
                </span>
            </div>
            
            <h3 className="text-md sm:text-lg line-clamp-3 font-black leading-tight mb-2 group-hover:decoration-2">
                {item.title}
            </h3>

            {!item.thumbnail && (
                 <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                    {item.contentSnippet}
                </p>
            )}

            
        </div>
        {item.thumbnail && (
            <div className="w-full h-64 overflow-hidden relative bg-gray-100">
                <Image 
                    src={item.thumbnail} 
                    alt={item.title}
                    width={0}
                    height={0}
                    className="w-full h-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
        )}
    </div>
  );
}
