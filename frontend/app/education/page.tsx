"use client";

import React, { useState, useEffect } from "react";
import { FaUniversity, FaCertificate } from "react-icons/fa";
import Modal from "../components/Modal";
import { useLanguage } from "../context/LanguageContext";
import { useAuth0 } from "@auth0/auth0-react";
import { educationApi, Education } from "../educationApi";

// ...existing code...

export default function EducationPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          data = await educationApi.getAll(token);
        } else {
          data = await educationApi.getAll();
        }
        setEducation(data);
      } catch {
        setError("Failed to load education.");
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <main className="py-12 px-4 min-h-[80vh] bg-gradient-to-br from-zinc-50 to-purple-50 dark:from-zinc-900 dark:to-purple-950">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">{t('education')}</h1>
        {loading ? (
          <div className="text-center text-zinc-600 dark:text-zinc-300">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, idx) => (
              <button
                key={idx}
                className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-100 dark:border-zinc-700 flex flex-col gap-2 hover:-translate-y-1 hover:shadow-2xl transition-transform focus:outline-none"
                onClick={() => setOpenIdx(idx)}
              >
                <div className="flex items-center gap-3 mb-2">
                  {edu.program && edu.program.includes("Certificate") ? (
                    <FaCertificate className="text-2xl text-purple-600" />
                  ) : (
                    <FaUniversity className="text-2xl text-purple-600" />
                  )}
                  <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{edu.program}</span>
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 mb-1">{edu.schoolName}</div>
                <div className="text-xs text-purple-700 dark:text-purple-300">{edu.time}</div>
              </button>
            ))}
          </div>
        )}
        <Modal
          isOpen={openIdx !== null}
          onClose={() => setOpenIdx(null)}
          title={openIdx !== null && education[openIdx] ? education[openIdx].program : ""}
        >
          {openIdx !== null && education[openIdx] && (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                {education[openIdx].program && education[openIdx].program.includes("Certificate") ? (
                  <FaCertificate className="text-2xl text-purple-600" />
                ) : (
                  <FaUniversity className="text-2xl text-purple-600" />
                )}
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{education[openIdx].program}</span>
              </div>
              <div className="text-zinc-600 dark:text-zinc-300 mb-1">{education[openIdx].schoolName}</div>
              <div className="text-xs text-purple-700 dark:text-purple-300 mb-2">{education[openIdx].time}</div>
              <div className="text-zinc-700 dark:text-zinc-200 text-center">{education[openIdx].description}</div>
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
}
