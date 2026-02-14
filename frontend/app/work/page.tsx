"use client";

import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useLanguage } from "../context/LanguageContext";
import { useAuth0 } from "@auth0/auth0-react";
import { workApi, Work } from "../workApi";

export default function WorkPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [work, setWork] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchWork = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          data = await workApi.getAll(token);
        } else {
          data = await workApi.getAll(); 
        }
        setWork(data);
      } catch {
        setError("Failed to load work experience.");
      } finally {
        setLoading(false);
      }
    };
    fetchWork();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <main className="py-12 px-4 min-h-[80vh] bg-gradient-to-br from-zinc-50 to-green-50 dark:from-zinc-900 dark:to-green-950">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">{t('workExperience')}</h1>
        {loading ? (
          <div className="text-center text-zinc-600 dark:text-zinc-300">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {work.map((w, idx) => (
              <button
                key={w.id}
                className="flex flex-col items-center bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl border border-zinc-100 dark:border-zinc-700 focus:outline-none"
                onClick={() => setOpenIdx(idx)}
              >
                <div className="text-xl font-semibold mb-1 text-zinc-900 dark:text-zinc-50">{w.name || w.workName}</div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">{w.time}</div>
              </button>
            ))}
          </div>
        )}
        <Modal
          isOpen={openIdx !== null}
          onClose={() => setOpenIdx(null)}
          title={openIdx !== null && work[openIdx] ? (work[openIdx].name || work[openIdx].workName) : ""}
        >
          {openIdx !== null && work[openIdx] && (
            <div className="flex flex-col items-center">
              <div className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">{work[openIdx].description}</div>
              {/* Add more details if available */}
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
}
