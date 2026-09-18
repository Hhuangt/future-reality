export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  longDescription: string;
  schedule: string;
  curator: string;
}

export interface InstallationItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  narrative: string;
  duration: string;
  spaceRequired: string;
  technicalSpecs: string[];
}

export interface Submission {
  id: string;
  type: "work" | "partner" | "opencall";
  name: string;
  email: string;
  title?: string;
  category?: string;
  organization?: string;
  message: string;
  createdAt: string;
}

export interface OpenCallCategory {
  id: string;
  title: string;
  description: string;
  deliverables: string;
}

export interface GlobalNetworkItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  year: string;
  host: "soho" | "hxr" | "joint";
  category: string;
  badge: string;
  description: string;
  highlights: string[];
  attendees?: string;
  imageUrl?: string;
  celebrityPhotos?: { name: string; photoUrl: string; role?: string }[];
  visualType: "creator_cohort" | "jury_announcement" | "celebrity_montage" | "theater_keynote" | "auditorium_lecture" | "hxr_team_2026" | "step_and_repeat" | "harvard_inaugural";
  accentColor: string;
}

