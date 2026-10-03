import { Suspense } from "react";
import MouseMoveEffect from "@/components/mouse-move-effect";
import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid";
import ShortsAndReelsSection from "@/components/shorts-and-reels-section";
import SkillsSection from "@/components/skills-section";
import ToolsSection from "@/components/tools-section";
import ServicesAndExperienceSection from "@/components/services-and-experience-section";
import ContactSection from "@/components/contact-section";
import ClientReviewsSection from "@/components/client-reviews-section";
import { getPublicProjects, getPublicReviews } from "@/lib/data";
import { projectToVideoProject } from "@/lib/helper";

// Revalidate public page frequently
export const revalidate = 60;

export default async function HomePage() {
  const [allDbProjects, allReviews] = await Promise.all([
    getPublicProjects(),
    getPublicReviews(),
  ]);

  const youtubeVideos = allDbProjects
    .filter((p) => p.platform === "youtube" && p.format === "video")
    .map(projectToVideoProject);

  const reelsAndShorts = allDbProjects
    .filter((p) => p.platform === "instagram" || p.format === "short")
    .map(projectToVideoProject);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MouseMoveEffect />

      {/* 1. Hero */}
      <Hero />

      {/* 2. YouTube & Featured Projects Section (Landscape 16:9 cards) */}
      {youtubeVideos.length > 0 && (
        <section id="projects" className="py-20 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-600/10 blur-[130px] rounded-full pointer-events-none" />

              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 text-white tracking-tight relative z-10">
                YouTube{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  Videos
                </span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Long-form cinematic edits, documentary-style vlogs, and storytelling projects edited with rhythm and polish.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="text-center py-20 text-gray-400">
                  Loading projects...
                </div>
              }
            >
              <ProjectGrid
                initialProjects={youtubeVideos}
              />
            </Suspense>
          </div>
        </section>
      )}

      {/* 3. Shorts and Reels Section (Vertical 9:16 cards) */}
      {reelsAndShorts.length > 0 && (
        <ShortsAndReelsSection initialProjects={reelsAndShorts} />
      )}

      {/* 4. Editing & Motion Skills */}
      <SkillsSection />

      {/* 5. Tools */}
      <ToolsSection />

      {/* 6. Services & Experience Section */}
      <ServicesAndExperienceSection />

      {/* 7. Client Reviews (Supabase Screenshots & Feedback, auto-hidden if empty) */}
      <ClientReviewsSection reviews={allReviews} />
    </div>
  );
}
