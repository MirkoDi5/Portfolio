"use client";

import React, { useState } from "react";
import { FaBuilding, FaBriefcase } from "react-icons/fa";
import Modal from "../components/Modal";
import { useLanguage } from "../context/LanguageContext";

const workExperience = [
  {
    company: "Tech Solutions Inc.",
    role: "Frontend Developer",
    period: "2022 - Present",
    description: "Developed and maintained web applications using React and Next.js."
  },
  {
    company: "Web Innovators",
    role: "Junior Developer",
    period: "2020 - 2022",
    description: "Worked on UI components and bug fixes for client projects."
  }
];

export default function WorkExperiencePage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { t } = useLanguage();
  return (
    <main className="py-12 px-4 min-h-[80vh] bg-gradient-to-br from-zinc-50 to-emerald-50 dark:from-zinc-900 dark:to-emerald-950">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">{t('workExperience')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workExperience.map((job, idx) => (
            <button
              key={idx}
              className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-100 dark:border-zinc-700 flex flex-col gap-2 hover:-translate-y-1 hover:shadow-2xl transition-transform focus:outline-none"
              onClick={() => setOpenIdx(idx)}
            >
              <div className="flex items-center gap-3 mb-2">
                <FaBriefcase className="text-2xl text-emerald-600" />
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{job.role}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 mb-1">
                <FaBuilding className="text-md text-zinc-400" />
                <span>{job.company}</span>
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-2">{job.period}</div>
            </button>
          ))}
        </div>
        <Modal
          isOpen={openIdx !== null}
          onClose={() => setOpenIdx(null)}
          title={openIdx !== null ? workExperience[openIdx].role : ""}
        >
          {openIdx !== null && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <FaBriefcase className="text-2xl text-emerald-600" />
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{workExperience[openIdx].role}</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 mb-1">
                <FaBuilding className="text-md text-zinc-400" />
                <span>{workExperience[openIdx].company}</span>
              </div>
              <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-2">{workExperience[openIdx].period}</div>
              <div className="text-zinc-700 dark:text-zinc-200 text-center">{workExperience[openIdx].description}</div>
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
}
