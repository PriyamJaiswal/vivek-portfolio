import { describe, it, expect } from "vitest";
import {
  getYouTubeEmbedUrl,
  getAllVideoProjects,
  getVideoProjectsByCategory,
  getVideoProjectById,
  getVideoCategoriesWithCountIncludingAll,
  getYouTubeProjects,
  getShortsAndReelsProjects,
} from "./helper";

describe("getYouTubeEmbedUrl", () => {
  it("should return null for empty or invalid urls", () => {
    expect(getYouTubeEmbedUrl("")).toBeNull();
    expect(getYouTubeEmbedUrl(null as unknown as string)).toBeNull();
    expect(getYouTubeEmbedUrl("https://google.com")).toBeNull();
  });

  it("should parse regular YouTube watch urls", () => {
    expect(
      getYouTubeEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    ).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");

    expect(
      getYouTubeEmbedUrl("https://youtube.com/watch?v=dQw4w9WgXcQ&t=10s")
    ).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });

  it("should parse shortened youtu.be urls", () => {
    expect(getYouTubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("should parse YouTube Shorts urls", () => {
    expect(
      getYouTubeEmbedUrl("https://www.youtube.com/shorts/tPEE9ZwTmy0")
    ).toBe("https://www.youtube.com/embed/tPEE9ZwTmy0");
  });

  it("should parse already embedded urls", () => {
    expect(
      getYouTubeEmbedUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")
    ).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
  });
});

describe("Project and Category Helpers", () => {
  it("should return 13 total projects for Vivek", () => {
    const projects = getAllVideoProjects();
    expect(projects.length).toBe(13);
  });

  it("should filter YouTube projects correctly", () => {
    const ytProjects = getVideoProjectsByCategory("YouTube");
    expect(ytProjects.length).toBe(6);
    ytProjects.forEach((p) => {
      expect(p.platform).toBe("youtube");
    });
  });

  it("should filter Reels projects correctly", () => {
    const reelProjects = getVideoProjectsByCategory("Reels");
    expect(reelProjects.length).toBe(5);
    reelProjects.forEach((p) => {
      expect(p.platform).toBe("instagram");
    });
  });

  it("should retrieve a project by its id", () => {
    const project = getVideoProjectById("4Zj6cilMYI8");
    expect(project).toBeDefined();
    expect(project?.video_title).toContain("A Day in the Future");
  });

  it("should return 6 YouTube projects using getYouTubeProjects", () => {
    const ytProjects = getYouTubeProjects();
    expect(ytProjects.length).toBe(6);
  });

  it("should return 7 Shorts & Reels projects using getShortsAndReelsProjects", () => {
    const reelProjects = getShortsAndReelsProjects();
    expect(reelProjects.length).toBe(7);
  });
});
