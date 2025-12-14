"use server";

interface ShortenLinkResponse {
  key: string;
  url: string;
}

interface GetLinkResponse {
  url: string;
}

export async function createShortLink(url: string): Promise<{ success: boolean; data?: ShortenLinkResponse; error?: string }> {
  try {
    const res = await fetch("https://summarize.ifateam.dev/shorten-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!res.ok) {
        // Handle non-200 responses if needed, though the API might return error details in body
        return { success: false, error: "Failed to create short link" };
    }

    const data: ShortenLinkResponse = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error creating short link:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getOriginalUrl(key: string): Promise<string | null> {
  try {
    const res = await fetch(`https://summarize.ifateam.dev/get-link?key=${key}`, {
      method: "GET",
      cache: "no-store", // Ensure we don't serve stale redirects if the key changes (unlikely but safer)
    });

    if (!res.ok) {
      return null;
    }

    const data: GetLinkResponse = await res.json();
    return data.url;
  } catch (error) {
    console.error("Error fetching original URL:", error);
    return null;
  }
}
