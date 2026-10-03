"use client";

import { m } from "framer-motion";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { Badge } from "@/components/ui/badge";
import { Scissors, Sparkles, Sliders } from "lucide-react";
import { skillGroups } from "@/db/skills";

const groupIcons = [
  { icon: Scissors, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { icon: Sliders, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-white tracking-tight relative z-10">
              Editing &amp; Motion{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Crafting stories through precise pacing, dynamic motion graphics, and rich post-production.
            </p>
          </m.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {skillGroups.map((group, index) => {
            const iconConfig = groupIcons[index] || groupIcons[0];
            const Icon = iconConfig.icon;

            return (
              <m.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="h-full"
              >
                <GlassmorphismCard className="p-6 sm:p-8 h-full flex flex-col justify-between hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-950/20 transition-all duration-300 group">
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-3.5 rounded-2xl border ${iconConfig.bg} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={iconConfig.color} size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                        {group.category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {group.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-white/5 hover:bg-orange-500/15 hover:text-orange-300 text-gray-300 border border-white/5 py-1.5 px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
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
