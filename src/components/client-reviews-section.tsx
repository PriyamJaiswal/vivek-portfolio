"use client";

import { useState } from "react";
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

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-16">
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
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4"
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
            className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed"
          >
            Unfiltered feedback and conversations from creators and brands I&apos;ve collaborated with. Click any screenshot to enlarge.
          </m.p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <m.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphismCard
                className="overflow-hidden group cursor-pointer border border-white/10 hover:border-orange-500/40 transition-all duration-300 flex flex-col h-full"
                onClick={() => setSelectedReview(review)}
              >
                {/* Screenshot Container */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-black/60 overflow-hidden">
                  <Image
                    src={review.image_url}
                    alt={review.client_name ? `Review from ${review.client_name}` : "Client review screenshot"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Zoom indicator icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                    <ZoomIn size={15} />
                  </div>
                </div>

                {/* Optional Client Details Card Footer */}
                {(review.client_name || review.review_text) && (
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-white/5 bg-white/[0.02]">
                    {review.client_name && (
                      <h4 className="text-white font-semibold text-sm sm:text-base mb-1">
                        {review.client_name}
                      </h4>
                    )}
                    {review.review_text && (
                      <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 font-light leading-relaxed">
                        &ldquo;{review.review_text}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </GlassmorphismCard>
            </m.div>
          ))}
        </div>
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
