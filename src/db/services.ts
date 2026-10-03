export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  iconName: "Video" | "Smartphone" | "Palette";
  items: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "long-form-video",
    number: "01",
    title: "Long-Form Video",
    iconName: "Video",
    items: [
      "YouTube Videos",
      "Vlogs",
      "Talking Head",
      "Podcast Editing",
      "Documentary / Storytelling",
      "Cinematic Videos",
      "Educational Videos",
      "Brand Videos",
    ],
  },
  {
    id: "short-form-video",
    number: "02",
    title: "Short-Form Video",
    iconName: "Smartphone",
    items: [
      "Instagram Reels",
      "YouTube Shorts",
      "Promotional Reels",
      "Social Media Content",
      "Cinematic Reels",
      "Product Reels",
      "Video Ads",
      "Content Repurposing",
    ],
  },
  {
    id: "graphics",
    number: "03",
    title: "Graphics",
    iconName: "Palette",
    items: [
      "YouTube Thumbnails",
      "Social Media Posts",
      "Reels Covers",
      "Motion Graphics",
      "Text Animation",
      "Infographics",
      "Brand Creatives",
      "Promotional Designs",
    ],
  },
];
