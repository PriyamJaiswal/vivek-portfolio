import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/navbar";
import MouseMoveEffect from "@/components/mouse-move-effect";
import JumpToTop from "@/components/jump-to-top";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import FramerLazyMotion from "@/components/framer-lazy-motion";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vivek Singh – Video Editor & Motion Graphics Designer",
    template: "%s | Vivek Singh",
  },
  description:
    "I turn raw footage into engaging visual stories. Video editor focused on storytelling, pacing, motion graphics, and cinematic visuals for YouTube, social media and brands.",
  keywords: [
    "Vivek Singh",
    "Video Editor",
    "Motion Graphics Designer",
    "Cinematic Videos",
    "Reels & Shorts",
    "YouTube Editing",
    "Motion Graphics",
    "Sound Design",
    "Color Grading",
    "Visual Storytelling",
    "Premiere Pro",
    "After Effects",
    "DaVinci Resolve",
    "Post Production",
  ],
  authors: [{ name: "Vivek Singh" }],
  creator: "Vivek Singh",
  publisher: "Vivek Singh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Vivek Singh – Video Editor & Motion Graphics Designer",
    description:
      "I turn raw footage into engaging visual stories. Video editor focused on storytelling, pacing, motion graphics, and cinematic visuals.",
    siteName: "Vivek Singh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Singh – Video Editor & Motion Graphics Designer",
    description:
      "I turn raw footage into engaging visual stories. Video editor focused on storytelling, pacing, motion graphics, and cinematic visuals.",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Video Editing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#090a0f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vivek Singh",
              jobTitle: "Video Editor & Motion Graphics Designer",
              description:
                "I'm a video editor focused on storytelling, pacing, motion graphics and cinematic visuals. I enjoy transforming raw footage into engaging content for YouTube, social media and brands.",
              sameAs: [
                "https://www.youtube.com/@Cinemagic.22",
                "https://www.instagram.com/cinemagic.22/",
              ],
              knowsAbout: [
                "Video Editing",
                "Motion Graphics",
                "Cinematic Editing",
                "Sound Design",
                "Color Grading",
                "YouTube Video Editing",
                "Shorts & Reels",
                "Adobe Premiere Pro",
                "Adobe After Effects",
                "DaVinci Resolve",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen text-white bg-[#07090e]`}
      >
        <div className="grid-background-large min-h-screen">
          <SmoothScroll>
            <FramerLazyMotion>
              <MouseMoveEffect />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <JumpToTop />
              <Toaster position="top-center" />
            </FramerLazyMotion>
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
