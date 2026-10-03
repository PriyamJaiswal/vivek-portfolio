"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import {
  Film,
  Video,
  Instagram,
  Youtube,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  LogOut,
  Upload,
  AlertTriangle,
  ExternalLink,
  Loader2,
  Check,
  X,
  MessageSquareQuote,
  Sparkles,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Project, Review } from "@/types/database";
import {
  logoutAdminAction,
  createProjectAction,
  updateProjectAction,
  toggleProjectVisibilityAction,
  deleteProjectAction,
  reorderProjectAction,
  createReviewAction,
  updateReviewAction,
  toggleReviewVisibilityAction,
  deleteReviewAction,
  reorderReviewAction,
} from "@/app/admin/actions";
import { detectMedia, fetchYouTubeOEmbedTitle } from "@/lib/video-utils";
import { createClient as createBrowserClient } from "@/lib/supabase/client";

interface AdminDashboardViewProps {
  initialProjects: Project[];
  initialReviews: Review[];
  adminEmail: string;
}

export default function AdminDashboardView({
  initialProjects,
  initialReviews,
  adminEmail,
}: AdminDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "reviews">("projects");
  const [isPending, startTransition] = useTransition();

  // ---------------------------------------------------------------------------
  // Projects State
  // ---------------------------------------------------------------------------
  const [projectFilter, setProjectFilter] = useState<"all" | "youtube" | "shorts">("all");
  const [linkInput, setLinkInput] = useState("");
  const [detectingLink, setDetectingLink] = useState(false);
  const [detectedProject, setDetectedProject] = useState<{
    platform: "youtube" | "instagram";
    format: "video" | "short";
    cleanUrl: string;
    thumbnailUrl: string | null;
    title: string;
    summary: string;
  } | null>(null);

  // Edit Project Modal
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Custom thumbnail state for adding Reels / Shorts
  const [projectThumbnailFile, setProjectThumbnailFile] = useState<File | null>(null);
  const [projectThumbnailPreview, setProjectThumbnailPreview] = useState<string | null>(null);
  const projectThumbnailInputRef = useRef<HTMLInputElement>(null);

  // Custom thumbnail state for editing Reels / Shorts
  const [editProjectThumbnailFile, setEditProjectThumbnailFile] = useState<File | null>(null);
  const [editProjectThumbnailPreview, setEditProjectThumbnailPreview] = useState<string | null>(null);
  const editProjectThumbnailInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------------------------------------
  // Reviews State
  // ---------------------------------------------------------------------------
  const [reviewFile, setReviewFile] = useState<File | null>(null);
  const [reviewPreviewUrl, setReviewPreviewUrl] = useState<string | null>(null);
  const [reviewClientName, setReviewClientName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [uploadingReview, setUploadingReview] = useState(false);

  // Edit Review Modal
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  // Filtered projects
  const filteredProjects = initialProjects.filter((p) => {
    if (projectFilter === "youtube") return p.platform === "youtube" && p.format === "video";
    if (projectFilter === "shorts") return p.platform === "instagram" || p.format === "short";
    return true;
  });

  // ---------------------------------------------------------------------------
  // Projects Handlers
  // ---------------------------------------------------------------------------
  const handleDetectLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkInput.trim()) return;

    setDetectingLink(true);
    const media = detectMedia(linkInput);

    if (!media) {
      toast.error(
        "Unsupported URL. Please enter a valid YouTube video/shorts or Instagram reel link."
      );
      setDetectingLink(false);
      return;
    }

    let prefilledTitle = "";
    if (media.platform === "youtube") {
      const oembed = await fetchYouTubeOEmbedTitle(media.cleanUrl);
      if (oembed) prefilledTitle = oembed;
    }

    setDetectedProject({
      platform: media.platform,
      format: media.format,
      cleanUrl: media.cleanUrl,
      thumbnailUrl: media.defaultThumbnailUrl,
      title: prefilledTitle,
      summary: "",
    });
    setDetectingLink(false);
  };

  const handleSaveDetectedProject = () => {
    if (!detectedProject) return;
    if (!detectedProject.title.trim()) {
      toast.error("Please enter a title for the project.");
      return;
    }

    startTransition(async () => {
      let finalThumbnailUrl = detectedProject.thumbnailUrl;

      // If user uploaded a custom thumbnail (for Reels or Shorts), compress and upload
      if (projectThumbnailFile) {
        try {
          const compressedBlob = await compressImage(projectThumbnailFile);
          const supabase = createBrowserClient();
          const cleanFileName = `thumbnails/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
          const { error: uploadError } = await supabase.storage
            .from("review-screenshots")
            .upload(cleanFileName, compressedBlob, {
              contentType: "image/webp",
              cacheControl: "31536000",
              upsert: false,
            });

          if (uploadError) {
            toast.error("Thumbnail upload failed: " + uploadError.message);
            return;
          }

          const { data: publicUrlData } = supabase.storage
            .from("review-screenshots")
            .getPublicUrl(cleanFileName);

          finalThumbnailUrl = publicUrlData.publicUrl;
        } catch {
          toast.error("Failed to process thumbnail image.");
          return;
        }
      }

      const res = await createProjectAction({
        platform: detectedProject.platform,
        format: detectedProject.format,
        url: detectedProject.cleanUrl,
        title: detectedProject.title.trim(),
        summary: detectedProject.summary.trim() || null,
        thumbnail_url: finalThumbnailUrl,
      });

      if (res.success) {
        toast.success("Project added successfully!");
        setDetectedProject(null);
        setProjectThumbnailFile(null);
        setProjectThumbnailPreview(null);
        setLinkInput("");
      } else {
        toast.error(res.error || "Failed to add project.");
      }
    });
  };

  const handleToggleProjectVisibility = (project: Project) => {
    startTransition(async () => {
      const nextVisible = !project.is_visible;
      const res = await toggleProjectVisibilityAction(project.id, nextVisible);
      if (res.success) {
        toast.success(nextVisible ? "Project is now visible" : "Project hidden");
      } else {
        toast.error(res.error || "Could not toggle visibility.");
      }
    });
  };

  const handleSaveEditedProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;

    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string)?.trim();
    const summary = (formData.get("summary") as string)?.trim() || null;

    if (!title) {
      toast.error("Title cannot be empty.");
      return;
    }

    startTransition(async () => {
      let finalThumbnailUrl: string | undefined = undefined;

      if (editProjectThumbnailFile) {
        try {
          const compressedBlob = await compressImage(editProjectThumbnailFile);
          const supabase = createBrowserClient();
          const cleanFileName = `thumbnails/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
          const { error: uploadError } = await supabase.storage
            .from("review-screenshots")
            .upload(cleanFileName, compressedBlob, {
              contentType: "image/webp",
              cacheControl: "31536000",
              upsert: false,
            });

          if (uploadError) {
            toast.error("Thumbnail upload failed: " + uploadError.message);
            return;
          }

          const { data: publicUrlData } = supabase.storage
            .from("review-screenshots")
            .getPublicUrl(cleanFileName);

          finalThumbnailUrl = publicUrlData.publicUrl;
        } catch {
          toast.error("Failed to process thumbnail image.");
          return;
        }
      }

      const res = await updateProjectAction(editingProject.id, {
        title,
        summary,
        ...(finalThumbnailUrl !== undefined ? { thumbnail_url: finalThumbnailUrl } : {}),
      });

      if (res.success) {
        toast.success("Project updated successfully!");
        setEditingProject(null);
        setEditProjectThumbnailFile(null);
        setEditProjectThumbnailPreview(null);
      } else {
        toast.error(res.error || "Failed to update project.");
      }
    });
  };

  const handleDeleteProject = () => {
    if (!projectToDelete) return;
    startTransition(async () => {
      const res = await deleteProjectAction(projectToDelete.id);
      if (res.success) {
        toast.success("Project deleted.");
        setProjectToDelete(null);
      } else {
        toast.error(res.error || "Failed to delete project.");
      }
    });
  };

  const handleReorderProject = (id: string, direction: "up" | "down") => {
    startTransition(async () => {
      const res = await reorderProjectAction(id, direction);
      if (!res.success) {
        toast.error(res.error || "Failed to reorder.");
      }
    });
  };

  // ---------------------------------------------------------------------------
  // Reviews Handlers (Client-Side Compression + Storage Upload)
  // ---------------------------------------------------------------------------

  // Compress image to WebP with max dimension 1200px and 0.8 quality
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => {
        const maxWidth = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context unavailable"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Image compression failed"));
          },
          "image/webp",
          0.8
        );
      };
      img.onerror = () => reject(new Error("Failed to load image for compression"));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file (PNG, JPG, or WebP).");
        return;
      }
      setReviewFile(file);
      setReviewPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewFile) {
      toast.error("Please select a screenshot to upload.");
      return;
    }

    setUploadingReview(true);
    try {
      // 1. Compress image
      const compressedBlob = await compressImage(reviewFile);

      // 2. Upload to Supabase Storage bucket 'review-screenshots'
      const supabase = createBrowserClient();
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("review-screenshots")
        .upload(cleanFileName, compressedBlob, {
          contentType: "image/webp",
          cacheControl: "31536000",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Storage upload error: ${uploadError.message}`);
      }

      // 3. Get Public URL
      const { data: urlData } = supabase.storage
        .from("review-screenshots")
        .getPublicUrl(uploadData.path);

      const publicUrl = urlData.publicUrl;

      // 4. Insert row in reviews table via Server Action
      const res = await createReviewAction({
        image_url: publicUrl,
        client_name: reviewClientName.trim() || null,
        review_text: reviewText.trim() || null,
      });

      if (res.success) {
        toast.success("Review screenshot added successfully!");
        setReviewFile(null);
        setReviewPreviewUrl(null);
        setReviewClientName("");
        setReviewText("");
      } else {
        toast.error(res.error || "Failed to save review record.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingReview(false);
    }
  };

  const handleToggleReviewVisibility = (review: Review) => {
    startTransition(async () => {
      const nextVisible = !review.is_visible;
      const res = await toggleReviewVisibilityAction(review.id, nextVisible);
      if (res.success) {
        toast.success(nextVisible ? "Review is now visible" : "Review hidden");
      } else {
        toast.error(res.error || "Could not toggle visibility.");
      }
    });
  };

  const handleSaveEditedReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingReview) return;

    const formData = new FormData(e.currentTarget);
    const client_name = (formData.get("client_name") as string)?.trim() || null;
    const review_text = (formData.get("review_text") as string)?.trim() || null;

    startTransition(async () => {
      const res = await updateReviewAction(editingReview.id, { client_name, review_text });
      if (res.success) {
        toast.success("Review updated successfully!");
        setEditingReview(null);
      } else {
        toast.error(res.error || "Failed to update review.");
      }
    });
  };

  const handleDeleteReview = () => {
    if (!reviewToDelete) return;
    startTransition(async () => {
      const res = await deleteReviewAction(reviewToDelete.id, reviewToDelete.image_url);
      if (res.success) {
        toast.success("Review deleted.");
        setReviewToDelete(null);
      } else {
        toast.error(res.error || "Failed to delete review.");
      }
    });
  };

  const handleReorderReview = (id: string, direction: "up" | "down") => {
    startTransition(async () => {
      const res = await reorderReviewAction(id, direction);
      if (!res.success) {
        toast.error(res.error || "Failed to reorder review.");
      }
    });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#090d1a]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Layers size={18} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
                {adminEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink size={12} />
            </a>

            <form action={logoutAdminAction}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="h-8 rounded-lg border-white/15 text-gray-300 hover:text-red-400 hover:border-red-500/40 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <Video size={16} />
            <span>Projects ({initialProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "reviews"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.35)]"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            <MessageSquareQuote size={16} />
            <span>Reviews ({initialReviews.length})</span>
          </button>
        </div>

        {/* ================================================================= */}
        {/* PROJECTS TAB */}
        {/* ================================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            {/* Add Project Card */}
            <GlassmorphismCard className="p-6 sm:p-8 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Plus size={20} className="text-orange-400" />
                <span>Add New Project</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mb-6 font-light">
                Paste any YouTube video, YouTube Short, or Instagram Reel link. Parameters like tracking codes are automatically stripped.
              </p>

              {/* Step 1: Detect Link */}
              <form onSubmit={handleDetectLink} className="flex flex-col sm:flex-row gap-3 mb-6">
                <Input
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or https://www.instagram.com/reel/..."
                  className="h-11 flex-1 bg-black/40 border-white/15 focus:border-orange-500"
                />
                <Button
                  type="submit"
                  disabled={detectingLink || !linkInput.trim()}
                  className="h-11 px-6 bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-xl cursor-pointer"
                >
                  {detectingLink ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Detecting...</span>
                    </span>
                  ) : (
                    <span>Inspect Link</span>
                  )}
                </Button>
              </form>

              {/* Step 2: Confirmation / Edit Form */}
              {detectedProject && (
                <div className="p-5 rounded-2xl bg-black/50 border border-orange-500/30 space-y-4 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    {/* Thumbnail Preview */}
                    <div className="w-full sm:w-48 aspect-video relative rounded-xl overflow-hidden bg-black/80 border border-white/10 shrink-0">
                      {projectThumbnailPreview || detectedProject.thumbnailUrl ? (
                        <Image
                          src={projectThumbnailPreview || detectedProject.thumbnailUrl!}
                          alt="Thumbnail preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-xs p-2 text-center">
                          <Instagram size={28} className="text-pink-500 mb-1" />
                          <span>Instagram Reel</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata edit */}
                    <div className="flex-1 space-y-3 w-full">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            detectedProject.platform === "youtube"
                              ? "bg-red-500/15 text-red-400 border-red-500/30"
                              : "bg-pink-500/15 text-pink-400 border-pink-500/30"
                          }
                        >
                          {detectedProject.platform === "youtube" ? "YouTube" : "Instagram"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-white/5 text-gray-300 border-white/10"
                        >
                          {detectedProject.format === "short" ? "Short (9:16)" : "Video (16:9)"}
                        </Badge>
                        <span className="text-[11px] text-gray-500 font-mono truncate max-w-xs">
                          {detectedProject.cleanUrl}
                        </span>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-300 uppercase block mb-1">
                          Project Title *
                        </label>
                        <Input
                          value={detectedProject.title}
                          onChange={(e) =>
                            setDetectedProject({ ...detectedProject, title: e.target.value })
                          }
                          placeholder="e.g. Travel Vlog | Sacred Banaras Ghats"
                          className="h-10 bg-black/60 border-white/15"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-300 uppercase block mb-1">
                          Summary / Description (Optional)
                        </label>
                        <Textarea
                          value={detectedProject.summary}
                          onChange={(e) =>
                            setDetectedProject({ ...detectedProject, summary: e.target.value })
                          }
                          placeholder="Brief description of the edit and visual storytelling..."
                          className="min-h-[70px] bg-black/60 border-white/15 text-sm"
                        />
                      </div>

                      {/* Custom Thumbnail Upload - ONLY shown for Instagram Reels and YouTube Shorts */}
                      {(detectedProject.platform === "instagram" ||
                        detectedProject.format === "short") && (
                        <div className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/20">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div>
                              <label className="text-xs font-semibold text-orange-300 block mb-0.5">
                                Custom Thumbnail (Reels &amp; Shorts)
                              </label>
                              <p className="text-[11px] text-gray-400">
                                Upload a custom image (PNG, JPG, WebP) as the cover card.
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                ref={projectThumbnailInputRef}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (!file.type.startsWith("image/")) {
                                      toast.error("Please upload a valid image file.");
                                      return;
                                    }
                                    setProjectThumbnailFile(file);
                                    setProjectThumbnailPreview(URL.createObjectURL(file));
                                  }
                                }}
                                accept="image/*"
                                className="hidden"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => projectThumbnailInputRef.current?.click()}
                                className="h-8 text-xs border-orange-500/30 hover:border-orange-500/50 hover:bg-orange-500/10 text-orange-200 cursor-pointer"
                              >
                                <Upload size={13} className="mr-1.5" />
                                {projectThumbnailFile ? "Change Thumbnail" : "Upload Thumbnail"}
                              </Button>
                              {projectThumbnailFile && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setProjectThumbnailFile(null);
                                    setProjectThumbnailPreview(null);
                                  }}
                                  className="h-8 text-xs text-gray-400 hover:text-red-400 cursor-pointer"
                                >
                                  Clear
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-2">
                        <Button
                          onClick={handleSaveDetectedProject}
                          disabled={isPending}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl px-5 h-10 cursor-pointer"
                        >
                          {isPending ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Check size={16} className="mr-1.5" />
                          )}
                          <span>Save Project to Portfolio</span>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setDetectedProject(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </GlassmorphismCard>

            {/* Projects List */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-white">All Projects</h3>

                {/* Sub Filter */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setProjectFilter("all")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      projectFilter === "all"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    All ({initialProjects.length})
                  </button>
                  <button
                    onClick={() => setProjectFilter("youtube")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      projectFilter === "youtube"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    YouTube Videos
                  </button>
                  <button
                    onClick={() => setProjectFilter("shorts")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      projectFilter === "shorts"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Reels &amp; Shorts
                  </button>
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="p-12 text-center border border-white/10 rounded-2xl bg-black/20 text-gray-400 text-sm">
                  No projects found. Add one above!
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProjects.map((p, index) => (
                    <GlassmorphismCard
                      key={p.id}
                      className="p-4 sm:p-5 border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Thumbnail */}
                        <div className="w-20 h-14 sm:w-28 sm:h-18 relative rounded-lg overflow-hidden bg-black/60 shrink-0 border border-white/10">
                          {p.thumbnail_url ? (
                            <Image
                              src={p.thumbnail_url}
                              alt={p.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-pink-500">
                              <Instagram size={22} />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge
                              variant="outline"
                              className={`text-[10px] px-2 py-0.5 ${
                                p.platform === "youtube"
                                  ? "bg-red-500/10 text-red-400 border-red-500/25"
                                  : "bg-pink-500/10 text-pink-400 border-pink-500/25"
                              }`}
                            >
                              {p.platform === "youtube" ? "YouTube" : "Instagram"}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-[10px] px-2 py-0.5 bg-white/5 text-gray-300 border-white/10"
                            >
                              {p.format === "short" ? "Short" : "Video"}
                            </Badge>
                            {!p.is_visible && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-2 py-0.5 bg-yellow-500/10 text-yellow-400 border-yellow-500/25"
                              >
                                Hidden
                              </Badge>
                            )}
                          </div>

                          <h4 className="text-white text-sm sm:text-base font-semibold truncate">
                            {p.title}
                          </h4>
                          {p.summary && (
                            <p className="text-gray-400 text-xs truncate mt-0.5 font-light">
                              {p.summary}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                        {/* Reorder Buttons */}
                        <button
                          onClick={() => handleReorderProject(p.id, "up")}
                          title="Move Up"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
                        >
                          <ArrowUp size={15} />
                        </button>
                        <button
                          onClick={() => handleReorderProject(p.id, "down")}
                          title="Move Down"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
                        >
                          <ArrowDown size={15} />
                        </button>

                        {/* Visibility Toggle */}
                        <button
                          onClick={() => handleToggleProjectVisibility(p)}
                          title={p.is_visible ? "Hide project" : "Show project"}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            p.is_visible
                              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
                          }`}
                        >
                          {p.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => setEditingProject(p)}
                          title="Edit project"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
                        >
                          <Edit2 size={15} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setProjectToDelete(p)}
                          title="Delete project"
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </GlassmorphismCard>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* REVIEWS TAB */}
        {/* ================================================================= */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Add Review Card */}
            <GlassmorphismCard className="p-6 sm:p-8 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Upload size={20} className="text-orange-400" />
                <span>Upload Client Review Screenshot</span>
              </h2>

              {/* Privacy Warning */}
              <div className="my-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-xs sm:text-sm">
                <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-400" />
                <p>
                  <strong>Notice:</strong> Blur phone numbers and private details in the screenshot, and take the client&apos;s permission before publishing.
                </p>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleUploadReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* File input / Drag area */}
                  <div className="md:col-span-1">
                    <label className="text-xs font-semibold text-gray-300 uppercase block mb-1.5">
                      Screenshot Image (JPG/PNG/WebP) *
                    </label>
                    <div className="relative border-2 border-dashed border-white/15 hover:border-orange-500/50 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-black/40 min-h-[180px] flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {reviewPreviewUrl ? (
                        <div className="relative w-full h-36 rounded-lg overflow-hidden">
                          <Image
                            src={reviewPreviewUrl}
                            alt="Screenshot preview"
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <Upload size={28} className="text-orange-400/80" />
                          <span className="text-xs">Click or drag screenshot here</span>
                          <span className="text-[10px] text-gray-500">Auto-compressed to WebP</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadata fields */}
                  <div className="md:col-span-2 space-y-3 flex flex-col justify-between">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 uppercase block mb-1">
                        Client Name (Optional)
                      </label>
                      <Input
                        value={reviewClientName}
                        onChange={(e) => setReviewClientName(e.target.value)}
                        placeholder="e.g. Rahul Sharma (Creator / Brand)"
                        className="h-10 bg-black/50 border-white/15"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 uppercase block mb-1">
                        Highlighted Review Text (Optional)
                      </label>
                      <Textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="e.g. Vivek did an incredible job with the cinematic pacing and sound design! Delivered ahead of schedule."
                        className="min-h-[85px] bg-black/50 border-white/15 text-sm"
                      />
                    </div>

                    <div>
                      <Button
                        type="submit"
                        disabled={uploadingReview || !reviewFile}
                        className="w-full sm:w-auto h-11 px-7 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 text-black font-semibold rounded-xl cursor-pointer"
                      >
                        {uploadingReview ? (
                          <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            <span>Compressing &amp; Uploading...</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Upload size={16} />
                            <span>Save Review Screenshot</span>
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </GlassmorphismCard>

            {/* Reviews List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">All Client Reviews</h3>

              {initialReviews.length === 0 ? (
                <div className="p-12 text-center border border-white/10 rounded-2xl bg-black/20 text-gray-400 text-sm">
                  No review screenshots uploaded yet. Use the form above to publish your first client review!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {initialReviews.map((r) => (
                    <GlassmorphismCard
                      key={r.id}
                      className="p-4 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                    >
                      {/* Screenshot thumbnail */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/60 border border-white/10 mb-3">
                        <Image
                          src={r.image_url}
                          alt={r.client_name || "Client Review"}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Content */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-semibold text-sm truncate">
                            {r.client_name || "Anonymous Client"}
                          </h4>
                          {!r.is_visible && (
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-yellow-500/10 text-yellow-400 border-yellow-500/25"
                            >
                              Hidden
                            </Badge>
                          )}
                        </div>
                        {r.review_text && (
                          <p className="text-gray-400 text-xs line-clamp-2 italic">
                            &ldquo;{r.review_text}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleReorderReview(r.id, "up")}
                            title="Move Up"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            onClick={() => handleReorderReview(r.id, "down")}
                            title="Move Down"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleReviewVisibility(r)}
                            title={r.is_visible ? "Hide review" : "Show review"}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              r.is_visible
                                ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
                            }`}
                          >
                            {r.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>

                          <button
                            onClick={() => setEditingReview(r)}
                            title="Edit details"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            onClick={() => setReviewToDelete(r)}
                            title="Delete review"
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </GlassmorphismCard>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* =================================================================== */}
      {/* MODALS */}
      {/* =================================================================== */}

      {/* 1. Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1424] border border-white/15 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Edit Project</h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditedProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 uppercase block mb-1">
                  Title
                </label>
                <Input
                  name="title"
                  defaultValue={editingProject.title}
                  required
                  className="bg-black/50 border-white/15"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 uppercase block mb-1">
                  Summary
                </label>
                <Textarea
                  name="summary"
                  defaultValue={editingProject.summary || ""}
                  rows={3}
                  className="bg-black/50 border-white/15 text-sm"
                />
              </div>

              {/* Custom Thumbnail for Reels & Shorts ONLY */}
              {(editingProject.platform === "instagram" ||
                editingProject.format === "short") && (
                <div className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-semibold text-orange-300 block mb-0.5">
                        Thumbnail (Reels &amp; Shorts)
                      </label>
                      <p className="text-[11px] text-gray-400">
                        Change the cover card thumbnail image.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={editProjectThumbnailInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (!file.type.startsWith("image/")) {
                              toast.error("Please upload a valid image file.");
                              return;
                            }
                            setEditProjectThumbnailFile(file);
                            setEditProjectThumbnailPreview(URL.createObjectURL(file));
                          }
                        }}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => editProjectThumbnailInputRef.current?.click()}
                        className="h-8 text-xs border-orange-500/30 hover:border-orange-500/50 hover:bg-orange-500/10 text-orange-200 cursor-pointer"
                      >
                        <Upload size={13} className="mr-1.5" />
                        {editProjectThumbnailFile || editingProject.thumbnail_url
                          ? "Change Image"
                          : "Upload Image"}
                      </Button>
                      {editProjectThumbnailFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditProjectThumbnailFile(null);
                            setEditProjectThumbnailPreview(null);
                          }}
                          className="h-8 text-xs text-gray-400 hover:text-red-400 cursor-pointer"
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>

                  {(editProjectThumbnailPreview || editingProject.thumbnail_url) && (
                    <div className="relative w-36 aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/60">
                      <Image
                        src={editProjectThumbnailPreview || editingProject.thumbnail_url!}
                        alt="Project Thumbnail"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditingProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-xl"
                >
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1424] border border-white/15 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Edit Review Details</h3>
              <button
                onClick={() => setEditingReview(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEditedReview} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 uppercase block mb-1">
                  Client Name
                </label>
                <Input
                  name="client_name"
                  defaultValue={editingReview.client_name || ""}
                  className="bg-black/50 border-white/15"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 uppercase block mb-1">
                  Review Text
                </label>
                <Textarea
                  name="review_text"
                  defaultValue={editingReview.review_text || ""}
                  rows={3}
                  className="bg-black/50 border-white/15 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditingReview(null)}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-orange-500 hover:bg-orange-400 text-black font-semibold rounded-xl"
                >
                  {isPending ? <Loader2 size={16} className="animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Delete Project Confirmation Dialog */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1424] border border-red-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to delete &ldquo;{projectToDelete.title}&rdquo;? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setProjectToDelete(null)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteProject}
                disabled={isPending}
                className="bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl"
              >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : "Yes, Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Delete Review Confirmation Dialog */}
      {reviewToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f1424] border border-red-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Delete Review Screenshot?</h3>
            <p className="text-gray-400 text-sm mb-6">
              This will remove the review and permanently delete the screenshot from Supabase storage.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setReviewToDelete(null)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteReview}
                disabled={isPending}
                className="bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl"
              >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : "Yes, Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
