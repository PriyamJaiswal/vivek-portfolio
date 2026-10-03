import { Metadata } from "next";
import AboutSection from "@/components/about-section";
import ToolsSection from "@/components/tools-section";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Vivek Singh, video editor and motion graphics designer focused on storytelling, pacing, and cinematic visuals.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <AboutSection />
      <ToolsSection />
      <div className="max-w-5xl mx-auto px-4 mt-12">
        <CTASection
          title="Ready to Craft Something Cinematic?"
          description="Let's transform your footage into an unforgettable visual story."
          buttonText="Get In Touch"
          href="/#contact"
        />
      </div>
    </div>
  );
}
