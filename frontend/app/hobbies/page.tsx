"use client";
import React from "react";
import { FaCamera, FaPlane, FaBook, FaChess, FaBicycle } from "react-icons/fa";

const hobbies = [
  { name: "Photography", icon: <FaCamera className="text-pink-500" /> },
  { name: "Traveling", icon: <FaPlane className="text-blue-400" /> },
  { name: "Reading Tech Blogs", icon: <FaBook className="text-green-600" /> },
  { name: "Playing Chess", icon: <FaChess className="text-yellow-500" /> },
  { name: "Cycling", icon: <FaBicycle className="text-purple-600" /> }
];

export default function HobbiesPage() {
  return (
    <main className="py-12 px-4 min-h-[80vh] bg-gradient-to-br from-zinc-50 to-pink-50 dark:from-zinc-900 dark:to-pink-950">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-zinc-900 dark:text-zinc-50 tracking-tight">Hobbies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {hobbies.map((hobby, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl border border-zinc-100 dark:border-zinc-700"
            >
              <div className="text-5xl mb-3">{hobby.icon}</div>
              <div className="text-xl font-semibold mb-1 text-zinc-900 dark:text-zinc-50">{hobby.name}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
