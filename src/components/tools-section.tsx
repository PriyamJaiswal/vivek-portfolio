"use client";

import { m } from "framer-motion";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { toolsList } from "@/db/skills";
import { Wrench } from "lucide-react";

export default function ToolsSection() {
  return (
    <section id="tools" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 relative">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Wrench size={13} />
              <span>Production Suite</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-white tracking-tight">
              Tools of the{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Trade
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Industry standard software applied to craft seamless cuts, rich motion, and high-fidelity audio.
            </p>
          </m.div>
        </div>

        {/* Clean Badges (no copied artwork) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {toolsList.map((tool, index) => (
            <m.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <GlassmorphismCard className="p-5 sm:p-6 h-full flex flex-col items-center text-center justify-center hover:border-orange-500/50 hover:bg-orange-500/[0.04] transition-all duration-300 group cursor-default">
                {/* Clean typographic badge */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-lg text-orange-400 group-hover:scale-110 group-hover:border-orange-500/40 group-hover:bg-orange-500/10 group-hover:text-orange-300 transition-all duration-300 mb-3 shadow-inner">
                  {tool.shortName}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1.5 leading-snug line-clamp-2">
                  {tool.tagline}
                </p>
              </GlassmorphismCard>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
