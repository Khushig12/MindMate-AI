import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = '', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className={`${sizes[size]} text-indigo-500 animate-spin`} />
          {text && <p className="text-slate-600 dark:text-slate-300 font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8">
      <Loader2 className={`${sizes[size]} text-indigo-500 animate-spin`} />
      {text && <p className="text-slate-500 dark:text-slate-400 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
