export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  createdAt: string;
}

export interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon?: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  verificationUrl?: string;
  category: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

export interface GitHubAccount {
  username: string;
  url: string;
  isMain?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
