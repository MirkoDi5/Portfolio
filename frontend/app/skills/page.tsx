"use client";

import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useLanguage } from "../context/LanguageContext";
import { useAuth0 } from "@auth0/auth0-react";
import { skillsApi, Skill } from "../skillsApi";

export default function SkillsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          data = await skillsApi.getAll(token);
        } else {
          data = await skillsApi.getAll(); // Assume API allows unauthenticated fetch
        }
        setSkills(data);
      } catch {
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <main className="py-12 px-4 min-h-[80vh] bg-gradient-to-br from-zinc-50 to-blue-50 dark:from-zinc-900 dark:to-blue-950">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">{t('skills')}</h1>
        {loading ? (
          <div className="text-center text-zinc-600 dark:text-zinc-300">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {skills.map((skill, idx) => (
              <button
                key={skill.id}
                className="flex flex-col items-center bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl border border-zinc-100 dark:border-zinc-700 focus:outline-none"
                onClick={() => setOpenIdx(idx)}
              >
                <div className="text-5xl mb-3">🛠️</div>
                <div className="text-xl font-semibold mb-1 text-zinc-900 dark:text-zinc-50">{skill.name}</div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{skill.level}</div>
              </button>
            ))}
          </div>
        )}
        <Modal
          isOpen={openIdx !== null}
          onClose={() => setOpenIdx(null)}
          title={openIdx !== null && skills[openIdx] ? skills[openIdx].name : ""}
        >
          {openIdx !== null && skills[openIdx] && (
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-3">🛠️</div>
              <div className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">{skills[openIdx].level}</div>
              {/* Add more details if available */}
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
}
