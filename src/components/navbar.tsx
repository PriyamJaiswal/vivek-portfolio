"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Youtube,
  Instagram,
  Home,
  Sparkles,
  Film,
  MessageSquare,
} from "lucide-react";
import { Clapperboard } from "./ui/Clapperboard";
import { socials } from "@/db/socials";

const navItems = [
  { name: "Home", href: "/#home", sectionId: "home", icon: Home },
  { name: "Skills", href: "/#skills", sectionId: "skills", icon: Sparkles },
  { name: "Services", href: "/#services", sectionId: "services", icon: Film },
  { name: "Contact", href: "/#contact", sectionId: "contact", icon: MessageSquare },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger transition once user scrolls past the top hero buffer
      const isPastTop = window.scrollY > 80;
      setScrolled(isPastTop);

      // Scroll Spy when on the homepage
      if (pathname === "/") {
        const scrollPosition = window.scrollY + 240;

        // If near bottom of the page, activate Contact
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 160
        ) {
          setActiveSection("contact");
          return;
        }

        const sectionIds = ["contact", "services", "skills", "home"];
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(id);
              return;
            }
          }
        }

        setActiveSection("home");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
    sectionId: string
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setActiveSection(sectionId);
      }
      setIsOpen(false);
    }
  };

  const isItemActive = (sectionId: string, href: string) => {
    if (pathname === "/") {
      return activeSection === sectionId;
    }
    return pathname === `/${sectionId}` || pathname === href;
  };

  const yt = socials.find((s) => s.name === "YouTube");
  const ig = socials.find((s) => s.name === "Instagram");

  return (
    <>
      {/* ===================================================================== */}
      {/* 1. TOP HEADER (Visible at top on Home, smoothly hides on scroll)       */}
      {/* ===================================================================== */}
      <m.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: scrolled ? -120 : 0,
          opacity: scrolled ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] flex justify-center pt-5 pb-0 ${
          scrolled ? "pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-col items-center px-6 sm:px-8 py-3 transition-all duration-300 w-full max-w-7xl bg-transparent border-transparent">
          <div className="w-full flex items-center justify-between">
            <Link
              href="/#home"
              onClick={(e) => handleNavClick(e, "/#home", "home")}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-white/10 group-hover:bg-orange-600 text-orange-400 group-hover:text-white transition-all duration-300">
                <Clapperboard />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-orange-300 transition-colors">
                  Vivek Singh
                </span>
                <span className="text-[10px] text-gray-400 -mt-1 hidden sm:block">
                  Video Editor
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Active Scroll-Spy Pill */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const active = isItemActive(item.sectionId, item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden cursor-pointer"
                  >
                    <span
                      className={`relative z-10 transition-colors ${
                        active
                          ? "text-white font-semibold"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {item.name}
                    </span>

                    {active && (
                      <m.div
                        layoutId="top-nav-pill"
                        className="absolute inset-0 bg-white/10 border border-orange-500/30 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}

                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                  </Link>
                );
              })}
            </div>

            {/* Social Profiles in Top Header */}
            <div className="hidden md:flex items-center space-x-2">
              {yt && (
                <a
                  href={yt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vivek Singh on YouTube"
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-600/20 hover:border-red-500/40 border border-transparent transition-all cursor-pointer"
                >
                  <Youtube size={18} />
                </a>
              )}
              {ig && (
                <a
                  href={ig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vivek Singh on Instagram"
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-orange-600/20 hover:border-orange-500/40 border border-transparent transition-all cursor-pointer"
                >
                  <Instagram size={18} />
                </a>
              )}
            </div>

            {/* Mobile menu button in top header */}
            <div className="md:hidden flex items-center space-x-2">
              {yt && (
                <a
                  href={yt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vivek Singh on YouTube"
                  className="p-1.5 text-gray-400 hover:text-white"
                >
                  <Youtube size={18} />
                </a>
              )}
              {ig && (
                <a
                  href={ig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Vivek Singh on Instagram"
                  className="p-1.5 text-gray-400 hover:text-white"
                >
                  <Instagram size={18} />
                </a>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown when at the top */}
          <AnimatePresence>
            {isOpen && (
              <m.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full overflow-hidden md:hidden bg-black/80 backdrop-blur-2xl rounded-2xl border border-white/10 mt-3 p-3"
              >
                <div className="space-y-1 flex flex-col">
                  {navItems.map((item, i) => {
                    const active = isItemActive(item.sectionId, item.href);
                    return (
                      <m.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                          className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            active
                              ? "text-white bg-orange-600/20 border border-orange-500/30"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </m.div>
                    );
                  })}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </m.nav>

      {/* ===================================================================== */}
      {/* 2. LEFT SIDEBAR / FLOATING NAV DOCK (Slides in when scrolled down)     */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {scrolled && (
          <>
            {/* Desktop Left Dock */}
            <m.aside
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-[100] flex-col items-center"
            >
              <div className="flex flex-col items-center gap-2 p-2.5 rounded-3xl backdrop-blur-2xl bg-black/75 border border-white/15 shadow-[0_0_35px_rgba(0,0,0,0.8)] shadow-orange-950/20">
                {/* Logo Button (Scroll to top) */}
                <Link
                  href="/#home"
                  onClick={(e) => handleNavClick(e, "/#home", "home")}
                  className="group relative p-2.5 rounded-2xl bg-white/5 hover:bg-orange-500 text-orange-400 hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label="Scroll to top"
                >
                  <Clapperboard />
                  {/* Tooltip on right */}
                  <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 px-2.5 py-1 rounded-lg bg-black/90 border border-white/15 text-xs font-semibold text-white whitespace-nowrap shadow-xl">
                    Vivek Singh
                  </span>
                </Link>

                <div className="w-5 h-[1px] bg-white/15 my-1" />

                {/* Nav Links with Icons & Floating Tooltips */}
                <div className="flex flex-col items-center gap-1.5">
                  {navItems.map((item) => {
                    const active = isItemActive(item.sectionId, item.href);
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                        className={`group relative p-2.5 rounded-2xl transition-all duration-300 cursor-pointer ${
                          active
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] scale-105"
                            : "text-gray-400 hover:text-white hover:bg-white/10"
                        }`}
                        aria-label={item.name}
                      >
                        <IconComponent size={18} />

                        {/* Tooltip on right */}
                        <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 px-2.5 py-1 rounded-lg bg-black/90 border border-white/15 text-xs font-medium text-white whitespace-nowrap shadow-xl z-50">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="w-5 h-[1px] bg-white/15 my-1" />

                {/* Social Icons at bottom of left dock */}
                <div className="flex flex-col items-center gap-1">
                  {yt && (
                    <a
                      href={yt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="group relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-red-600/20 transition-all cursor-pointer"
                    >
                      <Youtube size={16} />
                      <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 px-2.5 py-1 rounded-lg bg-black/90 border border-white/15 text-xs text-white whitespace-nowrap shadow-xl z-50">
                        YouTube
                      </span>
                    </a>
                  )}
                  {ig && (
                    <a
                      href={ig.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="group relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-orange-600/20 transition-all cursor-pointer"
                    >
                      <Instagram size={16} />
                      <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 px-2.5 py-1 rounded-lg bg-black/90 border border-white/15 text-xs text-white whitespace-nowrap shadow-xl z-50">
                        Instagram
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </m.aside>

            {/* Mobile Left Floating Action Button when scrolled */}
            <m.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -60, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-4 left-4 z-[100]"
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-11 h-11 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/15 flex items-center justify-center text-orange-400 shadow-xl shadow-orange-950/30 cursor-pointer"
                aria-label="Open navigation menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Mobile Drawer when opened while scrolled */}
              <AnimatePresence>
                {isOpen && (
                  <m.div
                    initial={{ scale: 0.9, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-14 left-0 w-48 bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/15 p-2 shadow-2xl flex flex-col gap-1"
                  >
                    {navItems.map((item) => {
                      const active = isItemActive(item.sectionId, item.href);
                      const IconComponent = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            active
                              ? "bg-orange-600/20 text-white border border-orange-500/30"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <IconComponent size={14} className="text-orange-400" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
