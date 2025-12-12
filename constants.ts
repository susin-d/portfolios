import { ProfileData } from './types';

export const PROFILE_DATA: ProfileData = {
  name: "Susindran D",
  email: "susinsusindran@gmail.com",
  phone: "+91 82205 17968",
  linkedin: "https://linkedin.com/in/susin-dran",
  github: "https://github.com/susin-d",
  
  skills: [
    {
      category: "Languages",
      skills: ["Python", "C", "C++", "JavaScript", "Java", "TypeScript", "HTML/CSS"]
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React", "Next.js", "Django", "Flask", "Tailwind CSS", "Flutter", "Tkinter"]
    },
    {
      category: "Tools & Cloud",
      skills: ["Docker", "Git", "GCP", "Vercel", "PostgreSQL", "MongoDB", "MySQL"]
    }
  ],

  experience: [
    {
      company: "Gingr Informatics Pvt Ltd",
      role: "Software Development Intern",
      duration: "August 2025 – October 2025", // Keeping dates as provided in prompt (Future date noted, preserving strict adherence)
      achievements: [
        "Developed and deployed a School Management System using Django and React, automating enrollment and attendance.",
        "Built a Budget Management App using Flutter and Django REST Framework with JWT authentication.",
        "Collaborated to design REST APIs and deployed applications on cloud environments."
      ]
    }
  ],

  projects: [
    {
      title: "CogniChat AI",
      techStack: ["Google Gemini API", "Llama 2", "Flask", "LangChain", "React", "Docker", "GCP"],
      description: [
        "Designed an AI-powered conversational system integrating Gemini-2.5-Flash API and Llama 2 for real-time NLP.",
        "Built a robust Flask backend using LangChain for multi-agent orchestration.",
        "Implemented a responsive web interface using Tailwind CSS."
      ]
    },
    {
      title: "Full-Stack University ERP System",
      techStack: ["Next.js", "React", "TypeScript", "Firebase Auth", "Firestore"],
      description: [
        "Architected a modular ERP platform enabling management of student, course, and finance data.",
        "Implemented secure Firebase Authentication with OAuth and real-time CRUD operations.",
        "Optimized state management resulting in a 30% faster load time."
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Engineering (B.E.), Computer Science",
      institution: "Easwari Engineering College",
      duration: "2024 – 2028"
    },
    {
      degree: "Bachelor of Science (B.S.), Data Science",
      institution: "Indian Institute of Technology Madras",
      duration: "2024 – 2028"
    }
  ]
};

// Configuration for Tracker
export const TRACKER_CONFIG = {
  codechefUsername: "susin_d",
  leetcodeUsername: "susin-d",
  codeforcesUsername: "susin-d",
  codechefApi: "https://cp-rating-api.vercel.app/codechef/susin_d",
  leetcodeApi: "https://alfa-leetcode-api.onrender.com/susin-d/contest",
  codeforcesApi: "https://codeforces.com/api/user.info?handles=susin-d"
};