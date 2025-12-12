/*
  Author: Senior Frontend Engineer
  OS support: All
  Description: Service to fetch and summarize multiple GitHub projects using Gemini API
*/
import { GoogleGenAI, Type } from "@google/genai";
import { Project } from '../types';
import { PROFILE_DATA } from '../constants';

const GITHUB_USERNAME = 'susin-d';

export const fetchGitHubProjects = async (): Promise<Project[]> => {
  // We assume process.env.API_KEY is available as per instructions.
  if (!process.env.API_KEY) {
    console.warn("API Key not found, skipping dynamic project fetch");
    return [];
  }

  try {
    // 1. Fetch Repositories - Increased limit to 100 to capture "all" active projects
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`);
    if (!reposRes.ok) return [];
    const repos = await reposRes.json();

    // 2. Filter candidates: Not a fork, not the profile itself, and not already in constants
    // Helper to normalize names for comparison
    const normalize = (s: string) => s.toLowerCase().replace(/[-_]/g, ' ').trim();
    const existingTitles = new Set(PROFILE_DATA.projects.map(p => normalize(p.title)));

    const candidates = repos.filter((repo: any) => {
      if (repo.fork) return false;
      if (repo.name.toLowerCase() === GITHUB_USERNAME.toLowerCase()) return false; // Skip profile repo
      if (existingTitles.has(normalize(repo.name))) return false;
      return true;
    });

    if (candidates.length === 0) return [];

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // 3. Process candidates in batches to respect API rate limits
    // Processing too many requests in parallel can trigger 429 errors from the API.
    const BATCH_SIZE = 5;
    const validProjects: Project[] = [];

    for (let i = 0; i < candidates.length; i += BATCH_SIZE) {
        const batch = candidates.slice(i, i + BATCH_SIZE);
        
        const batchPromises = batch.map(async (repo: any) => {
            try {
                // Fetch README
                const readmeRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/readme`);
                if (!readmeRes.ok) {
                    // Skip if no README available for analysis
                    return null;
                }
                const readmeData = await readmeRes.json();
                // GitHub API returns content in base64 with newlines
                const readmeContent = atob(readmeData.content.replace(/\n/g, ''));

                // Summarize with Gemini
                const prompt = `You are a tech portfolio assistant. 
                Analyze the following README content for a GitHub repository named "${repo.name}".
                
                Task:
                1. Generate a professional project title (clean up the repo name, capitalize properly).
                2. Create a list of 3 concise bullet points summarizing the project's features and purpose.
                3. Extract the tech stack (languages, frameworks, tools) from the content and the repo language (${repo.language}).
                
                README Content:
                ${readmeContent.substring(0, 15000)}
                `;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: 'application/json',
                        responseSchema: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                description: { type: Type.ARRAY, items: { type: Type.STRING } },
                                techStack: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        }
                    }
                });

                const text = response.text;
                if (!text) return null;

                const parsed = JSON.parse(text);

                return {
                    title: parsed.title || repo.name,
                    description: parsed.description || [repo.description || "No description available."],
                    techStack: parsed.techStack || [repo.language || "Unknown"],
                } as Project;

            } catch (error) {
                console.warn(`Error processing project ${repo.name}:`, error);
                return null;
            }
        });

        const batchResults = await Promise.all(batchPromises);
        validProjects.push(...batchResults.filter((p): p is Project => p !== null));
    }

    return validProjects;

  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
};
/* --- End of services/projectService.ts --- */