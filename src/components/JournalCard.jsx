import React from 'react';
import { formatDate, truncate } from '../utils/helpers';
import { Calendar, Tag, Trash2, Edit2 } from 'lucide-react';

const JournalCard = ({ journal, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 card-hover shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white text-base leading-snug">
            {journal.title || 'Untitled Entry'}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">{formatDate(journal.date)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {journal.mood && (
            <span className="text-lg">{journal.mood}</span>
          )}
        </div>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
        {truncate(journal.content, 120)}
      </p>
      <div className="flex items-center justify-between">
        {journal.tags && (
          <div className="flex items-center gap-1">
            <Tag className="w-3 h-3 text-indigo-400" />
            <span className="text-xs text-indigo-500 font-medium">{journal.tags}</span>
          </div>
        )}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => onEdit(journal)}
            className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-500 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(journal.id)}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
