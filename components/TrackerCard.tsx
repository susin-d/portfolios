/*
  Author: Senior Frontend Engineer
  OS support: All
  Description: Tracker Card component with updated box layout styling
*/
import React from 'react';
import { CPStats } from '../types';
import { ExternalLink, Code2, Terminal, Trophy, Code } from './Icons';

interface TrackerCardProps {
  stats: CPStats;
}

const TrackerCard: React.FC<TrackerCardProps> = ({ stats }) => {
  const isError = stats.status === 'error';
  const isLoading = stats.status === 'loading';

  const getIcon = () => {
    switch (stats.platform) {
      case 'CodeChef': return <Code2 size={28} />;
      case 'LeetCode': return <Terminal size={28} />;
      case 'Codeforces': return <Trophy size={28} />;
      default: return <Code size={28} />;
    }
  };

  return (
    <div className="relative group flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/20 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl transition-all duration-500 group-hover:bg-primary/30" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-black/40 p-3 text-primary ring-1 ring-white/10 shadow-inner">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{stats.platform}</h3>
            <p className="text-sm text-gray-400">Competitive Programming</p>
          </div>
        </div>
        
        <a 
          href={stats.profileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="rounded-full bg-white/5 p-2.5 text-gray-400 transition-all hover:scale-110 hover:bg-white/10 hover:text-white"
          aria-label={`View ${stats.platform} profile`}
        >
          <ExternalLink size={20} />
        </a>
      </div>

      <div className="mt-8 flex items-end justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">Current Rating</p>
          {isLoading ? (
             <div className="mt-2 h-10 w-24 animate-pulse rounded bg-white/10"></div>
          ) : (
            <div className="flex items-baseline gap-2">
                <p className={`mt-1 font-bold tracking-tight text-[clamp(2rem,3.5vw,2.5rem)] ${isError || stats.rating === 'N/A' ? 'text-gray-500' : 'text-white'}`}>
                {stats.rating}
                </p>
                {(isError || stats.rating === 'N/A') && (
                    <span className="text-xs text-primary-400 font-medium">View Profile</span>
                )}
            </div>
          )}
        </div>

        {!isLoading && (
          <div className="text-right">
             <p className="text-xs text-gray-500 mb-0.5">{stats.platform === 'Codeforces' ? 'Rank' : 'Global Rank'}</p>
             <p className={`font-mono text-sm sm:text-base text-primary-200 ${stats.platform === 'Codeforces' ? 'capitalize' : ''}`}>
               {stats.globalRank || 'N/A'}
             </p>
          </div>
        )}
      </div>
      
      {/* Decorative glow line */}
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </div>
  );
};

export default TrackerCard;
/* --- End of components/TrackerCard.tsx --- */