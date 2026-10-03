export interface TimelineExperience {
  id: string;
  title: string;
  role?: string;
  period?: string;
  description?: string;
  bullets?: string[];
  isActive?: boolean;
}

export interface NotableClient {
  id: string;
  title: string;
  subtitle: string;
  iconType: "youtube" | "business" | "event" | "agency";
}

export const journeyTimeline: TimelineExperience[] = [
  {
    id: "aurqlink",
    title: "Aurqlink Pvt. Ltd.",
    role: "Video Editor",
    period: "4 Months",
    isActive: true,
  },
  {
    id: "fusse-market",
    title: "Fusse Market Pvt. Ltd.",
    role: "Video Editor",
    period: "6 Months",
  },
  {
    id: "freelance-editor",
    title: "Freelance Video Editor",
    period: "1+ Year · 25+ Clients",
    description:
      "Worked with 25+ clients across diverse content requirements, including social media content, reels, promotional videos, and digital campaigns.",
  },
  {
    id: "content-creator",
    title: "Content Creator",
    period: "Personal Brand",
    description:
      "Creating and editing original content for social media and digital platforms, with a focus on engaging visuals, storytelling, and audience retention.",
  },
];

export const notableClients: NotableClient[] = [
  {
    id: "youtube-creators",
    title: "YouTube Creators",
    subtitle: "High-retention editing & thumbnails",
    iconType: "youtube",
  },
  {
    id: "local-businesses",
    title: "Local Businesses",
    subtitle: "Commercial promo reels & video branding",
    iconType: "business",
  },
  {
    id: "event-organizers",
    title: "Event Organizers",
    subtitle: "Concert & festive recap highlights",
    iconType: "event",
  },
  {
    id: "creative-agencies",
    title: "Creative Agencies",
    subtitle: "Fast turnaround motion & assembly cutting",
    iconType: "agency",
  },
];
