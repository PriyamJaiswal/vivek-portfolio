export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export const contactDetails = {
  email: "creativeorbitinfo@gmail.com",
  // WhatsApp number without '+' or special characters for wa.me link
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  whatsappDisplay: "+91 (Chat on WhatsApp)",
};

export const socials: SocialLink[] = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Cinemagic.22",
    handle: "@Cinemagic.22",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/cinemagic.22/",
    handle: "@cinemagic.22",
  },
  {
    name: "Email",
    url: "mailto:creativeorbitinfo@gmail.com",
    handle: "creativeorbitinfo@gmail.com",
  },
];
