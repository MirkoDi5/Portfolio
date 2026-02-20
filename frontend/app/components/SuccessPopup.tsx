import React from "react";

interface SuccessPopupProps {
  open: boolean;
  title?: string;
  message: string;
  subtext?: string;
  emoji?: string;
  onClose: () => void;
  buttonColorClass?: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  open,
  title = "Success!",
  message,
  subtext = "",
  emoji = "🎉",
  onClose,
  buttonColorClass = "bg-green-600 hover:bg-green-700"
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-xs border border-green-200 dark:border-green-700 flex flex-col items-center animate-fade-in">
        {/* Close icon */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="text-lg md:text-xl font-extrabold text-center text-black dark:text-white mb-4">{title}</div>
        <div className="text-3xl mb-4">{emoji}</div>
        <div className="text-base md:text-lg font-bold text-center text-zinc-900 dark:text-zinc-100 mb-3">{message}</div>
        {subtext && <div className="text-sm text-center text-zinc-500 dark:text-zinc-300 mb-6">{subtext}</div>}
        <button
          className={`px-6 py-2 rounded-xl font-bold text-base shadow ${buttonColorClass} text-white transition mb-2`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
