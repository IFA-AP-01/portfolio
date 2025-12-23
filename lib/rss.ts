import { xml2js } from "xml-js";

const SOURCES = [
  { url: "https://www.freecodecamp.org/news/rss/", name: "FreeCodeCamp" },
  { url: "https://dev.to/feed", name: "Dev.to" },
  {
    url: "https://slack.engineering/feed/",
    name: "Slack Engineering",
  },
  {
    url: "https://newsletter.systemdesigncodex.com/feed",
    name: "System Design Codex",
  },
  {
    url: "https://blog.bytebytego.com/feed",
    name: "ByteByteGo",
  },
  {
    url: "https://blog.google/products/google-cloud/rss/",
    name: "Google Cloud",
  },
  {
    url: "https://www.artificial-intelligence.blog/ai-news/category/news?format=rss",
    name: "Artificial Intelligence Blog",
  },
];

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet?: string;
  thumbnail?: string;
  fullContent?: string;
}

const extractHighQualityImage = (item: any, description: string): string => {
  // 1. media:group > media:content (highest quality)
  const mediaGroup = item["media:group"]?.["media:content"];
  if (mediaGroup) {
    const arr = Array.isArray(mediaGroup) ? mediaGroup : [mediaGroup];
    const img = arr.find(
      (m: any) => m._attributes?.type?.startsWith("image")
    );
    if (img?._attributes?.url) return img._attributes.url;
  }

  // 2. media:content
  if (item["media:content"]?._attributes?.url) {
    return item["media:content"]._attributes.url;
  }

  // 3. media:thumbnail (often smaller but still valid)
  if (item["media:thumbnail"]?._attributes?.url) {
    return item["media:thumbnail"]._attributes.url;
  }

  // 4. enclosure image
  if (
    item.enclosure?._attributes?.url &&
    item.enclosure._attributes.type?.startsWith("image")
  ) {
    return item.enclosure._attributes.url;
  }

  // 5. first <img> from full HTML content
  if (description) {
    const imgMatch = description.match(
      /<img[^>]+(?:src|data-src)=['"]([^'">]+)['"]/i
    );
    if (imgMatch) return imgMatch[1];
  }

  return "";
};

const fetchFeed = async (
  source: { url: string; name: string }
): Promise<FeedItem[]> => {
  try {
    const response = await fetch(source.url, { next: { revalidate: 3600 } });
    if (!response.ok) return [];

    const xml = await response.text();
    const result = xml2js(xml, { compact: true }) as any;

    const items = result.rss?.channel?.item || result.feed?.entry || [];
    const itemsArray = Array.isArray(items) ? items : [items];

    return itemsArray
      .map((item: any) => {
        const getText = (node: any) => {
          if (!node) return "";
          if (typeof node === "string") return node;
          if (node._text) return node._text;
          if (node._cdata) return node._cdata;
          return "";
        };

        const title = getText(item.title);
        const link =
          getText(item.link) || item.link?._attributes?.href || "";
        if (!title || !link) return null;

        const pubDateRaw =
          getText(item.pubDate) ||
          getText(item.published) ||
          getText(item.updated) ||
          new Date().toISOString();

        const description =
          getText(item["content:encoded"]) ||
          getText(item.content) ||
          getText(item.description) ||
          getText(item.summary);

        const thumbnail = extractHighQualityImage(item, description);

        const contentSnippet =
          description
            ?.replace(/<[^>]*>/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 160) +
          (description?.length > 160 ? "..." : "");

        return {
          title,
          link,
          pubDate: new Date(pubDateRaw).toISOString(),
          source: source.name,
          contentSnippet,
          thumbnail,
          fullContent: description,
        };
      })
      .filter(Boolean) as FeedItem[];
  } catch {
    return [];
  }
};

export const aggregateFeeds = async (): Promise<FeedItem[]> => {
  const results = await Promise.all(SOURCES.map(fetchFeed));
  const seen = new Set<string>();

  const items = results
    .flat()
    .filter((item) => {
      if (seen.has(item.link)) return false;
      seen.add(item.link);
      return true;
    });

  // Fisher–Yates shuffle
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
};

