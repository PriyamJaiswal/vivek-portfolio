export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Editing",
    skills: [
      "Storytelling",
      "Pacing & Rhythm",
      "Cinematic Editing",
      "Short-form Editing",
      "Long-form YouTube Editing",
    ],
  },
  {
    category: "Motion Graphics",
    skills: [
      "Titles & Lower Thirds",
      "Kinetic Typography",
      "Logo Animation",
      "Infographics",
      "Transitions",
    ],
  },
  {
    category: "Post Production",
    skills: [
      "Color Grading",
      "Sound Design",
      "Audio Cleanup",
      "Subtitles / Captions",
    ],
  },
];

export interface ToolItem {
  name: string;
  shortName: string;
  tagline: string;
}

export const toolsList: ToolItem[] = [
  { name: "Premiere Pro", shortName: "Pr", tagline: "Timeline & Multitrack Video Editing" },
  { name: "After Effects", shortName: "Ae", tagline: "Motion Graphics & Visual Effects" },
  { name: "Photoshop", shortName: "Ps", tagline: "Graphics & Visual Asset Creation" },
  { name: "Audition", shortName: "Au", tagline: "Audio Cleanup & Sound Design" },
  { name: "DaVinci Resolve", shortName: "Dv", tagline: "Color Grading & Post Production" },
];

export const heroChips = [
  "Cinematic Videos",
  "Reels & Shorts",
  "YouTube Editing",
  "Motion Graphics",
  "Sound Design",
];

export const bioDetails = {
  name: "Vivek Singh",
  title: "Video Editor & Motion Graphics Designer",
  tagline: "I turn raw footage into engaging visual stories.",
  about:
    "I'm a video editor focused on storytelling, pacing, motion graphics and cinematic visuals. I enjoy transforming raw footage into engaging content for YouTube, social media and brands.",
};
