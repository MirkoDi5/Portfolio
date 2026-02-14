"use client";
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent transition-opacity duration-300 animate-fadeInModal">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[70vh] min-h-[200px] overflow-y-auto relative flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-modalPopIn">
        <button
          className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 className="text-2xl font-bold mb-4 mt-6 text-center text-zinc-900 dark:text-zinc-50">{title}</h2>}
        <div className="p-6 flex-1 flex flex-col justify-center">{children}</div>
      </div>
    </div>
  );
}

// Tailwind CSS custom animations (add to your global CSS if not present):
// .animate-fadeInModal { @apply opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]; }
// .animate-modalPopIn { @apply opacity-100 scale-100 animate-[popIn_0.3s_ease-in-out_forwards]; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
