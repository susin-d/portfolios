/*
  Author: Senior Frontend Engineer
  OS support: All
  Description: Custom hook to aggregate competitive programming stats for CodeChef, LeetCode, and Codeforces.
*/
import { fetchCodeChefStats, fetchLeetCodeStats, fetchCodeforcesStats } from '../services/trackerService';
import { useCPStats } from './useCPStats';

export const useTrackerStats = () => {
  const codeChefStats = useCPStats('CodeChef', fetchCodeChefStats);
  const leetCodeStats = useCPStats('LeetCode', fetchLeetCodeStats);
  const codeforcesStats = useCPStats('Codeforces', fetchCodeforcesStats);

  return {
    codeChefStats,
    leetCodeStats,
    codeforcesStats
  };
};
/* --- End of hooks/useTrackerStats.ts --- */