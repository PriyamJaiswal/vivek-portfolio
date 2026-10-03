"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import {
  Mail,
  Youtube,
  Instagram,
  Download,
  Send,
  Sparkles,
} from "lucide-react";
import { contactDetails } from "@/db/socials";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const email = contactDetails.email || "viveksingh@gmail.com";
  const whatsappNumber = contactDetails.whatsappNumber || "9935896755";
  const whatsappDisplay = "+91 99358 96755";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Vivek, I came across your portfolio and would like to collaborate on a video editing project!"
  )}`;

  return (
    <footer id="contact" className="relative pt-12 pb-14 px-4 sm:px-6 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================= */}
        {/* Main Modern Banner: 11. Contact / Hire Me (Exact Layout)   */}
        {/* ========================================================= */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-[#070b14]/90 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Studio Setup Image Background (visible on right side with smooth blend) */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 pointer-events-none select-none overflow-hidden opacity-30 lg:opacity-60">
            <Image
              src="/footer-studio-setup.jpg"
              alt="Video Editing Studio Setup"
              fill
              className="object-cover object-center lg:object-right"
              priority
            />
            {/* Smooth gradient blends: from card background to image */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#070b14] via-[#070b14]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/40 via-transparent to-[#070b14]" />
          </div>

          {/* Banner Inner Grid */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* ---------------------------------------------------- */}
            {/* LEFT COLUMN: Get In Touch & Action Buttons (5 cols)   */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400 mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                GET IN TOUCH
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Let&apos;s Work Together
              </h2>

              <p className="text-gray-300/80 text-sm sm:text-base font-light leading-relaxed mb-7 max-w-md">
                Have a project in mind? Feel free to reach out. I&apos;d love to hear about your ideas and help you bring them to life.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm shadow-xl shadow-orange-950/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Send size={15} className="rotate-[-20deg]" />
                  <span>Contact Me</span>
                </a>

                <a
                  href={`mailto:${email}?subject=${encodeURIComponent("Resume Request - Vivek Singh")}&body=${encodeURIComponent("Hi Vivek, I came across your video editor portfolio and would like to request a copy of your resume.")}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-medium text-sm hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* MIDDLE COLUMN: Direct Channels List (4 cols)         */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5">
              {/* 1. Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate block">
                    {email}
                  </span>
                </div>
              </a>

              {/* 2. WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-2.072-.487-1.765-.722-2.884-2.535-2.973-2.653-.088-.118-.707-.939-.707-1.791 0-.853.447-1.272.607-1.446.16-.174.348-.217.464-.217.116 0 .232.001.332.006.107.005.25-.041.391.298.144.348.493 1.202.537 1.29.044.088.073.19.015.305-.058.117-.087.19-.174.292-.087.102-.184.227-.263.305-.088.087-.18.181-.077.356.103.175.457.753.981 1.219.675.599 1.244.786 1.42.873.175.088.278.074.382-.044.103-.118.447-.521.567-.7.12-.179.24-.15.405-.089.166.061 1.05.495 1.23.585.18.09.3.135.344.21.045.075.045.436-.099.841z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    WhatsApp
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate block">
                    {whatsappDisplay}
                  </span>
                </div>
              </a>

              {/* 3. YouTube */}
              <a
                href="https://www.youtube.com/@Cinemagic.22"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-105 transition-transform">
                  <Youtube size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    YouTube
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors truncate block">
                    @Cinemagic.22
                  </span>
                </div>
              </a>

              {/* 4. LinkedIn */}
              <a
                href="https://www.linkedin.com/in/viveksingh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
                  {/* LinkedIn SVG Icon */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    LinkedIn
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors truncate block">
                    linkedin.com/in/viveksingh
                  </span>
                </div>
              </a>

              {/* 5. Instagram */}
              <a
                href="https://www.instagram.com/cinemagic.22/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Instagram size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                    Instagram
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors truncate block">
                    @vivek.editz
                  </span>
                </div>
              </a>
            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT COLUMN: Studio Aesthetic & Handwritten Script   */}
            {/* ---------------------------------------------------- */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center text-center lg:text-right mt-4 lg:mt-0 relative">
              <div className="relative inline-block max-w-xs">
                {/* Handwritten Calligraphic Text */}
                <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-white font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] tracking-wide leading-snug">
                  Let&apos;s Create Something{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 bg-clip-text text-transparent font-medium">
                    Amazing!
                  </span>
                </p>

                {/* Hand-drawn curved underline accent SVG */}
                <svg
                  className="w-44 sm:w-52 h-5 text-amber-400 mx-auto lg:ml-auto lg:mr-0 mt-2 opacity-90 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                  viewBox="0 0 180 20"
                  fill="none"
                >
                  <path
                    d="M4 14C50 4 125 3 176 15"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="mt-4 flex items-center justify-center lg:justify-end gap-1.5 text-xs text-amber-300/80 font-mono">
                  <Sparkles size={12} className="text-amber-400" />
                  <span>Cinematic visual storytelling</span>
                </div>
              </div>
            </div>
          </div>
        </m.div>

        {/* ========================================================= */}
        {/* Bottom Sub-Footer: Navigation & Copyright Bar              */}
        {/* ========================================================= */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-bold text-white tracking-wider text-sm bg-gradient-to-r from-white via-orange-100 to-amber-400 bg-clip-text text-transparent">
              Vivek Singh
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>Video Editor &amp; Motion Graphics Designer</span>
          </div>

          {/* Quick Navigation Anchor Links */}
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6 font-medium text-gray-400">
            <Link href="/#home" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <Link href="/#projects" className="hover:text-orange-400 transition-colors">
              YouTube
            </Link>
            <Link href="/#reels" className="hover:text-orange-400 transition-colors">
              Shorts &amp; Reels
            </Link>
            <Link href="/#skills" className="hover:text-orange-400 transition-colors">
              Skills
            </Link>
            <Link href="/#experience" className="hover:text-orange-400 transition-colors">
              Experience
            </Link>
            <Link href="/#reviews" className="hover:text-orange-400 transition-colors">
              Reviews
            </Link>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for freelance &amp; full-time</span>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-gray-600">
          <p>© {currentYear} Vivek Singh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
