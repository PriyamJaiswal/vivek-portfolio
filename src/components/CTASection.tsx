"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CTASectionProps } from "@/types/cta";
import MagneticButton from "@/components/magnetic-button";

const CTASection = ({
  title,
  description,
  buttonText,
  href,
}: CTASectionProps) => {
  return (
    <section className="relative w-full py-16 px-4 overflow-hidden">
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden border border-white/10 group bg-white/[0.02] backdrop-blur-3xl"
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-orange-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-600/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
            <span className="text-xs sm:text-sm font-semibold text-orange-300 tracking-widest uppercase">
              Open for Collaboration
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            {title || "Ready to create something cinematic?"}
          </h3>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed font-light">
            {description}
          </p>

          <MagneticButton>
            <a
              href={href}
              className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 text-base sm:text-lg font-bold text-black bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-300 hover:to-amber-300 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_35px_rgba(249,115,22,0.35)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center">
                {buttonText}
                <ArrowRight className="ml-2.5 transition-transform group-hover:translate-x-1" size={18} />
              </span>
            </a>
          </MagneticButton>
        </div>
      </m.div>
    </section>
  );
};

export default CTASection;
