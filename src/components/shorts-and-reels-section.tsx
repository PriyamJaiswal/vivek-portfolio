"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Youtube,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Sparkles,
} from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoProject } from "@/types/videos";
import { getShortsAndReelsProjects } from "@/lib/helper";

interface ShortsAndReelsSectionProps {
  initialProjects?: VideoProject[];
}

export default function ShortsAndReelsSection({
  initialProjects,
}: ShortsAndReelsSectionProps = {}) {
  const allShortsAndReels = useMemo(() => {
    return initialProjects ?? getShortsAndReelsProjects();
  }, [initialProjects]);

  // Filter state: "all" | "instagram" | "youtube"
  const [selectedFilter, setSelectedFilter] = useState<"all" | "instagram" | "youtube">("all");

  const filteredItems = useMemo(() => {
    if (selectedFilter === "instagram") {
      return allShortsAndReels.filter((p) => p.platform === "instagram");
    }
    if (selectedFilter === "youtube") {
      return allShortsAndReels.filter((p) => p.platform === "youtube");
    }
    return allShortsAndReels;
  }, [allShortsAndReels, selectedFilter]);

  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Sliding page logic
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeModalReel, setActiveModalReel] = useState<VideoProject | null>(null);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const safePage = currentPage >= totalPages ? 0 : currentPage;

  const handleNextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handlePrevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const currentReels = filteredItems.slice(
    safePage * itemsPerPage,
    (safePage + 1) * itemsPerPage
  );

  // Native touch swipe gestures for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 40) {
      handleNextPage();
    } else if (distance < -40) {
      handlePrevPage();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalReel(null);
      }
    };
    if (activeModalReel) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalReel]);

  const igCount = allShortsAndReels.filter((p) => p.platform === "instagram").length;
  const ytCount = allShortsAndReels.filter((p) => p.platform === "youtube").length;

  if (allShortsAndReels.length === 0) {
    return null;
  }

  return (
    <section id="shorts-and-reels" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 relative">
          <div className="absolute -top-10 left-10 w-[300px] h-[300px] bg-orange-600/10 blur-[130px] rounded-full pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={13} />
              <span>Short-Form Vertical Edits</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Shorts &amp;{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Reels
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl font-light leading-relaxed mt-2">
              High-retention 9:16 vertical edits tailored for Instagram Reels and YouTube Shorts featuring punchy cuts, audio sync, and motion hooks.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs text-gray-400 font-mono mr-2">
              Page {safePage + 1} of {totalPages}
            </span>
            <Button
              onClick={handlePrevPage}
              size="icon"
              variant="outline"
              aria-label="Previous slide page"
              className="w-11 h-11 rounded-full border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white cursor-pointer transition-all"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              onClick={handleNextPage}
              size="icon"
              variant="outline"
              aria-label="Next slide page"
              className="w-11 h-11 rounded-full border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white cursor-pointer transition-all"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          <button
            onClick={() => {
              setSelectedFilter("all");
              setCurrentPage(0);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              selectedFilter === "all"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-950/40"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            <span>All Shorts &amp; Reels</span>
            <span className="bg-black/30 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              {allShortsAndReels.length}
            </span>
          </button>

          <button
            onClick={() => {
              setSelectedFilter("instagram");
              setCurrentPage(0);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              selectedFilter === "instagram"
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-pink-950/40"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            <Instagram size={13} />
            <span>Instagram Reels</span>
            <span className="bg-black/30 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
              {igCount}
            </span>
          </button>

          {ytCount > 0 && (
            <button
              onClick={() => {
                setSelectedFilter("youtube");
                setCurrentPage(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                selectedFilter === "youtube"
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-950/40"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              <Youtube size={13} />
              <span>YouTube Shorts</span>
              <span className="bg-black/30 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                {ytCount}
              </span>
            </button>
          )}
        </div>

        {/* Sliding Page Content with touch swipe support */}
        <div
          className="relative min-h-[560px] touch-pan-y select-none"
          style={{ touchAction: "pan-y" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence custom={direction} mode="wait">
            <m.div
              key={`${selectedFilter}-${safePage}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) {
                  handleNextPage();
                } else if (info.offset.x > 60) {
                  handlePrevPage();
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {currentReels.map((reel) => {
                const isYouTube = reel.platform === "youtube";
                return (
                  <GlassmorphismCard
                    key={reel.id}
                    className="group hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-950/30 transition-all duration-500 p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Vertical 9:14 Canvas Box */}
                      <div className="relative aspect-[9/14] w-full rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-[#1c0f05] via-[#241105] to-[#0e0602] border border-orange-500/20 flex flex-col justify-between p-6 shadow-xl">
                        {/* Background Thumbnail for Reels & Shorts */}
                        {(() => {
                          const thumbUrl =
                            reel.thumbnail ||
                            (reel.cover_image && reel.cover_image.startsWith("http")
                              ? reel.cover_image
                              : null) ||
                            (isYouTube && (reel.cover_image || reel.id)
                              ? `https://img.youtube.com/vi/${reel.cover_image || reel.id}/hqdefault.jpg`
                              : null);

                          return thumbUrl ? (
                            <div className="absolute inset-0 z-0">
                              <Image
                                src={thumbUrl}
                                alt={reel.video_title}
                                fill
                                className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
                            </div>
                          ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.22),transparent_70%)]" />
                          );
                        })()}

                        {/* Top Badge */}
                        <div className="relative z-10 flex items-center justify-between">
                          <Badge
                            className={`border-none px-2.5 py-1 text-xs font-semibold ${
                              isYouTube
                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                : "bg-gradient-to-r from-orange-500/30 to-pink-500/30 text-orange-200 border border-orange-500/30"
                            }`}
                          >
                            {isYouTube ? (
                              <span className="flex items-center gap-1.5">
                                <Youtube size={13} /> YouTube Short
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5">
                                <Instagram size={13} /> Instagram Reel
                              </span>
                            )}
                          </Badge>
                        </div>

                        {/* Center Icon & Play Action */}
                        <div className="relative z-10 my-auto flex flex-col items-center text-center">
                          <button
                            onClick={() => setActiveModalReel(reel)}
                            aria-label={`Preview ${reel.video_title}`}
                            className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-pink-500 p-0.5 mb-4 shadow-xl shadow-orange-950/50 group-hover:scale-110 transition-transform duration-300 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-400"
                          >
                            <div className="w-full h-full bg-[#180e05] rounded-[22px] flex items-center justify-center text-orange-400 group-hover:text-white transition-colors">
                              <Play className="ml-1 fill-current" size={24} />
                            </div>
                          </button>
                          <span className="text-xs uppercase tracking-widest text-orange-300/80 font-medium">
                            Vertical Edit
                          </span>
                        </div>

                        {/* Bottom Tagline inside canvas */}
                        <div className="relative z-10 text-center">
                          <p className="text-white font-bold text-base line-clamp-2 drop-shadow-md">
                            {reel.video_title}
                          </p>
                        </div>
                      </div>

                      {/* Title & Description Below Canvas */}
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors line-clamp-1">
                        {reel.video_title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                        {reel.summary || reel.video_description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                      <Button
                        onClick={() => setActiveModalReel(reel)}
                        size="sm"
                        variant="ghost"
                        className="text-xs font-semibold text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-full cursor-pointer"
                      >
                        <Play size={13} className="mr-1 fill-current" />
                        Preview
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full px-4 text-xs font-semibold shadow-md shadow-orange-950/40 cursor-pointer"
                      >
                        <a
                          href={reel.video_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          {isYouTube ? (
                            <span>Watch Short</span>
                          ) : (
                            <span>Watch Reel</span>
                          )}
                          <ExternalLink size={12} />
                        </a>
                      </Button>
                    </div>
                  </GlassmorphismCard>
                );
              })}
            </m.div>
          </AnimatePresence>
        </div>

        {/* Page Dots Indicator */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentPage ? 1 : -1);
                  setCurrentPage(idx);
                }}
                aria-label={`Go to slide page ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  safePage === idx
                    ? "w-8 bg-gradient-to-r from-orange-500 to-amber-400 shadow-md shadow-orange-950/50"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Preview for Shorts and Reels */}
      <AnimatePresence>
        {activeModalReel && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveModalReel(null)}
          >
            <m.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#120a04] border border-orange-500/30 rounded-3xl p-6 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveModalReel(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-4">
                <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-widest block mb-1">
                  {activeModalReel.platform === "youtube" ? "YouTube Short" : "Instagram Reel"}
                </span>
                <h3 className="text-xl font-bold text-white line-clamp-1">
                  {activeModalReel.video_title}
                </h3>
              </div>

              {/* Embed or Direct Fallback */}
              <div className="aspect-[9/16] w-full max-h-[500px] rounded-2xl overflow-hidden bg-black mb-6 relative">
                {activeModalReel.platform === "youtube" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeModalReel.cover_image || activeModalReel.id}?autoplay=1&controls=1&rel=0`}
                    title={activeModalReel.video_title}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1f0e04] to-black">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-pink-500 p-0.5 mb-4 shadow-lg shadow-orange-950/40">
                      <div className="w-full h-full bg-[#180e05] rounded-[14px] flex items-center justify-center text-orange-400">
                        <Instagram size={36} />
                      </div>
                    </div>
                    <p className="text-white font-bold text-base mb-2">
                      {activeModalReel.video_title}
                    </p>
                    <p className="text-gray-400 text-xs mb-6 max-w-xs leading-relaxed">
                      {activeModalReel.summary || "Short-form vertical edit made for Instagram Reels."}
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-full px-6 shadow-lg shadow-orange-950/40 cursor-pointer"
                    >
                      <a
                        href={activeModalReel.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Instagram size={16} />
                        <span>Watch on Instagram</span>
                        <ExternalLink size={14} />
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/20 text-white hover:bg-white/10 text-xs"
                >
                  <a
                    href={activeModalReel.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink size={12} />
                  </a>
                </Button>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
