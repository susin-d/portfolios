// Author: Susindran
// OS support: Web
// Description: Type definitions for the AI Research Portfolio

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  points: string[];
}

export interface ProjectItem {
  title: string;
  description: string[];
  tags: string[];
}

export interface AchievementItem {
  platform: string;
  title: string;
  stats: string;
}

export interface SkillProfile {
  description: string;
  metrics: {
    label: string;
    value: number;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  details: string;
}
// --- End of types.ts ---