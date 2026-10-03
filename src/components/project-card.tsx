"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { Play, X, Instagram, Youtube, ExternalLink, ArrowRight } from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoProject } from "@/types/videos";

interface ProjectCardProps {
  project: VideoProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    project.thumbnail
      ? project.thumbnail
      : project.platform === "youtube"
      ? `https://img.youtube.com/vi/${project.cover_image || project.id}/maxresdefault.jpg`
      : ""
  );
  const cardRef = useRef<HTMLDivElement>(null);

  // Stop playing if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPlaying]);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (project.platform === "youtube") {
      setIsPlaying(true);
    }
  };

  const handleStopClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsPlaying(false);
  };

  const isYouTube = project.platform === "youtube";
  const ytVideoId = project.cover_image || project.id;

  return (
    <div ref={cardRef} className="h-full">
      <GlassmorphismCard className="h-full group hover:shadow-2xl hover:shadow-orange-950/20 hover:border-orange-500/30 transition-all duration-500 flex flex-col">
        <div className="flex flex-col h-full p-5">
          {/* Media Area */}
          <div className="relative overflow-hidden rounded-2xl aspect-video mb-5 shadow-lg bg-black isolate border border-white/5">
            <AnimatePresence mode="wait">
              {isPlaying && isYouTube ? (
                <m.div
                  key="video-player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`}
                    title={project.video_title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                  <button
                    onClick={handleStopClick}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full backdrop-blur-md transition-colors z-30 cursor-pointer"
                    aria-label="Close preview"
                  >
                    <X size={16} />
                  </button>
                </m.div>
              ) : isYouTube ? (
                <div
                  key="yt-thumbnail"
                  className="relative w-full h-full cursor-pointer group/thumb"
                  onClick={handlePlayClick}
                >
                  <Image
                    src={thumbSrc}
                    alt={project.video_title}
                    fill
                    onError={() => {
                      // Fallback to hqdefault if maxresdefault is unavailable
                      setThumbSrc(
                        `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg`
                      );
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-black/50 transition-colors duration-300 flex items-center justify-center backdrop-blur-[0px] group-hover/thumb:backdrop-blur-[1px]">
                    <div className="w-14 h-14 rounded-full bg-orange-500/90 group-hover/thumb:bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-950/40 transform group-hover/thumb:scale-110 transition-all duration-300">
                      <Play className="ml-0.5 fill-white text-white" size={24} />
                    </div>
                  </div>

                  {project.duration && (
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                      {project.duration}
                    </div>
                  )}
                </div>
              ) : (
                /* Instagram Reel: Tasteful dark-to-orange gradient placeholder */
                <Link
                  key="ig-placeholder"
                  href={`/project/${project.id}`}
                  className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#180e05] via-[#2a1305] to-[#120703] border border-orange-500/20 group/ig cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(249,115,22,0.18),transparent_70%)]" />
                  
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 mb-3 group-hover/ig:scale-110 transition-transform duration-300 shadow-lg shadow-orange-950/40">
                    <div className="w-full h-full bg-[#180e05] rounded-[14px] flex items-center justify-center text-orange-400">
                      <Instagram size={28} />
                    </div>
                  </div>

                  <p className="relative z-10 text-white font-semibold text-sm line-clamp-2 px-2 group-hover/ig:text-orange-300 transition-colors">
                    {project.video_title}
                  </p>
                  <span className="relative z-10 text-[11px] text-orange-400/80 mt-1 uppercase tracking-wider font-medium">
                    Instagram Reel
                  </span>
                </Link>
              )}
            </AnimatePresence>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Category / Platform Badges */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge
                  variant="secondary"
                  className={`text-[11px] font-medium border-none px-2.5 py-0.5 ${
                    isYouTube
                      ? "bg-red-500/15 text-red-300"
                      : "bg-orange-500/15 text-orange-300"
                  }`}
                >
                  {isYouTube ? (
                    <span className="flex items-center gap-1">
                      <Youtube size={12} /> YouTube
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Instagram size={12} /> Reel
                    </span>
                  )}
                </Badge>
              </div>

              {/* Title */}
              <Link href={`/project/${project.id}`} className="block group/title">
                <h3 className="text-lg font-bold mb-2 text-white group-hover/title:text-orange-300 transition-colors line-clamp-2 leading-snug">
                  {project.video_title}
                </h3>
              </Link>

              {/* Summary / Description */}
              <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">
                {project.summary || project.video_description}
              </p>
            </div>

            {/* Actions (Only real fields, no invented client or date) */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
              <Link href={`/project/${project.id}`} className="w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-9 px-4 text-xs font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-orange-500/20 hover:border-orange-500/40 hover:text-orange-300 transition-all cursor-pointer w-full sm:w-auto flex items-center justify-center gap-1.5"
                >
                  <span>Details</span>
                  <ArrowRight size={13} />
                </Button>
              </Link>

              <a
                href={project.video_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                aria-label={isYouTube ? "Watch on YouTube" : "Watch on Instagram"}
              >
                <span>{isYouTube ? "YouTube" : "Instagram"}</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </GlassmorphismCard>
    </div>
  );
}
