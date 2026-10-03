"use client";

import { m } from "framer-motion";
import { Video, Smartphone, Palette, Briefcase } from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { servicesData, ServiceItem } from "@/db/services";
import { experienceData } from "@/db/experience";

export default function ServicesAndExperienceSection() {
  const getIcon = (iconName: ServiceItem["iconName"]) => {
    switch (iconName) {
      case "Video":
        return <Video size={22} />;
      case "Smartphone":
        return <Smartphone size={22} />;
      case "Palette":
        return <Palette size={22} />;
      default:
        return <Video size={22} />;
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[650px] right-10 w-[400px] h-[400px] bg-amber-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* 1. Heading Area */}
        <div className="text-center mb-16 sm:mb-20 relative">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase font-mono tracking-widest text-orange-400 font-bold block mb-3">
              SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
              Editing stories. Designing visuals.{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Building content that connects.
              </span>
            </h2>
          </m.div>
        </div>

        {/* 2. Three Service Boxes (styled like testimonial cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24 sm:mb-32">
          {servicesData.map((service, index) => (
            <m.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <GlassmorphismCard className="p-7 sm:p-8 h-full flex flex-col justify-between hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-950/20 transition-all duration-500 group border-white/10 rounded-3xl">
                <div>
                  {/* Top Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-orange-500/20 transition-all shadow-lg shadow-orange-950/20">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Number + Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-orange-300 transition-colors">
                    {service.title}
                  </h3>

                  {/* Bullet List */}
                  <ul className="space-y-3 mb-6">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-gray-300 text-sm sm:text-base font-light"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subtle bottom accent */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-orange-400/80 font-mono">
                  <span>SPECIALIZED CUT</span>
                </div>
              </GlassmorphismCard>
            </m.div>
          ))}
        </div>

        {/* 3. Experience Section */}
        <div className="relative">
          <div className="text-center mb-14 sm:mb-16 relative">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs uppercase font-mono tracking-widest text-orange-400 font-bold block mb-3">
                EXPERIENCE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                My Experience
              </h2>
            </m.div>
          </div>

          {/* Clean Vertical Stacked Glass Cards */}
          <div className="max-w-3xl mx-auto space-y-5">
            {experienceData.map((item, index) => (
              <m.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassmorphismCard className="p-6 sm:p-7 border-white/10 hover:border-orange-500/30 transition-all duration-300 group rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                        <Briefcase size={16} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                        {item.companyOrTitle}
                      </h3>
                    </div>

                    {(item.role || item.durationOrClients) && (
                      <div className="text-xs sm:text-sm font-medium text-orange-300/90 sm:text-right pl-12 sm:pl-0">
                        {item.role && <span>{item.role}</span>}
                        {item.role && item.durationOrClients && <span className="mx-1.5 opacity-60">·</span>}
                        {item.durationOrClients && <span className="font-mono text-gray-400">{item.durationOrClients}</span>}
                      </div>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed pl-12 mt-2 font-light">
                      &ldquo;{item.description}&rdquo;
                    </p>
                  )}
                </GlassmorphismCard>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
