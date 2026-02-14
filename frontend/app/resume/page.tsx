"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

export default function ResumePage() {
  return (
    <main className="py-12 px-4 min-h-[80vh] bg-gradient-to-br from-zinc-50 to-red-50 dark:from-zinc-900 dark:to-red-950">
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">Resume</h1>
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 border border-zinc-100 dark:border-zinc-700 flex flex-col items-center gap-4">
          <FaFilePdf className="text-6xl text-red-500 mb-2" />
          <p className="text-lg text-zinc-700 dark:text-zinc-200 mb-2">Download my CV below:</p>
          <a
            href="/Mirko%20-%20CV.docx"
            download
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-red-700 transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </main>
  );
}
