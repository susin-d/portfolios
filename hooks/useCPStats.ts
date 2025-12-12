/*
  Author: Senior Frontend Engineer
  OS support: All
  Description: Custom hook to fetch and manage Competitive Programming stats
*/
import { useState, useEffect } from 'react';
import { CPStats } from '../types';

export const useCPStats = (
  platform: CPStats['platform'],
  fetchData: () => Promise<CPStats>
) => {
  const [stats, setStats] = useState<CPStats>({
    platform,
    status: 'loading',
    rating: 0,
    profileUrl: ''
  });

  useEffect(() => {
    let isMounted = true;

    const getStats = async () => {
      try {
        const data = await fetchData();
        if (isMounted) {
          setStats(data);
        }
      } catch (error) {
        if (isMounted) {
          setStats((prev) => ({
            ...prev,
            status: 'error',
            rating: 'N/A',
          }));
        }
      }
    };

    getStats();

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return stats;
};
