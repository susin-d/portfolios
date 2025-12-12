export interface Project {
  title: string;
  description: string[];
  techStack: string[];
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
}

export interface SkillSet {
  category: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: SkillSet[];
}

export interface CPStats {
  rating: string | number;
  globalRank?: string | number;
  platform: 'CodeChef' | 'LeetCode' | 'Codeforces';
  status: 'success' | 'error' | 'loading';
  profileUrl: string;
}