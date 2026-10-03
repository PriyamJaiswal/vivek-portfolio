import { Metadata } from "next";
import ContactSection from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vivek Singh for video editing, motion graphics, and post-production inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <ContactSection />
    </div>
  );
}
