"use client";

import { useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import type { VideoProject } from "@/types/videos";

interface ProjectGridProps {
  initialCategories?: { category: string; count: number }[];
  initialProjects: VideoProject[];
}

const VIDEOS_PER_VIEW = 6;

export default function ProjectGrid({
  initialCategories = [],
  initialProjects,
}: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return initialProjects;
    return initialProjects.filter((p) =>
      p.category.some(
        (c) =>
          c.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory === "YouTube Videos" && c.toLowerCase().includes("youtube")) ||
          (selectedCategory === "Reels & Shorts" &&
            (c.toLowerCase().includes("reels") || c.toLowerCase().includes("shorts")))
      )
    );
  }, [selectedCategory, initialProjects]);

  const hasMultiplePages = filteredProjects.length > VIDEOS_PER_VIEW;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / VIDEOS_PER_VIEW));
  const safePage = currentPage >= totalPages ? 0 : currentPage;

  const handleNextPage = () => {
    if (safePage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (safePage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentSliceStart = safePage * VIDEOS_PER_VIEW;
  const currentSliceEnd = Math.min(currentSliceStart + VIDEOS_PER_VIEW, filteredProjects.length);
  const displayedProjects = hasMultiplePages
    ? filteredProjects.slice(currentSliceStart, currentSliceEnd)
    : filteredProjects;

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

  return (
    <>
      {/* Category Filter Tabs - rendered only when multiple categories exist */}
      {initialCategories && initialCategories.length > 1 && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-12"
        >
          {initialCategories.map(({ category, count }) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(0);
                }}
                className={`
                  relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2
                  ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_25px_rgba(249,115,22,0.4)] scale-105"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }
                `}
              >
                <span>{category}</span>
                <span
                  className={`
                    text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors
                    ${
                      isActive
                        ? "bg-black/30 text-white"
                        : "bg-white/10 text-gray-400"
                    }
                  `}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </m.div>
      )}

      {/* Pagination / Slider Controls Header - shown when > 6 videos exist */}
      {hasMultiplePages && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              Showing <span className="text-white font-semibold">{currentSliceStart + 1}–{currentSliceEnd}</span> of{" "}
              <span className="text-white font-semibold">{filteredProjects.length}</span> videos
            </span>
            {safePage === 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-400/90 font-mono bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                Scroll right for more →
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-mono">
              Page {safePage + 1} of {totalPages}
            </span>
            <Button
              onClick={handlePrevPage}
              size="icon"
              variant="outline"
              aria-label="Previous videos"
              disabled={safePage === 0}
              className="w-10 h-10 rounded-full border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              onClick={handleNextPage}
              size="icon"
              variant="outline"
              aria-label="Next videos"
              disabled={safePage === totalPages - 1}
              className="w-10 h-10 rounded-full border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/40 text-white disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all shadow-md shadow-orange-950/30"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      )}

      {/* Projects Grid Container with Slide / Drag Animation */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={safePage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            drag={hasMultiplePages ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (!hasMultiplePages) return;
              if (info.offset.x < -50 && safePage < totalPages - 1) {
                handleNextPage();
              } else if (info.offset.x > 50 && safePage > 0) {
                handlePrevPage();
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {displayedProjects.map((project, index) => (
              <m.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <ProjectCard project={project} />
              </m.div>
            ))}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Bottom Pagination Dots Indicator */}
      {hasMultiplePages && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > safePage ? 1 : -1);
                setCurrentPage(idx);
              }}
              aria-label={`Go to page ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                safePage === idx
                  ? "w-8 bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          No projects found in this category.
        </div>
      )}
    </>
  );
}
