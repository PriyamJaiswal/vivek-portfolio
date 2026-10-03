export interface VideoProject {
  id: string;
  video_title: string;
  video_description: string;
  platform: "youtube" | "instagram";
  thumbnail?: string;
  summary?: string;
  tags?: string[];
  cover_image?: string;
  publish_date?: string;
  client_name?: string;
  client_image?: string;
  client_feedback?: string;
  video_link: string;
  project_images?: string[];
  category: string[];
  duration?: string;
  software_used?: string[];
}
