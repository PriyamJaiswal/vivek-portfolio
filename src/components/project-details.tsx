"use client";

import { useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GlassmorphismCard from "@/components/glassmorphism-card";
import {
  ArrowLeft,
  Play,
  Clock,
  Calendar,
  ExternalLink,
  Instagram,
  Youtube,
  Layers,
} from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/helper";
import type { VideoProject } from "@/types/videos";

interface ProjectDetailsProps {
  project: VideoProject;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [igIframeBlocked, setIgIframeBlocked] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    project.platform === "youtube"
      ? `https://img.youtube.com/vi/${project.cover_image || project.id}/maxresdefault.jpg`
      : ""
  );

  const isYouTube = project.platform === "youtube";
  const ytVideoId = project.cover_image || project.id;
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(project.video_link) : null;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button
            asChild
            variant="outline"
            className="pl-4 pr-6 py-2 h-auto text-sm font-medium text-white bg-white/5 border border-white/10 rounded-full hover:bg-orange-500/20 hover:border-orange-500/40 hover:text-orange-300 transition-all backdrop-blur-xl group"
          >
            <Link href="/#projects">
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
              Back to Projects
            </Link>
          </Button>
        </m.div>

        {/* Video Player / Media Container */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <GlassmorphismCard className="p-3 sm:p-5 overflow-hidden">
            {isYouTube ? (
              <div className="aspect-video relative rounded-xl overflow-hidden bg-black border border-white/5">
                {showVideo && embedUrl ? (
                  <iframe
                    src={`${embedUrl}?autoplay=1&modestbranding=1&rel=0`}
                    title={project.video_title}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="autoplay; encrypted-media; picture-in-picture"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={thumbSrc}
                      alt={project.video_title}
                      fill
                      onError={() => {
                        setThumbSrc(
                          `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg`
                        );
                      }}
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        onClick={() => setShowVideo(true)}
                        size="lg"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-8 py-6 shadow-xl shadow-orange-950/50 hover:scale-105 transition-all cursor-pointer"
                      >
                        <Play className="mr-2 fill-white" size={22} />
                        Play Video
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Instagram Reel Container */
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#1c0f05] via-[#120803] to-[#0a0502] border border-orange-500/20 p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[380px]">
                {showVideo && !igIframeBlocked ? (
                  <div className="w-full max-w-[400px] aspect-[9/16] max-h-[600px] relative rounded-xl overflow-hidden shadow-2xl">
                    <iframe
                      src={`https://www.instagram.com/reel/${project.id}/embed/`}
                      title={project.video_title}
                      className="w-full h-full border-0"
                      allowTransparency
                      onError={() => setIgIframeBlocked(true)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center max-w-md">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-500 p-0.5 mb-6 shadow-xl shadow-orange-950/40">
                      <div className="w-full h-full bg-[#180e05] rounded-[22px] flex items-center justify-center text-orange-400">
                        <Instagram size={40} />
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-orange-400 font-semibold mb-2">
                      Instagram Reel
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                      {project.video_title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      {project.summary ||
                        "Short-form vertical edit made for Instagram Reels."}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-full px-8 shadow-lg shadow-orange-950/40 hover:scale-105 transition-all cursor-pointer"
                      >
                        <a
                          href={project.video_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Instagram size={18} />
                          <span>Watch on Instagram</span>
                          <ExternalLink size={14} />
                        </a>
                      </Button>

                      {!showVideo && (
                        <Button
                          onClick={() => setShowVideo(true)}
                          variant="outline"
                          className="rounded-full border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-orange-500/30"
                        >
                          Try In-Page Embed
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </GlassmorphismCard>
        </m.div>

        {/* Project Details Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <GlassmorphismCard className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className={`text-xs font-semibold px-3 py-1 ${
                    isYouTube
                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                      : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                  }`}
                >
                  {isYouTube ? (
                    <span className="flex items-center gap-1.5">
                      <Youtube size={14} /> YouTube Project
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Instagram size={14} /> Instagram Reel
                    </span>
                  )}
                </Badge>

                {project.duration && (
                  <Badge variant="outline" className="border-white/10 text-gray-400 text-xs">
                    <Clock className="mr-1" size={12} />
                    {project.duration}
                  </Badge>
                )}

                {project.publish_date && (
                  <Badge variant="outline" className="border-white/10 text-gray-400 text-xs">
                    <Calendar className="mr-1" size={12} />
                    {new Date(project.publish_date).toLocaleDateString()}
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-white leading-tight">
                {project.video_title}
              </h1>

              {project.summary && (
                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 mb-6">
                  <p className="text-orange-200 text-sm sm:text-base font-medium leading-relaxed">
                    <span className="text-orange-400 font-bold mr-1">Editor Summary:</span>
                    {project.summary}
                  </p>
                </div>
              )}

              <div className="prose prose-invert max-w-none text-gray-300 text-base leading-relaxed">
                <p>{project.video_description}</p>
              </div>
            </div>

            {/* Software Used (Render only if present, never invent) */}
            {project.software_used && project.software_used.length > 0 && (
              <div className="mb-6 pt-6 border-t border-white/5">
                <h3 className="text-sm font-semibold mb-3 text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers size={14} /> Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.software_used.map((software) => (
                    <Badge
                      key={software}
                      variant="outline"
                      className="border-white/10 text-gray-300 bg-white/5"
                    >
                      {software}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4">
              <Button
                asChild
                className={
                  isYouTube
                    ? "bg-red-600 hover:bg-red-700 text-white rounded-full px-6 shadow-lg shadow-red-950/40"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full px-6 shadow-lg shadow-orange-950/40"
                }
              >
                <a
                  href={project.video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {isYouTube ? <Youtube size={16} /> : <Instagram size={16} />}
                  <span>{isYouTube ? "Watch on YouTube" : "Watch on Instagram"}</span>
                  <ExternalLink size={14} />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Link href="/#projects">View More Projects</Link>
              </Button>
            </div>
          </GlassmorphismCard>
        </m.div>
      </div>
    </div>
  );
}
