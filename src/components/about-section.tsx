"use client";

import { m } from "framer-motion";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { bioDetails } from "@/db/skills";
import { Film, Sparkles, Video, Flame } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      title: "Storytelling & Pacing",
      desc: "Structuring narratives that captivate viewers and sustain engagement from the opening frame to the final cut.",
      icon: Film,
    },
    {
      title: "Cinematic Visuals",
      desc: "Enhancing emotion with tailored color grades, cinematic framing, and seamless visual transitions.",
      icon: Video,
    },
    {
      title: "Motion Graphics",
      desc: "Designing kinetic typography, lower thirds, and animated overlays that reinforce messaging.",
      icon: Sparkles,
    },
    {
      title: "Social & YouTube Editing",
      desc: "Optimizing content with fast retention cuts for Reels and structured pacing for long-form YouTube.",
      icon: Flame,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 relative">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-white tracking-tight">
              About{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-orange-400/90 text-sm sm:text-base uppercase tracking-widest font-semibold">
              {bioDetails.title}
            </p>
          </m.div>
        </div>

        {/* Bio Card */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <GlassmorphismCard className="p-8 sm:p-12 relative overflow-hidden border-orange-500/20">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-light leading-relaxed tracking-wide mb-6">
                &ldquo;{bioDetails.about}&rdquo;
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mb-4" />
              <p className="text-white font-semibold text-lg">{bioDetails.name}</p>
            </div>
          </GlassmorphismCard>
        </m.div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassmorphismCard className="p-6 h-full hover:border-orange-500/30 transition-all duration-300 group">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:scale-110 group-hover:bg-orange-500/20 transition-all">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </GlassmorphismCard>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
