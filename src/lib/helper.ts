import { allVideoProjects } from "@/db/projects";
import { VideoProject } from "@/types/videos";
import { Project } from "@/types/database";

export function projectToVideoProject(p: Project): VideoProject {
  let videoId = p.id;
  if (p.platform === "youtube") {
    const match = p.url.match(/(?:watch\?.*v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/);
    if (match && match[1]) {
      videoId = match[1];
    }
  } else if (p.platform === "instagram") {
    const match = p.url.match(/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      videoId = match[1];
    }
  }

  const category =
    p.platform === "youtube"
      ? p.format === "short"
        ? ["Reels & Shorts", "Shorts"]
        : ["YouTube Videos", "YouTube"]
      : ["Reels & Shorts", "Reels"];

  return {
    id: videoId,
    video_title: p.title,
    video_description: p.summary || p.title,
    summary: p.summary || undefined,
    platform: p.platform,
    video_link: p.url,
    category,
    thumbnail: p.thumbnail_url || undefined,
    cover_image: p.thumbnail_url || videoId,
  };
}

// Helper function to get all projects preserving intended order or sorted by date if present
export const getAllVideoProjects = (): VideoProject[] => {
  return [...allVideoProjects].sort((a, b) => {
    if (a.publish_date && b.publish_date) {
      return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
    }
    return 0;
  });
};

export const getAllVideoProjectsFlattened = (): VideoProject[] => {
  return getAllVideoProjects();
};

// Returns ONLY long-form YouTube videos (strictly for YouTube video section)
export const getYouTubeProjects = (): VideoProject[] => {
  return allVideoProjects.filter(
    (p) =>
      p.platform === "youtube" &&
      !p.category.includes("Shorts") &&
      !p.video_link.includes("/shorts/")
  );
};

// Returns ALL vertical short-form projects (Instagram Reels & YouTube Shorts)
export const getShortsAndReelsProjects = (): VideoProject[] => {
  return allVideoProjects.filter(
    (p) =>
      p.platform === "instagram" ||
      p.category.includes("Reels") ||
      p.category.includes("Shorts") ||
      p.video_link.includes("/shorts/")
  );
};

// Helper function to get projects by category or platform
export const getVideoProjectsByCategory = (
  category: string
): VideoProject[] => {
  if (category === "All") {
    return getAllVideoProjects();
  }

  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory === "youtube") {
    return getYouTubeProjects();
  }

  if (normalizedCategory === "reels") {
    return allVideoProjects.filter(
      (p) => p.platform === "instagram" || p.category.includes("Reels")
    );
  }

  if (normalizedCategory === "shorts") {
    return allVideoProjects.filter(
      (p) => p.category.includes("Shorts") || p.video_link.includes("/shorts/")
    );
  }

  if (normalizedCategory === "shorts & reels") {
    return getShortsAndReelsProjects();
  }

  return allVideoProjects.filter((project) =>
    project.category.some((c) => c.toLowerCase() === normalizedCategory)
  );
};

// Helper function to get project by ID
export const getVideoProjectById = (id: string): VideoProject | undefined => {
  return allVideoProjects.find((project) => project.id === id);
};

// Helper function to get all unique categories
export const getVideoCategories = (): string[] => {
  return ["All", "YouTube", "Shorts & Reels"];
};

// Returns categories with project count
export const getVideoCategoriesWithCount = (): {
  category: string;
  count: number;
}[] => {
  const ytCount = getYouTubeProjects().length;
  const reelsCount = getShortsAndReelsProjects().length;

  return [
    { category: "YouTube", count: ytCount },
    { category: "Shorts & Reels", count: reelsCount },
  ];
};

export const getVideoCategoriesWithCountIncludingAll = (): {
  category: string;
  count: number;
}[] => {
  const total = allVideoProjects.length;
  const subCategories = getVideoCategoriesWithCount();
  return [{ category: "All", count: total }, ...subCategories];
};

export function getFeaturedProjects(limit = 6): VideoProject[] {
  return getAllVideoProjects().slice(0, limit);
}

// Helper function to get the proper embed link
export const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  // Handle Shorts
  if (url.includes("youtube.com/shorts/")) {
    const match = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  }

  // Handle Regular YouTube video or shortened youtu.be
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};
