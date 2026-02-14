
"use client";

import Image from "next/image";
import { useLanguage } from "./context/LanguageContext";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { t } = useLanguage();
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 dark:from-zinc-900 dark:to-zinc-950 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-r from-teal-100 to-blue-200 dark:from-zinc-900 dark:to-blue-950 shadow-lg">
        <Image
          src="/profile.jpg"
          alt="Profile picture"
          width={160}
          height={160}
          className="rounded-full border-4 border-teal-200 dark:border-blue-900 shadow-2xl mb-6 object-cover"
          priority
        />
        <h1 className="text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-2 tracking-tight animate-fade-in">Mirko Di Criscio</h1>
        <h2 className="text-xl font-medium text-teal-700 dark:text-teal-400 mb-4 animate-fade-in delay-100">{t('studentTitle')}</h2>
        <p className="max-w-2xl text-lg text-zinc-700 dark:text-zinc-300 mb-8 animate-fade-in delay-200">
          {t('heroText')}
        </p>
        <div className="flex flex-row gap-4 justify-center animate-fade-in delay-300">
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

      {/* Skills Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-teal-900 dark:text-teal-200 mb-8 text-center">{t('skills')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl">💻</span>
            <span className="mt-2 text-lg font-medium">React</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl">⚡</span>
            <span className="mt-2 text-lg font-medium">Next.js</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl">🎨</span>
            <span className="mt-2 text-lg font-medium">Tailwind</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl">📝</span>
            <span className="mt-2 text-lg font-medium">TypeScript</span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-8 text-center">{t('projects')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-100 dark:border-zinc-700">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-100 mb-2">Portfolio Website</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">A modern portfolio built with Next.js, React, and Tailwind CSS.</p>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 font-semibold hover:underline">View Code</a>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 border border-zinc-100 dark:border-zinc-700">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-100 mb-2">CRUD Modal System</h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">Reusable modal component for create, read, update, and delete operations.</p>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 font-semibold hover:underline">View Code</a>
          </div>
        </div>
      </section>



    </main>
  );
}
