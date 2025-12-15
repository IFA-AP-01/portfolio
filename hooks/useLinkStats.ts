import { useQuery } from "@tanstack/react-query";

export type AnalyticsEvent = {
  timestamp: string;
  destination_domain: string;
  referer: string | null;
  user_agent: string;
  country: string;
};

export type TimeRange = "60m" | "24h" | "7d";

const fetchLinkStats = async (key: string, range: TimeRange): Promise<AnalyticsEvent[]> => {
  const response = await fetch(
    `/api/analytics/short-links?key=${key}&range=${range}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const useLinkStats = (key: string, range: TimeRange) => {
  return useQuery({
    queryKey: ["link-stats", key, range],
    queryFn: () => fetchLinkStats(key, range),
    enabled: !!key, // Only fetch if key is present
  });
};
