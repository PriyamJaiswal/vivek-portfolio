"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GlassmorphismCard from "@/components/glassmorphism-card";
import {
  Send,
  Youtube,
  Instagram,
  Mail,
  MessageCircle,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { socials, contactDetails } from "@/db/socials";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const yt = socials.find((s) => s.name === "YouTube");
  const ig = socials.find((s) => s.name === "Instagram");
  const email = contactDetails.email;
  const whatsappNumber = contactDetails.whatsappNumber;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();
    const projectType = (formData.get("project-type") as string) || "Video Editing";
    const timeline = (formData.get("timeline") as string)?.trim() || "Flexible";

    if (!name) {
      toast.error("Please enter your name.");
      return;
    }

    if (!phone || phone.length < 7) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    if (!message || message.length < 10) {
      toast.error("Please share a brief description of your project (min 10 characters).");
      return;
    }

    // Format WhatsApp message with clear structure and emojis
    const textLines = [
      `*New Project Inquiry for Vivek Singh* 🎬`,
      ``,
      `👤 *Name:* ${name}`,
      `📱 *Mobile No:* ${phone}`,
      `🎯 *Project Type:* ${projectType}`,
      `⏱️ *Timeline:* ${timeline}`,
      ``,
      `📝 *Project Details:*`,
      `${message}`,
    ];

    const encodedText = encodeURIComponent(textLines.join("\n"));
    const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    setWhatsAppUrl(url);
    setSubmitted(true);
    toast.success("Opening WhatsApp with your project details!");

    // Open WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-600/10 blur-[130px] rounded-full pointer-events-none" />

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-white tracking-tight relative z-10">
              Let&apos;s Work{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Have footage you want transformed into a captivating visual story? Send a message directly to my WhatsApp or email me below.
            </p>
          </m.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 items-stretch">
          {/* Social & Direct Connect Card (2 cols) */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col"
          >
            <GlassmorphismCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
              <h3 className="text-xl font-bold text-white mb-2">
                Connect Directly
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                Reach out directly via Gmail, WhatsApp, or connect on my social channels.
              </p>

              <div className="space-y-3.5">
                {/* 1. Gmail Connect Card */}
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/25 transition-all group">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 text-white hover:text-orange-300 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">Email Directly</p>
                        <p className="text-orange-300/90 text-xs font-mono break-all">{email}</p>
                      </div>
                    </a>

                    <button
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                {/* 2. Direct WhatsApp Quick Chat */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi%20Vivek!%20I%20saw%20your%20video%20editing%20portfolio%20and%20would%20like%20to%20collaborate.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-500/50 hover:bg-emerald-500/15 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">Quick WhatsApp Chat</p>
                    <p className="text-emerald-300/80 text-xs">Direct instant message</p>
                  </div>
                  <ExternalLink size={14} className="text-emerald-400 opacity-60 group-hover:opacity-100" />
                </a>

                {/* 3. YouTube */}
                {yt && (
                  <a
                    href={yt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Youtube size={20} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">YouTube Channel</p>
                      <p className="text-gray-400 text-xs">{yt.handle}</p>
                    </div>
                  </a>
                )}

                {/* 4. Instagram */}
                {ig && (
                  <a
                    href={ig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-pink-500/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Instagram size={20} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Instagram Profile</p>
                      <p className="text-gray-400 text-xs">{ig.handle}</p>
                    </div>
                  </a>
                )}
              </div>
            </GlassmorphismCard>
          </m.div>

          {/* Contact Form Card (3 cols) -> Sends to WhatsApp */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 flex flex-col"
          >
            <GlassmorphismCard className="p-6 sm:p-8 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Send a Message
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Fills out your project details and opens directly in WhatsApp.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <MessageCircle size={13} />
                  <span>WhatsApp Direct</span>
                </div>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                  <CheckCircle2 className="mx-auto text-emerald-400 mb-3" size={44} />
                  <h4 className="text-lg font-bold text-white mb-2">
                    Opening WhatsApp...
                  </h4>
                  <p className="text-gray-300 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                    Your project details have been formatted. If WhatsApp did not open automatically, click the button below:
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    {whatsAppUrl && (
                      <Button
                        asChild
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full px-6 shadow-lg shadow-emerald-950/40 cursor-pointer"
                      >
                        <a
                          href={whatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle size={18} />
                          <span>Open in WhatsApp</span>
                        </a>
                      </Button>
                    )}

                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="rounded-full border-white/20 text-white hover:bg-white/10"
                    >
                      Start New Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-xs font-semibold text-gray-300 mb-1.5 block uppercase tracking-wider"
                      >
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="h-11"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-xs font-semibold text-gray-300 mb-1.5 block uppercase tracking-wider"
                      >
                        Mobile No. *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder=""
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="project-type"
                        className="text-xs font-semibold text-gray-300 mb-1.5 block uppercase tracking-wider"
                      >
                        Project Type
                      </label>
                      <select
                        id="project-type"
                        name="project-type"
                        className="w-full bg-white/[0.03] border border-white/10 text-white rounded-xl px-4 py-2.5 h-11 appearance-none focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="YouTube Long-Form Video" className="bg-[#121318]">
                          YouTube Long-Form Video
                        </option>
                        <option value="Instagram Reel / YouTube Short" className="bg-[#121318]">
                          Instagram Reel / YouTube Short
                        </option>
                        <option value="Travel Vlog / Documentary" className="bg-[#121318]">
                          Travel Vlog / Documentary
                        </option>
                        <option value="Motion Graphics & VFX" className="bg-[#121318]">
                          Motion Graphics &amp; VFX
                        </option>
                        <option value="Color Grading & Sound Design" className="bg-[#121318]">
                          Color Grading &amp; Sound Design
                        </option>
                        <option value="Other Project" className="bg-[#121318]">
                          Other Project
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="text-xs font-semibold text-gray-300 mb-1.5 block uppercase tracking-wider"
                      >
                        Timeline
                      </label>
                      <Input
                        id="timeline"
                        name="timeline"
                        type="text"
                        placeholder="e.g., Within 1 week, Urgent"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold text-gray-300 mb-1.5 block uppercase tracking-wider"
                    >
                      Project Details *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your footage, expected video duration, style references, and goals..."
                      className="p-3.5 resize-none text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-full h-12 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} />
                    <span>Send Message via WhatsApp</span>
                    <Send size={15} className="ml-1 opacity-80" />
                  </Button>
                </form>
              )}
            </GlassmorphismCard>
          </m.div>
        </div>
      </div>
    </section>
  );
}
