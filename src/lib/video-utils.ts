export interface DetectedMedia {
  platform: "youtube" | "instagram";
  format: "video" | "short";
  cleanUrl: string;
  id: string;
  defaultThumbnailUrl: string | null;
}

/**
 * Strips all query tracking parameters (si, utm_*, fbclid, etc.)
 */
export function cleanMediaUrl(rawUrl: string): string {
  try {
    const urlObj = new URL(rawUrl.trim());
    // Keep only essential search params if any
    const searchParams = new URLSearchParams();
    if (urlObj.hostname.includes("youtube.com") && urlObj.pathname.includes("/watch")) {
      const v = urlObj.searchParams.get("v");
      if (v) searchParams.set("v", v);
    }
    const cleanSearch = searchParams.toString();
    return `${urlObj.origin}${urlObj.pathname}${cleanSearch ? `?${cleanSearch}` : ""}`;
  } catch {
    return rawUrl.trim();
  }
}

/**
 * Detects whether a URL is a YouTube Video, YouTube Short, or Instagram Reel/Post
 */
export function detectMedia(inputUrl: string): DetectedMedia | null {
  const url = inputUrl.trim();
  if (!url) return null;

  // 1. YouTube Shorts: youtube.com/shorts/<id>
  const shortsRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i;
  const shortsMatch = url.match(shortsRegex);
  if (shortsMatch && shortsMatch[1]) {
    const id = shortsMatch[1];
    return {
      platform: "youtube",
      format: "short",
      cleanUrl: `https://www.youtube.com/shorts/${id}`,
      id,
      defaultThumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }

  // 2. YouTube Video: youtube.com/watch?v=<id> or youtu.be/<id>
  const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    const id = ytMatch[1];
    return {
      platform: "youtube",
      format: "video",
      cleanUrl: `https://www.youtube.com/watch?v=${id}`,
      id,
      defaultThumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    };
  }

  // 3. Instagram Reel / Post: instagram.com/reel/<id> or instagram.com/p/<id>
  const igRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/i;
  const igMatch = url.match(igRegex);
  if (igMatch && igMatch[1]) {
    const id = igMatch[1];
    return {
      platform: "instagram",
      format: "video", // user specified format for reels in db is 'video' or 'short'
      cleanUrl: `https://www.instagram.com/reel/${id}/`,
      id,
      defaultThumbnailUrl: null,
    };
  }

  return null;
}

/**
 * Fetch oEmbed title from YouTube (fails gracefully if blocked or network error)
 */
export async function fetchYouTubeOEmbedTitle(url: string): Promise<string | null> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(oembedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.title === "string" ? data.title : null;
  } catch {
    return null;
  }
}
