import React from 'react';
import { getMoodColor } from '../utils/helpers';

const MoodCard = ({ mood, emoji, selected, onClick }) => {
  return (
    <button
      onClick={() => onClick(mood)}
      className={`mood-card flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all
        ${selected
          ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 selected'
          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300'
        }`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className={`text-xs font-semibold ${selected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-300'}`}>
        {mood}
      </span>
    </button>
  );
};

export default MoodCard;
