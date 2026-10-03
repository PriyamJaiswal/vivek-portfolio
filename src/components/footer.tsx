"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Youtube, Instagram, Heart, Mail } from "lucide-react";
import { socials } from "@/db/socials";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const yt = socials.find((s) => s.name === "YouTube");
  const ig = socials.find((s) => s.name === "Instagram");

  return (
    <footer className="glass-panel border-t border-white/5 mt-20 backdrop-blur-3xl">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-orange-100 to-amber-500 bg-clip-text text-transparent">
              Vivek Singh
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Video Editor &amp; Motion Graphics Designer. I turn raw footage into engaging visual stories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wide uppercase text-xs opacity-70">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm font-medium">
              <Link
                href="/#home"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#projects"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Work
              </Link>
              <Link
                href="/#skills"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Skills
              </Link>
              <Link
                href="/#services"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Services
              </Link>
              <Link
                href="/#contact"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Social & Contact Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white tracking-wide uppercase text-xs opacity-70">
              Connect With Me
            </h4>
            <div className="flex space-x-3">
              <a
                href="mailto:creativeorbitinfo@gmail.com"
                className="group"
                aria-label="Email Vivek Singh"
              >
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-orange-600/20 group-hover:border-orange-500/50 transition-all duration-300">
                  <Mail size={18} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
                </div>
              </a>
              {yt && (
                <a
                  href={yt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Vivek Singh on YouTube"
                >
                  <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-red-600/20 group-hover:border-red-500/50 transition-all duration-300">
                    <Youtube size={18} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                  </div>
                </a>
              )}
              {ig && (
                <a
                  href={ig.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label="Vivek Singh on Instagram"
                >
                  <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-pink-600/20 group-hover:border-pink-500/50 transition-all duration-300">
                    <Instagram size={18} className="text-gray-400 group-hover:text-pink-400 transition-colors" />
                  </div>
                </a>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Direct: <a href="mailto:creativeorbitinfo@gmail.com" className="text-orange-400/80 hover:text-orange-300">creativeorbitinfo@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {currentYear} Vivek Singh. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Template inspired by{" "}
            <a
              href="https://github.com/maruf-pfc/niloy-bhowmick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
            >
              Md. Maruf Sarker
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
