// src/app/core/models/index.ts

export interface Project {
  id: number;
  name: string;
  initial: string;
  color: string;
  techs: string[];
  description: string;
  longDescription?: string;
  github: string;
  liveUrl?: string;
  status: 'Publié' | 'Brouillon' | 'Privé';
  date: string;
  year: string;
  type: string;
  featured?: boolean;
}

export interface Skill {
  id: number;
  name: string;
  level: number;        // 0–100
  category: string;
  icon?: string;
}

