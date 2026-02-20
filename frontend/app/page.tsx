"use client";


import Image from "next/image";
import { useLanguage } from "./context/LanguageContext";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";

export default function Home() {
  const { t } = useLanguage();
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("Mirko Di Criscio");
  const [title, setTitle] = useState(t('studentTitle'));
  const [heroText, setHeroText] = useState(t('heroText'));
  const [tempName, setTempName] = useState(name);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempHeroText, setTempHeroText] = useState(heroText);
  const roles = user && user["https://api.portfolio.com/roles"];
  const isAdmin = isAuthenticated && Array.isArray(roles) && roles.includes("admin");

  // Load name, title, and heroText from localStorage if available
  React.useEffect(() => {
    const storedName = localStorage.getItem('homeName');
    const storedTitle = localStorage.getItem('homeTitle');
    const storedHeroText = localStorage.getItem('homeHeroText');
    if (storedName) setName(storedName);
    if (storedTitle) setTitle(storedTitle);
    if (storedHeroText) setHeroText(storedHeroText);
  }, []);

  const handleEdit = () => {
    setTempName(localStorage.getItem('homeName') || name);
    setTempTitle(localStorage.getItem('homeTitle') || title);
    setTempHeroText(localStorage.getItem('homeHeroText') || heroText);
    setEditOpen(true);
  };
  const handleSave = () => {
    setName(tempName);
    setTitle(tempTitle);
    setHeroText(tempHeroText);
    localStorage.setItem('homeName', tempName);
    localStorage.setItem('homeTitle', tempTitle);
    localStorage.setItem('homeHeroText', tempHeroText);
    setEditOpen(false);
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 dark:from-zinc-900 dark:to-zinc-950 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 md:py-24 px-2 md:px-4 bg-gradient-to-r from-teal-100 to-blue-200 dark:from-zinc-900 dark:to-blue-950 shadow-lg">
        <Image
          src="/profile.jpg"
          alt="Profile picture"
          width={120}
          height={120}
          className="rounded-full border-4 border-teal-200 dark:border-blue-900 shadow-2xl mb-6 object-cover"
          priority
        />
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <h1 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight animate-fade-in">{name}</h1>
          {isAdmin && (
            <button
              className="ml-2 px-3 py-1 rounded bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
              onClick={handleEdit}
              aria-label="Edit home text"
            >Edit</button>
          )}
        </div>
        <h2 className="text-lg md:text-xl font-medium text-teal-700 dark:text-teal-400 mb-4 animate-fade-in delay-100">{title}</h2>
        <p className="max-w-xs md:max-w-2xl text-base md:text-lg text-zinc-700 dark:text-zinc-300 mb-8 animate-fade-in delay-200">
          {heroText}
        </p>
        {editOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-10 w-full max-w-lg border border-blue-200 dark:border-blue-700 animate-fade-in">
              <h2 className="text-2xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 text-center tracking-tight">Edit Home Text</h2>
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-zinc-700 dark:text-zinc-200">Name</label>
                <input
                  className="w-full border-2 border-blue-200 dark:border-blue-700 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-zinc-800 dark:text-white transition"
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-zinc-700 dark:text-zinc-200">Title</label>
                <input
                  className="w-full border-2 border-blue-200 dark:border-blue-700 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-zinc-800 dark:text-white transition"
                  value={tempTitle}
                  onChange={e => setTempTitle(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-zinc-700 dark:text-zinc-200">Home Page Description</label>
                <textarea
                  className="w-full border-2 border-blue-200 dark:border-blue-700 rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-zinc-800 dark:text-white transition resize-none"
                  value={tempHeroText}
                  onChange={e => setTempHeroText(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition" onClick={() => setEditOpen(false)}>Cancel</button>
                <button className="px-5 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row gap-2 md:gap-4 justify-center animate-fade-in delay-300 flex-wrap">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-teal-300 dark:border-blue-700 p-4 text-3xl text-teal-900 dark:text-teal-100 bg-white dark:bg-zinc-900 hover:bg-teal-50 dark:hover:bg-blue-900 transition-colors shadow flex items-center justify-center"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.646.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.339-.012 2.421-.012 2.751 0 .268.18.579.688.481C19.135 20.175 22 16.427 22 12.012 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/mirko-di-criscio-b88b36384/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-teal-300 dark:border-blue-700 p-4 text-3xl text-teal-900 dark:text-teal-100 bg-white dark:bg-zinc-900 hover:bg-teal-50 dark:hover:bg-blue-900 transition-colors shadow flex items-center justify-center"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.597 2.001 3.597 4.601v5.595z" />
            </svg>
          </a>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-stretch mt-8 md:mt-12 px-2 md:px-4 max-w-4xl mx-auto">
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-green-200 dark:border-green-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-500 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0 0 14.25 4.5h-4.5A2.25 2.25 0 0 0 7.5 6.75v3.75m9 0V17.25A2.25 2.25 0 0 1 14.25 19.5h-4.5A2.25 2.25 0 0 1 7.5 17.25V10.5m9 0h-9" />
          </svg>
          <h3 className="text-xl font-bold mb-2">{t('viewCV') || 'Download CV'}</h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-300">{t('cvDescription') || 'Download my up-to-date CV in Word format.'}</p>
          <a
            href="/Mirko%20-%20CV.docx"
            download
            className="inline-block px-6 py-2 rounded-full bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition-colors"
            aria-label="Download CV"
          >
            {t('downloadNow') || 'Download Now'}
          </a>
        </div>
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-blue-200 dark:border-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-500 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25V6.75m6 10.5V6.75m-9 0h12a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 15V9a2.25 2.25 0 0 1 2.25-2.25z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">{t('projects') || 'Projects'}</h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-300">{t('projectsDescription') || 'Explore my portfolio projects and see what I have built.'}</p>
          <a
            href="/projects"
            className="inline-block px-6 py-2 rounded-full bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition-colors"
            aria-label="Go to Projects"
          >
            {t('seeProjects') || 'See Projects'}
          </a>
        </div>
      </section>
    </main>
  );
}
