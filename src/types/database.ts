export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProjectPlatform = "youtube" | "instagram";
export type ProjectFormat = "video" | "short";

export interface Project {
  id: string; // uuid
  platform: ProjectPlatform;
  format: ProjectFormat;
  url: string;
  title: string;
  summary: string | null;
  thumbnail_url: string | null;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface Review {
  id: string; // uuid
  image_url: string;
  client_name: string | null;
  review_text: string | null;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: {
          id?: string;
          platform: ProjectPlatform;
          format: ProjectFormat;
          url: string;
          title: string;
          summary?: string | null;
          thumbnail_url?: string | null;
          is_visible?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          platform?: ProjectPlatform;
          format?: ProjectFormat;
          url?: string;
          title?: string;
          summary?: string | null;
          thumbnail_url?: string | null;
          is_visible?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: Review;
        Insert: {
          id?: string;
          image_url: string;
          client_name?: string | null;
          review_text?: string | null;
          is_visible?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          client_name?: string | null;
          review_text?: string | null;
          is_visible?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
