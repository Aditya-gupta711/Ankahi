export type SocialLink = {
  platform: string;
  url: string;
};

export type Production = {
  id: string;
  title: string;
  year: number;
  description: string;
  director?: string;
  cast?: string[];
  crew?: string[];
  venue?: string;
  date?: string;
  poster: string;
  gallery?: string[];
  trailer?: string;
  awards?: string[];
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  description: string;
  registrationUrl?: string;
  poster?: string;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  socialLinks?: SocialLink[];
};

export type MediaKind = "image" | "video";
export type MediaCategory = "production" | "portrait" | "gallery" | "background" | "branding";

export type MediaItem = {
  id: string;
  type: MediaKind;
  category: MediaCategory;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  poster?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};
