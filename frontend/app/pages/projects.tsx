"use client";


import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllProjects } from "../projectApi";

interface Project {
	id?: string | number;
	name: string;
	description: string;
	url?: string;
}

export default function ProjectsPage() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	       useEffect(() => {
		       getAllProjects()
			       .then((res: { data: Project[] }) => {
				       setProjects(res.data);
				       setLoading(false);
			       })
				       .catch((err: unknown) => {
					       let message = "Unknown error";
					       if (err && typeof err === "object" && "message" in err) {
						       message = (err as { message: string }).message;
					       }
					       setError(message);
					       setLoading(false);
				       });
	       }, []);

	       return (
		       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-zinc-100 to-indigo-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 font-sans">
			       <nav className="flex justify-between items-center px-8 py-4 bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-20">
				       <span className="text-2xl font-bold text-blue-700 dark:text-blue-200 tracking-tight">Mirko Di Criscio</span>
				       <ul className="flex gap-8 text-zinc-700 dark:text-zinc-200 font-medium">
					       <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
					       <li><Link href="/pages/projects" className="hover:text-blue-600 transition-colors">Projects</Link></li>
				       </ul>
			       </nav>
			       <header className="max-w-4xl mx-auto text-center py-16 px-4">
				       <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-200 mb-4 animate-fade-in">My Projects</h1>
				       <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 animate-fade-in">A showcase of my work, including web apps, tools, and creative experiments. Click any project to learn more!</p>
			       </header>
			       <section className="max-w-6xl mx-auto py-8 px-4">
				       {loading && <p className="text-zinc-600 dark:text-zinc-300">Loading projects...</p>}
				       {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
				       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
					       {projects.map((project) => (
						       <div key={project.id || project.name} className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 flex flex-col group hover:-translate-y-1 hover:shadow-2xl transition-transform duration-200 border border-zinc-100 dark:border-zinc-700">
							       <div className="flex items-center gap-3 mb-3">
								       <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
									       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
								       </span>
								       <h4 className="text-xl font-semibold text-blue-900 dark:text-blue-200 group-hover:text-indigo-600 transition-colors">{project.name}</h4>
							       </div>
							       <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">{project.description}</p>
							       {project.url && (
								       <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-auto px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow">View Project</a>
							       )}
						       </div>
					       ))}
				       </div>
			       </section>
		       </div>
	       );
}
