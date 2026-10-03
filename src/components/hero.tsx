"use client";

import Image from "next/image";
import { m } from "framer-motion";
import {
  Play,
  Mail,
  Film,
  Smartphone,
  Sparkles,
  Volume2,
} from "lucide-react";
import MagneticButton from "./magnetic-button";
import { useLenis } from "lenis/react";

const specialties = [
  { label: "Cinematic Videos", icon: Film },
  { label: "Reels & Shorts", icon: Smartphone },
  { label: "YouTube Editing", icon: Play },
  { label: "Motion Graphics", icon: Sparkles },
  { label: "Sound Design", icon: Volume2 },
];

export default function Hero() {
  const lenis = useLenis();

  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (lenis) {
      lenis.scrollTo(id, {
        duration: 1.4,
        offset: -80,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.querySelector(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Cinematic Studio Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      {/* Warm Ambient Glows */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-[20%] left-[5%] w-[650px] h-[500px] bg-amber-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[5%] w-[550px] h-[450px] bg-orange-600/12 rounded-full blur-[130px]" />
        <div className="absolute -bottom-[10%] left-1/3 w-[500px] h-[300px] bg-red-700/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Two-Column Cinematic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill Badge */}
            <m.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="mb-6 sm:mb-7"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-amber-300 tracking-wide">
                  Available for Freelance &amp; Remote Projects
                </span>
              </div>
            </m.div>

            {/* Main Headline */}
            <m.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black tracking-tight text-white leading-[1.06] mb-5"
            >
              Hi, I&apos;m <br />
              Vivek{" "}
              <span className="text-amber-500 drop-shadow-[0_0_35px_rgba(245,158,11,0.35)]">
                Singh
              </span>
            </m.h1>

            {/* Role / Subtitle */}
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="text-xl sm:text-2xl md:text-[26px] font-bold text-gray-100 mb-4 tracking-tight"
            >
              Video Editor &amp; Motion Graphics Designer
            </m.h2>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="text-base sm:text-lg text-gray-300/90 font-normal leading-relaxed max-w-xl mb-8 sm:mb-9"
            >
              I turn raw footage into engaging visual stories. Delivering cinematic pacing, seamless motion graphic accents, and color-graded impact for creators and premium brands.
            </m.p>

            {/* Action Buttons */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection("#projects", e)}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-black bg-[#f59e0b] hover:bg-amber-400 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:scale-[1.02] cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black text-black group-hover:scale-110 transition-transform" />
                  <span>View Showreel</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection("#contact", e)}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-medium text-gray-200 bg-[#0d131f]/90 hover:bg-[#162032] border border-white/10 hover:border-amber-500/40 rounded-xl transition-all duration-300 hover:text-white cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-gray-300 group-hover:text-amber-400 transition-colors" />
                  <span>Contact Me</span>
                </a>
              </MagneticButton>
            </m.div>
          </div>

          {/* Right Column: Photographer / Cinematic Rig Card */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 w-full max-w-lg lg:max-w-none mx-auto"
          >
            <div className="relative group">
              {/* Amber rim glow effect behind frame */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/25 via-orange-500/15 to-transparent rounded-[26px] blur-xl opacity-60 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0a0f18] shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
                <Image
                  src="/hero-cinematic.png"
                  alt="Cinematic videographer with camera rig on city rooftop"
                  width={856}
                  height={590}
                  priority
                  className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </m.div>
        </div>

        {/* Bottom Specialties Row */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 1, 0.5, 1] }}
          className="mt-14 sm:mt-18 pt-6 border-t border-white/5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {specialties.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 sm:px-5 py-3.5 rounded-xl bg-[#0d131f]/85 border border-white/10 hover:border-amber-500/40 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-md shadow-sm group cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <Icon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </m.div>
      </div>
    </section>
  );
}
