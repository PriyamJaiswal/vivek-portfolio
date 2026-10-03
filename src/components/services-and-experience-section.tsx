"use client";

import { m } from "framer-motion";
import {
  Video,
  Smartphone,
  Palette,
  Youtube,
  Building2,
  Calendar,
  Lightbulb,
} from "lucide-react";
import GlassmorphismCard from "@/components/glassmorphism-card";
import { servicesData, ServiceItem } from "@/db/services";
import {
  journeyTimeline,
  notableClients,
  NotableClient,
} from "@/db/experience";

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

  const getClientIcon = (iconType: NotableClient["iconType"]) => {
    switch (iconType) {
      case "youtube":
        return Youtube;
      case "business":
        return Building2;
      case "event":
        return Calendar;
      case "agency":
        return Lightbulb;
    }
  };

  const getClientBadgeStyle = (iconType: NotableClient["iconType"]) => {
    switch (iconType) {
      case "youtube":
        return "bg-red-500/15 border-red-500/25 text-red-400";
      case "business":
        return "bg-blue-500/15 border-blue-500/25 text-blue-400";
      case "event":
        return "bg-purple-500/15 border-purple-500/25 text-purple-400";
      case "agency":
        return "bg-amber-500/15 border-amber-500/25 text-amber-400";
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-orange-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[650px] right-10 w-[400px] h-[400px] bg-amber-600/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ================================================================= */}
        {/* 1. Services Heading Area                                          */}
        {/* ================================================================= */}
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

        {/* ================================================================= */}
        {/* 2. Services Grid                                                  */}
        {/* ================================================================= */}
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
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-orange-500/20 transition-all shadow-lg shadow-orange-950/20">
                    {getIcon(service.iconName)}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight group-hover:text-orange-300 transition-colors">
                    {service.title}
                  </h3>

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

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-orange-400/80 font-mono">
                  <span>SPECIALIZED CUT</span>
                </div>
              </GlassmorphismCard>
            </m.div>
          ))}
        </div>

        {/* ================================================================= */}
        {/* 3. My Journey & Notable Clients (Exact match to requested layout)  */}
        {/* ================================================================= */}
        <div className="relative">
          {/* Section Header */}
          <div className="mb-12 sm:mb-14">
            <m.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs uppercase font-mono tracking-widest text-orange-400 font-bold block mb-2">
                EXPERIENCE / CLIENTS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                My Journey
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                I&apos;ve worked on a variety of projects — from personal creations to client work. Here&apos;s a quick look at my experience.
              </p>
            </m.div>
          </div>

          {/* Two-Column Grid: Timeline on Left, Notable Clients on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN: Vertical Timeline */}
            <div className="lg:col-span-7 relative pl-8 sm:pl-10 space-y-6">
              {/* Continuous vertical timeline connector line */}
              <div className="absolute left-[11px] sm:left-[13px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-orange-500 via-white/15 to-white/5" />

              {journeyTimeline.map((item, index) => (
                <m.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative"
                >
                  {/* Timeline Node Dot on the vertical line */}
                  {item.isActive ? (
                    <div className="absolute -left-[31px] sm:-left-[37px] top-6 w-6 h-6 rounded-full border-2 border-orange-500 bg-[#070b14] flex items-center justify-center shadow-[0_0_12px_rgba(249,115,22,0.6)]">
                      <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,1)]" />
                    </div>
                  ) : (
                    <div className="absolute -left-[31px] sm:-left-[37px] top-6 w-6 h-6 rounded-full border-2 border-white/20 bg-[#070b14] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0f1e]/85 backdrop-blur-xl border border-white/10 shadow-xl hover:border-orange-500/35 transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-orange-300 transition-colors">
                          {item.title}
                        </h3>
                        {item.role && (
                          <p className="text-xs sm:text-sm text-orange-400 font-medium mt-0.5">
                            {item.role}
                          </p>
                        )}
                      </div>
                      {item.period && (
                        <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-medium border border-amber-500/30 bg-amber-500/10 text-amber-300 shrink-0">
                          {item.period}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mt-2">
                        {item.description}
                      </p>
                    )}

                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="space-y-1.5 text-xs sm:text-sm text-gray-400 font-light mt-2.5">
                        {item.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <span className="text-gray-500 leading-relaxed">•</span>
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </m.div>
              ))}
            </div>

            {/* RIGHT COLUMN: Notable Clients Card */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl bg-[#0a0f1e]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-5">
                {/* Header with glowing orange dot */}
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Notable Clients
                  </h3>
                </div>

                {/* Client List */}
                <div className="space-y-3">
                  {notableClients.map((client) => {
                    const IconComponent = getClientIcon(client.iconType);
                    const badgeStyle = getClientBadgeStyle(client.iconType);
                    return (
                      <div
                        key={client.id}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-[#111728]/70 border border-white/5 hover:border-orange-500/30 hover:bg-[#141d33]/80 transition-all duration-300 group"
                      >
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${badgeStyle} group-hover:scale-105 transition-transform`}
                        >
                          <IconComponent size={20} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-orange-300 transition-colors truncate">
                            {client.title}
                          </h4>
                          <p className="text-xs text-gray-400 font-light mt-0.5 truncate">
                            {client.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
