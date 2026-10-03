import { Metadata } from "next";
import SkillsSection from "@/components/skills-section";
import ToolsSection from "@/components/tools-section";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Skills & Tools",
  description:
    "Video editing, motion graphics, and post-production skills by Vivek Singh.",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <SkillsSection />
      <ToolsSection />
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <CTASection
          title="Looking for a Creative Video Editor?"
          description="From fast-paced social reels to long-form YouTube narratives, I bring technical precision and artistic rhythm to every timeline."
          buttonText="Start a Project"
          href="/#contact"
        />
      </div>
    </div>
  );
}
