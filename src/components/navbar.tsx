"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Youtube, Instagram } from "lucide-react";
import { Clapperboard } from "./ui/Clapperboard";
import { socials } from "@/db/socials";

const navItems = [
  { name: "Home", href: "/#home", sectionId: "home" },
  { name: "Skills", href: "/#skills", sectionId: "skills" },
  { name: "Services", href: "/#services", sectionId: "services" },
  { name: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll Spy when on the homepage
      if (pathname === "/") {
        const scrollPosition = window.scrollY + 240; // comfortable offset for header

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
    e: React.MouseEvent<HTMLAnchorElement>,
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
    <m.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] flex justify-center transition-all duration-300 ${
        scrolled ? "pt-4 pb-0" : "pt-5 pb-0"
      }`}
    >
      <div
        className={`
          flex flex-col items-center
          px-6 sm:px-8 py-3
          transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] border
          ${
            scrolled || isOpen
              ? "w-[95%] max-w-5xl rounded-3xl backdrop-blur-xl md:backdrop-blur-3xl bg-black/60 border border-white/10 shadow-2xl shadow-orange-950/20"
              : "w-full max-w-7xl bg-transparent border-transparent"
          }
        `}
      >
        <div className="w-full flex items-center justify-between">
          <Link
            href="/#home"
            onClick={(e) => handleNavClick(e, "/#home", "home")}
            className="flex items-center space-x-3 group"
          >
            <div
              className={`p-2 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "bg-white/5 group-hover:bg-orange-600 text-orange-400 group-hover:text-white"
                  : "bg-white/10 group-hover:bg-orange-600 text-orange-400 group-hover:text-white"
              }`}
            >
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
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden"
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
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 border border-orange-500/30 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.2)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}

                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                </Link>
              );
            })}
          </div>

          {/* Social Profiles in Navbar */}
          <div className="hidden md:flex items-center space-x-2">
            {yt && (
              <a
                href={yt.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vivek Singh on YouTube"
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-600/20 hover:border-red-500/40 border border-transparent transition-all"
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
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-orange-600/20 hover:border-orange-500/40 border border-transparent transition-all"
              >
                <Instagram size={18} />
              </a>
            )}
          </div>

          {/* Mobile menu button */}
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
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden md:hidden"
            >
              <div className="pt-4 pb-2 space-y-2 flex flex-col">
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
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
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
  );
}
