"use client";

import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import EditProjectModal from "../components/EditProjectModal";
import { getAllProjects, createProject, updateProject, deleteProject } from "../projectApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useLanguage } from "../context/LanguageContext";

interface Project {
  id?: string | number;
  name: string;
  description: string;
  link?: string;
  prodLink?: string;
  imageUrl?: string;
}

function ProjectsPage() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  // Use the actual roles claim from the JWT
  const roles = user && user["https://api.portfolio.com/roles"];
  const isAdmin = Array.isArray(roles) && roles.includes("admin");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { t } = useLanguage();

  const closeModal = () => setOpenIndex(null);
  const openEditModal = () => {
    if (openIndex !== null) {
      setEditProject(projects[openIndex]);
      setEditModalOpen(true);
    }
  };
  const closeEditModal = () => setEditModalOpen(false);
  const handleEditSave = async (updated: Project) => {
    if (!isAuthenticated) return;
    const token = await getAccessTokenSilently();
    // If openIndex is null, this is an add operation
    if (openIndex === null) {
      try {
        const res = await createProject(updated, token);
        setProjects((prev) => [...prev, res.data]);
      } catch {
        // Optionally handle error
      }
    }
    // Otherwise, it's an edit
    if (!editProject) return;
    try {
      if (openIndex !== null) {
        const id = projects[openIndex].id;
        if (id) {
          await updateProject(id.toString(), updated, token);
        }
        setProjects((prev) => prev.map((p, i) => (i === openIndex ? { ...p, ...updated } : p)));
      }
    } catch {
      // Optionally handle error
    }
    setEditModalOpen(false);
  };

  // Helper to safely get the current open index for deletion
  const getOpenIndexSafe = () => (openIndex === null ? 0 : openIndex);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let res;
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          res = await getAllProjects(token);
        } else {
          res = await getAllProjects(); // Assume API allows unauthenticated fetch
        }
        setProjects(res.data);
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "message" in err) {
          setError((err as { message: string }).message);
        } else {
          setError("Failed to fetch projects.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <main className="py-8 px-2 md:px-4 min-h-[80vh] bg-[#E6FFFA] dark:bg-teal-900">
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-8 flex flex-col md:flex-row items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-center w-full">{t('projects')}</h1>
          {isAdmin && (
            <button
              className="mt-4 md:mt-0 md:absolute md:right-0 px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
              onClick={() => {
                setEditProject({ name: "", description: "", link: "" });
                setEditModalOpen(true);
                setOpenIndex(null);
              }}
              style={{ top: 0 }}
            >
              {t('addProject')}
            </button>
          )}
        </div>
        {loading && <p className="text-zinc-600 dark:text-zinc-300 text-center">{t('loadingProjects')}</p>}
        {error && <p className="text-red-600 dark:text-red-400 text-center">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {projects.map((project, idx) => (
            <button
              key={project.id || project.name}
              className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-0 max-w-sm w-full mx-auto flex flex-col border border-zinc-200 dark:border-zinc-700 hover:scale-[1.03] hover:shadow-2xl transition-transform focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer group overflow-hidden"
              onClick={() => setOpenIndex(idx)}
              aria-haspopup="dialog"
              aria-expanded={openIndex === idx}
            >
              <div className="flex-1 flex flex-col p-5">
                <span className="text-base md:text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 truncate">{project.name}</span>
                <span className="text-zinc-700 dark:text-zinc-300 text-xs md:text-sm mb-3 line-clamp-3">{project.description}</span>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
                    >
                      {t('viewGithub')}
                    </a>
                  )}
                  {project.prodLink && (
                    <a
                      href={project.prodLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-medium hover:bg-green-200 dark:hover:bg-green-800 transition"
                    >
                      {t('viewWebsite')}
                    </a>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {openIndex !== null && projects[openIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative flex flex-col items-center">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 text-2xl font-bold focus:outline-none"
                aria-label="Close modal"
              >
                &times;
              </button>
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-2 text-center w-full break-words">{projects[openIndex].name}</h2>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6 text-center w-full whitespace-pre-line">{projects[openIndex].description}</p>
              <div className="flex flex-col gap-2 w-full items-center">
                {projects[openIndex].link && (
                  <a href={projects[openIndex].link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition w-full text-center">{t('viewGithub')}</a>
                )}
                {projects[openIndex].prodLink && (
                  <a href={projects[openIndex].prodLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-semibold hover:bg-green-200 dark:hover:bg-green-800 transition w-full text-center">{t('viewWebsite')}</a>
                )}
              </div>
              {isAdmin && (
                <div className="flex items-center gap-2 mt-6">
                  <button
                    className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    title="Edit"
                    onClick={openEditModal}
                  >
                    <FaPencilAlt className="w-5 h-5 text-yellow-500" />
                  </button>
                  <button
                    className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition text-red-500 text-xl font-bold"
                    title="Delete"
                    onClick={() => setShowDeleteConfirm(true)}
                    aria-label="Delete project"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/30">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 max-w-xs w-full flex flex-col items-center">
              <p className="text-lg font-semibold mb-2 text-center">{t("deleteProjectConfirm") || "Are you sure you want to delete this project?"}</p>
              <div className="text-zinc-700 dark:text-zinc-200 mb-6 text-center">
                {openIndex !== null && projects[openIndex]?.name ? (
                  <>
                    {(t("deleteProjectNameConfirm") ? t("deleteProjectNameConfirm").replace("{{name}}", projects[openIndex].name) : `"${projects[openIndex].name}" will be permanently deleted from your projects list.`)}
                  </>
                ) : (
                  t("deleteProjectPermanent") || "This project will be permanently deleted from your projects list."
                )}
              </div>
              <div className="flex gap-4 w-full justify-center">
                <button
                  className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
                  onClick={() => setShowDeleteConfirm(false)}
                >{t('cancel') || 'Cancel'}</button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition"
                  onClick={async () => {
                    const openIndexSafe = getOpenIndexSafe();
                    const id = projects[openIndexSafe]?.id;
                    if (id) {
                      try {
                        if (!isAuthenticated) return;
                        const token = await getAccessTokenSilently();
                        setProjects((prev) => prev.filter((_, i) => i !== openIndexSafe));
                        await deleteProject(id.toString(), token);
                      } catch {
                        // Optionally handle error
                      }
                    }
                    setShowDeleteConfirm(false);
                    closeModal();
                  }}
                >{t('delete') || 'Delete'}</button>
              </div>
            </div>
          </div>
        )}

        {/* Always render the modal for add/edit */}
        <EditProjectModal
          isOpen={editModalOpen}
          onClose={closeEditModal}
          project={editProject}
          onSave={handleEditSave}
          isAdd={openIndex === null}
        />
      </div>
    </main>
  );
}
export default ProjectsPage;