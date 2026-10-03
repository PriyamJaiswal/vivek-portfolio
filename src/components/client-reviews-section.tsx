"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { X, ZoomIn, MessageSquareQuote, ChevronLeft, ChevronRight } from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Review } from "@/types/database";

interface ClientReviewsSectionProps {
  reviews: Review[];
}

export default function ClientReviewsSection({ reviews }: ClientReviewsSectionProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  // Responsive itemsPerPage: 2 on mobile (< 768px), 3 on laptop/desktop (>= 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  if (!reviews || reviews.length === 0) {
    return null;
  }

  const totalPages = Math.max(1, Math.ceil(reviews.length / itemsPerPage));
  const safePage = currentPage >= totalPages ? 0 : currentPage;

  const handleNextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handlePrevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

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
    if (distance > 40 && totalPages > 1) {
      handleNextPage();
    } else if (distance < -40 && totalPages > 1) {
      handlePrevPage();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const currentReviews = reviews.slice(
    safePage * itemsPerPage,
    (safePage + 1) * itemsPerPage
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header & Controls */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="text-center sm:text-left">
            <m.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 backdrop-blur-md text-xs font-semibold text-orange-400 uppercase tracking-widest">
                <MessageSquareQuote size={13} />
                <span>Real Client Feedback</span>
              </div>
            </m.div>

            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
            >
              Client{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Reviews
              </span>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-sm sm:text-base max-w-xl font-light leading-relaxed mt-2"
            >
              Unfiltered feedback and conversations from creators and brands I&apos;ve collaborated with. Click any screenshot to enlarge.
            </m.p>
          </div>

          {/* Navigation Controls if items exceed visible slots */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2.5 shrink-0 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
              <button
                onClick={handlePrevPage}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous reviews"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-mono text-gray-300 px-1 font-semibold">
                {safePage + 1} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-orange-500/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next reviews"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Reviews Grid / Slider */}
        <div
          className="relative min-h-[360px] touch-pan-y select-none"
          style={{ touchAction: "pan-y" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence custom={direction} mode="wait">
            <m.div
              key={safePage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8"
            >
              {currentReviews.map((review) => (
                <GlassmorphismCard
                  key={review.id}
                  className="overflow-hidden group cursor-pointer border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col h-full p-2 sm:p-3"
                  onClick={() => setSelectedReview(review)}
                >
                  {/* Screenshot Container */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-xl bg-black/60 overflow-hidden">
                    <Image
                      src={review.image_url}
                      alt={review.client_name ? `Review from ${review.client_name}` : "Client review screenshot"}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                    {/* Zoom indicator icon */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                      <ZoomIn size={13} className="sm:hidden" />
                      <ZoomIn size={15} className="hidden sm:block" />
                    </div>
                  </div>

                  {/* Optional Client Details Card Footer */}
                  {(review.client_name || review.review_text) && (
                    <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between border-t border-white/5 bg-white/[0.02] mt-2 rounded-lg">
                      {review.client_name && (
                        <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base line-clamp-1 mb-0.5">
                          {review.client_name}
                        </h4>
                      )}
                      {review.review_text && (
                        <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm line-clamp-2 font-light leading-relaxed">
                          &ldquo;{review.review_text}&rdquo;
                        </p>
                      )}
                    </div>
                  )}
                </GlassmorphismCard>
              ))}
            </m.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > safePage ? 1 : -1);
                  setCurrentPage(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === safePage
                    ? "w-6 bg-gradient-to-r from-orange-500 to-amber-400 shadow-md shadow-orange-950/40"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedReview && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Close review screenshot"
            >
              <X size={22} />
            </button>

            {/* Modal Content */}
            <m.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col md:flex-row items-center justify-center rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl"
            >
              <div className="relative w-full max-h-[75vh] md:max-h-[85vh] aspect-[9/16] md:aspect-auto md:w-3/5 h-[65vh] sm:h-[75vh]">
                <Image
                  src={selectedReview.image_url}
                  alt={selectedReview.client_name ? `Review from ${selectedReview.client_name}` : "Client review screenshot"}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {(selectedReview.client_name || selectedReview.review_text) && (
                <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 bg-white/[0.03]">
                  {selectedReview.client_name && (
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {selectedReview.client_name}
                    </h3>
                  )}
                  {selectedReview.review_text && (
                    <blockquote className="text-gray-300 text-sm sm:text-base font-light italic leading-relaxed">
                      &ldquo;{selectedReview.review_text}&rdquo;
                    </blockquote>
                  )}
                  <span className="text-xs text-orange-400 mt-4 uppercase tracking-widest font-mono">
                    Verified Client Collaboration
                  </span>
                </div>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
