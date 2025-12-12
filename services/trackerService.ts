/*
  Author: Senior Frontend Engineer
  OS support: All
  Description: Service to fetch competitive programming stats with hardcoded fallbacks
*/
import { TRACKER_CONFIG } from '../constants';
import { CPStats } from '../types';

const fetchWithFallback = async (urls: string[], platform: string) => {
  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); 

      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store'
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      // Intentionally ignoring individual url failures to try the next one
    }
  }
  throw new Error(`All ${platform} endpoints failed`);
};

export const fetchCodeChefStats = async (): Promise<CPStats> => {
  const urls = [
    TRACKER_CONFIG.codechefApi, 
    `https://codechef-api.vercel.app/handle/${TRACKER_CONFIG.codechefUsername}`,
  ];

  try {
    const data = await fetchWithFallback(urls, 'CodeChef');
    
    const rating = data.currentRating ?? data.rating;
    const globalRank = data.globalRank ?? data.global_rank ?? data.rank ?? 'N/A';

    if (rating === undefined || rating === null) throw new Error("Rating not found in response");

    return {
      platform: 'CodeChef',
      rating: typeof rating === 'string' ? parseInt(rating, 10) : rating,
      globalRank: globalRank,
      status: 'success',
      profileUrl: `https://www.codechef.com/users/${TRACKER_CONFIG.codechefUsername}`
    };
  } catch (error) {
    console.warn(`CodeChef API unavailable, using fallback data. Reason: ${(error as Error).message}`);
    return {
      platform: 'CodeChef',
      rating: 1436,
      globalRank: 'N/A',
      status: 'success',
      profileUrl: `https://www.codechef.com/users/${TRACKER_CONFIG.codechefUsername}`
    };
  }
};

export const fetchLeetCodeStats = async (): Promise<CPStats> => {
  const urls = [
    TRACKER_CONFIG.leetcodeApi,
    `https://leetcode-api-faisalshohag.vercel.app/${TRACKER_CONFIG.leetcodeUsername}`,
  ];

  try {
    const data = await fetchWithFallback(urls, 'LeetCode');
    
    let rating = data.contestRating;
    let rank = data.contestGlobalRanking || data.ranking || 'N/A';

    if (rating === undefined || rating === null) {
        rating = 0;
    }

    const displayRating = rating > 0 ? Math.round(rating) : "Unrated";

    return {
      platform: 'LeetCode',
      rating: displayRating,
      globalRank: rank,
      status: 'success',
      profileUrl: `https://leetcode.com/${TRACKER_CONFIG.leetcodeUsername}`
    };
  } catch (error) {
    console.warn(`LeetCode API unavailable, using fallback data. Reason: ${(error as Error).message}`);
    return {
      platform: 'LeetCode',
      rating: 1419,
      globalRank: 'N/A',
      status: 'success',
      profileUrl: `https://leetcode.com/${TRACKER_CONFIG.leetcodeUsername}`
    };
  }
};

export const fetchCodeforcesStats = async (): Promise<CPStats> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); 

    const response = await fetch(TRACKER_CONFIG.codeforcesApi, { 
        cache: 'no-store',
        signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();

    if (data.status !== 'OK' || !data.result || data.result.length === 0) {
      throw new Error("Invalid Data");
    }

    const user = data.result[0];

    return {
      platform: 'Codeforces',
      rating: user.rating || "Unrated",
      globalRank: user.rank || 'N/A',
      status: 'success',
      profileUrl: `https://codeforces.com/profile/${TRACKER_CONFIG.codeforcesUsername}`
    };
  } catch (error) {
    console.warn(`Codeforces API unavailable. Reason: ${(error as Error).message}`);
    return {
      platform: 'Codeforces',
      rating: "N/A",
      status: 'error',
      profileUrl: `https://codeforces.com/profile/${TRACKER_CONFIG.codeforcesUsername}`
    };
  }
};
/* --- End of services/trackerService.ts --- */