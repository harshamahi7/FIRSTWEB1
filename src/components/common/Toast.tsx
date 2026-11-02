import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let bgClass = 'bg-gray-900/95 text-white border-gray-800';
        let iconColor = 'text-emerald-400';

        if (toast.type === 'error') {
          bgClass = 'bg-rose-950/95 text-white border-rose-800';
          iconColor = 'text-rose-400';
          Icon = AlertCircle;
        } else if (toast.type === 'info') {
          bgClass = 'bg-slate-900/95 text-white border-slate-700';
          iconColor = 'text-sky-400';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md border text-sm animate-slideUp transition-all duration-300 ${bgClass}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
              <span className="font-medium text-xs sm:text-sm leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
