import { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Services | Vivek Singh – Video Editor & Motion Graphics Designer",
  description:
    "Professional video editing, short-form reels, motion graphics, and content creation services by Vivek Singh.",
  openGraph: {
    title: "Services | Vivek Singh – Video Editor & Motion Graphics Designer",
    description:
      "Editing stories. Designing visuals. Building content that connects. Long-form video, short-form reels, and graphics by Vivek Singh.",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
