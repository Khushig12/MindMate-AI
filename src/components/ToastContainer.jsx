import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
  info: <Info className="w-5 h-5 text-indigo-500" />,
};

const bgColors = {
  success: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-700',
  error: 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700',
  warning: 'bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700',
  info: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/30 dark:border-indigo-700',
};

const Toast = ({ id, message, type }) => {
  const { removeToast } = useToast();

  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg max-w-sm w-full animate-slide-up ${bgColors[type]}`}>
      {icons[type]}
      <p className="text-sm text-slate-700 dark:text-slate-200 flex-1">{message}</p>
      <button
        onClick={() => removeToast(id)}
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
