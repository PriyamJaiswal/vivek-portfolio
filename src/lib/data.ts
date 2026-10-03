import { createPublicClient } from "@/lib/supabase/server";
import { Project, Review } from "@/types/database";
import { allVideoProjects } from "@/db/projects";

/**
 * Fallback converter for static projects in case Supabase is empty or unseeded
 */
function getFallbackProjects(): Project[] {
  return allVideoProjects.map((p, index) => {
    let platform: "youtube" | "instagram" = "youtube";
    let format: "video" | "short" = "video";
    let url = p.video_link;

    if (p.platform === "instagram") {
      platform = "instagram";
      format = "video";
    } else if (p.category.includes("Shorts")) {
      platform = "youtube";
      format = "short";
    }

    return {
      id: p.id,
      platform,
      format,
      url,
      title: p.video_title,
      summary: p.summary || p.video_description || null,
      thumbnail_url:
        platform === "youtube"
          ? `https://img.youtube.com/vi/${p.cover_image || p.id}/hqdefault.jpg`
          : null,
      is_visible: true,
      sort_order: index + 1,
      created_at: new Date().toISOString(),
    };
  });
}

/**
 * Fetches visible projects from Supabase server-side.
 * Ordered by sort_order asc, then created_at desc.
 */
export async function getPublicProjects(): Promise<Project[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return getFallbackProjects();
    }

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return getFallbackProjects();
    }

    return data as Project[];
  } catch (err) {
    return getFallbackProjects();
  }
}

/**
 * Fetches visible reviews from Supabase server-side.
 * Ordered by sort_order asc, then created_at desc.
 */
export async function getPublicReviews(): Promise<Review[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) {
      if (error) {
        console.warn("Supabase fetch reviews warning:", error.message);
      }
      return [];
    }

    return data as Review[];
  } catch (err) {
    console.warn("Failed to connect to Supabase for reviews:", err);
    return [];
  }
}
