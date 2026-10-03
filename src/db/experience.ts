export interface ExperienceItem {
  id: string;
  companyOrTitle: string;
  role?: string;
  durationOrClients?: string;
  description?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "aurqlink",
    companyOrTitle: "Aurqlink Pvt. Ltd.",
    role: "Video Editor",
    durationOrClients: "4 Months",
  },
  {
    id: "fusse-market",
    companyOrTitle: "Fusse Market Pvt. Ltd.",
    role: "Video Editor",
    durationOrClients: "6 Months",
  },
  {
    id: "freelance-editor",
    companyOrTitle: "Freelance Video Editor",
    durationOrClients: "1+ Year · 25+ Clients",
    description:
      "Worked with 25+ clients across diverse content requirements, including social media content, reels, promotional videos, and digital campaigns.",
  },
  {
    id: "content-creator",
    companyOrTitle: "Content Creator",
    description:
      "Creating and editing original content for social media and digital platforms, with a focus on engaging visuals, storytelling, and audience retention.",
  },
];
