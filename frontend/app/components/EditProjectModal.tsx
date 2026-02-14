"use client";
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export interface Project {
  id?: string | number;
  name: string;
  description: string;
  link?: string;
  prodLink?: string;
}

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (updated: Project) => void;
  isAdd?: boolean;
}

export default function EditProjectModal({ isOpen, onClose, project, onSave, isAdd }: EditProjectModalProps) {
  const [form, setForm] = useState<Project>(project || { name: "", description: "", link: "", prodLink: "" });
  const { t } = useLanguage();

  React.useEffect(() => {
    setForm(project || { name: "", description: "", link: "", prodLink: "" });
  }, [project]);

  if (!isOpen || !project) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E6FFFA]/80 dark:bg-teal-900/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#E6FFFA] via-teal-100 to-blue-100 dark:from-teal-900 dark:via-zinc-950 dark:to-blue-900 rounded-3xl shadow-2xl w-full max-w-lg p-0 relative animate-fade-in">
        {/* Modal Header */}
        <div className="rounded-t-3xl bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400 dark:from-teal-900 dark:via-blue-900 dark:to-indigo-900 px-8 py-6 flex items-center">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">{isAdd ? t('addProject') : t('editProject')}</h2>
          <button
            className="ml-auto text-white hover:text-red-200 text-3xl font-bold focus:outline-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-6 px-8 py-8">
          <div>
            <label className="block text-teal-700 dark:text-teal-200 mb-1 font-semibold">{t('projectName')}</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-teal-200 dark:border-teal-700 px-4 py-3 bg-teal-50 dark:bg-teal-900 text-teal-900 dark:text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 font-medium shadow-sm"
              required
              placeholder="e.g. Portfolio Website"
            />
          </div>
          <div>
            <label className="block text-teal-700 dark:text-teal-200 mb-1 font-semibold">{t('projectDescription')}</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-teal-200 dark:border-teal-700 px-4 py-3 bg-teal-50 dark:bg-teal-900 text-teal-900 dark:text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none font-medium shadow-sm"
              rows={4}
              required
              placeholder="e.g. A modern portfolio built with Next.js and Tailwind CSS"
            />
          </div>
          <div>
            <label className="block text-teal-700 dark:text-teal-200 mb-1 font-semibold">{t('projectLink')}</label>
            <input
              type="url"
              name="link"
              value={form.link || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-teal-200 dark:border-teal-700 px-4 py-3 bg-teal-50 dark:bg-teal-900 text-teal-900 dark:text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 font-medium shadow-sm"
              placeholder="https://github.com/your-project"
            />
          </div>
          <div>
            <label className="block text-teal-700 dark:text-teal-200 mb-1 font-semibold">Production Link (optional)</label>
            <input
              type="url"
              name="prodLink"
              value={form.prodLink || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-teal-200 dark:border-teal-700 px-4 py-3 bg-teal-50 dark:bg-teal-900 text-teal-900 dark:text-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 font-medium shadow-sm"
              placeholder="https://your-production-link.com"
            />
          </div>
          <div className="flex justify-end gap-2 mt-8">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl bg-teal-200 dark:bg-teal-700 text-teal-900 dark:text-teal-50 font-semibold shadow hover:bg-teal-300 dark:hover:bg-teal-800 transition">{t('cancel')}</button>
            <button type="submit" className="px-6 py-3 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 shadow-lg transition">{t('save')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
