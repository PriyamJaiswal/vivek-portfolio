"use client";

import ServicesAndExperienceSection from "@/components/services-and-experience-section";
import CTASection from "@/components/CTASection";

export default function ServicesContent() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ServicesAndExperienceSection />
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <CTASection
          title="Ready to Start Your Next Project?"
          description="Have footage you want transformed into a captivating visual story? Let's discuss your timeline and creative vision."
          buttonText="Contact Me"
          href="/contact"
        />
      </div>
    </div>
  );
}
