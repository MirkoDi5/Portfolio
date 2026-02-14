"use client";
import React, { useEffect, useState } from "react";
import { FaJs, FaReact, FaNodeJs, FaCss3Alt, FaBuilding, FaBriefcase, FaFilePdf } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
// import axios from "axios"; // Remove unused import
import { skillsApi, Skill } from "../skillsApi";
import { useAuth0 } from "@auth0/auth0-react";
import { workApi } from "../workApi";
import { educationApi } from "../educationApi";
import Modal from "../components/Modal";
import { useLanguage } from "../context/LanguageContext";

// Map skill names to icons for display
const skillIconMap: { [key: string]: React.ReactNode } = {
  javascript: <FaJs className="text-yellow-400" />,
  typescript: <SiTypescript className="text-blue-500" />,
  react: <FaReact className="text-cyan-400" />,
  "node.js": <FaNodeJs className="text-green-600" />,
  css: <FaCss3Alt className="text-blue-600" />,
};

// Add WorkExperience type
type WorkExperience = {
  id: string;
  workId: string;
  name: string;
  workName: string;
  time: string;
  description: string;
};

type Education = {
  id: string;
  educationId: string;
  schoolName: string;
  program: string;
  time: string;
};

// Helper to determine if modal is for editing or adding
function isEditModal(modal: { type: 'skill' | 'work' | 'education', item: { name?: string; level?: string; skillId?: string; id?: string } | WorkExperience | Education }): boolean {
  if (modal.type === 'skill') return Boolean((modal.item as Skill).id);
  if (modal.type === 'work') return Boolean((modal.item as WorkExperience).id);
  if (modal.type === 'education') return Boolean((modal.item as Education).id);
  return false;
}

export default function AboutPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [editModal, setEditModal] = useState<{
    type: 'skill' | 'work' | 'education',
    item: Skill | WorkExperience | Education
  } | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [skillsError, setSkillsError] = useState("");
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [loadingWork, setLoadingWork] = useState(false);
  const [workError, setWorkError] = useState("");
  const [education, setEducation] = useState<Education[]>([]);
  const [educationLoading, setEducationLoading] = useState(false);
  const [educationError, setEducationError] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; level?: string } | WorkExperience | Education | null>(null);

  const { t } = useLanguage();
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  console.log('Auth0 user object:', user);
  // Use the actual roles claim from the JWT
  const roles = user && user["https://api.portfolio.com/roles"];
  const isAdmin = Array.isArray(roles) && roles.includes("admin");

  useEffect(() => {
    // Always fetch skills, work, and education on mount using async functions
    (async () => {
      setLoadingSkills(true);
      try {
        let data;
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          data = await skillsApi.getAll(token);
        } else {
          data = await skillsApi.getAll();
        }
        setSkills(data);
      } catch {
        setSkillsError("Failed to load skills");
      } finally {
        setLoadingSkills(false);
      }
    })();
    (async () => {
      setLoadingWork(true);
      try {
        let data;
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          data = await workApi.getAll(token);
        } else {
          data = await workApi.getAll();
        }
        setWorkExperience(data.map((item) => ({
          id: String(item.id ?? item.workId ?? ''),
          workId: item.workId || '',
          name: item.name || '',
          workName: item.workName || '',
          time: item.time || '',
          description: item.description || '',
        })));
      } catch {
        setWorkError("Failed to load work experience");
      } finally {
        setLoadingWork(false);
      }
    })();
    (async () => {
      setEducationLoading(true);
      try {
        let data;
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          data = await educationApi.getAll(token);
        } else {
          data = await educationApi.getAll();
        }
        setEducation(data.map((item) => ({
          id: String(item.id ?? item.educationId ?? ''),
          educationId: item.educationId || '',
          schoolName: item.schoolName || '',
          program: item.program || '',
          time: item.time || '',
        })));
      } catch {
        setEducationError("Failed to load education");
      } finally {
        setEducationLoading(false);
      }
    })();
  }, [getAccessTokenSilently, isAuthenticated]);
  // ...existing code...

  useEffect(() => {
    if (editModal) {
      setEditForm(editModal.item);
    } else {
      setEditForm(null);
    }
  }, [editModal]);


  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModal || !editForm) return;
    if (!isAuthenticated) return;
    const token = await getAccessTokenSilently();
    if (editModal.type === 'skill' && isSkill(editForm)) {
      const isEdit = typeof (editForm as Skill).id === 'number' || typeof (editForm as Skill).id === 'string';
      if (isEdit) {
        await skillsApi.updateSkill((editForm as Skill).id.toString(), {
          skillId: (editForm as Skill).skillId,
          name: editForm.name,
          level: editForm.level ?? ''
        }, token);
        setSkills((prevSkills) => {
          const updatedId = (editForm as Skill).id;
          const updatedSkill = { ...prevSkills.find(skill => skill.id === updatedId)!, name: editForm.name, level: editForm.level ?? '' };
          return prevSkills.map(skill => skill.id === updatedId ? updatedSkill : skill);
        });
      } else {
        const newSkill = await skillsApi.createSkill({
          skillId: '',
          name: editForm.name,
          level: editForm.level ?? ''
        }, token);
        setSkills((prevSkills) => [
          ...prevSkills,
          newSkill
        ]);
      }
    }
    if (editModal.type === 'work' && isWork(editForm)) {
      const isEdit = Boolean((editModal.item as WorkExperience).id);
      if (isEdit) {
        try {
          await workApi.updateWork((editForm as WorkExperience).id, {
            workId: editForm.workId,
            name: editForm.name,
            workName: editForm.workName,
            time: editForm.time,
            description: editForm.description
          }, token);
          setWorkExperience((prevWork) => {
            const updatedId = (editForm as WorkExperience).id;
            const updatedWork = { ...prevWork.find(work => work.id === updatedId)!, ...editForm };
            return prevWork.map(work => work.id === updatedId ? updatedWork : work);
          });
        } catch (error) {
          setWorkError("Failed to update work experience");
          console.error(error);
        }
      } else {
        try {
          const newWork = await workApi.createWork({
            workId: editForm.workId,
            name: editForm.name,
            workName: editForm.workName,
            time: editForm.time,
            description: editForm.description
          }, token);
          setWorkExperience((prevWork) => [
            ...prevWork,
            {
              id: String(newWork.id ?? newWork.workId ?? ''),
              workId: newWork.workId ?? '',
              name: newWork.name ?? '',
              workName: newWork.workName ?? '',
              time: newWork.time ?? '',
              description: newWork.description ?? ''
            }
          ]);
        } catch (error) {
          setWorkError("Failed to add work experience");
          console.error(error);
        }
      }
    }
    if (editModal.type === 'education' && isEducation(editForm)) {
      const edu = editForm as Education;
      if (edu.id) {
        // Edit existing education (use backend id)
        await educationApi.updateEducation(edu.id, {
          educationId: edu.educationId,
          schoolName: edu.schoolName,
          program: edu.program,
          time: edu.time
        }, token);
      } else {
        // Add new education, then refresh list from backend
        await educationApi.createEducation({
          educationId: edu.educationId,
          schoolName: edu.schoolName,
          program: edu.program,
          time: edu.time
        }, token);
      }
      // Always refresh the education list from backend after add/edit
      const freshList = await educationApi.getAll(token);
      setEducation(freshList.map((item) => ({
        id: String(item.id ?? item.educationId ?? ''),
        educationId: item.educationId || '',
        schoolName: item.schoolName || '',
        program: item.program || '',
        time: item.time || '',
      })));
    }
    setEditModal(null);
  };

  return (
    <main className="py-20 px-4 min-h-[100vh] flex items-start justify-start bg-gradient-to-br from-zinc-100 via-blue-50 to-zinc-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950">
      <div className="w-full flex flex-col md:flex-row gap-14">
        {/* Sidebar About Me */}
        <aside className="w-full max-w-md flex flex-col items-center md:items-start bg-white/90 dark:bg-zinc-800/90 rounded-2xl shadow border border-zinc-100 dark:border-zinc-700 p-10 mb-8 md:mb-0 animate-fade-in h-[calc(100vh-5rem)] md:sticky md:top-0">
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg mb-4 mx-auto md:mx-0">
              <span className="text-5xl text-white font-bold">👨‍💻</span>
            </div>
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-1">{t('aboutMe')}</h2>
            <div className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">{t('studentTitle')}</div>
            <p className="text-lg text-zinc-700 dark:text-zinc-200 leading-relaxed mb-4 w-full">{t('aboutText')}</p>
          </div>
        </aside>
        {/* Main Cards Section */}
        <section className="flex-1 w-full flex flex-col gap-10 items-center">
          {/* Skills Card */}
          <div className="bg-gradient-to-br from-blue-100/80 to-blue-200/80 dark:from-zinc-800/80 dark:to-blue-900/80 rounded-2xl shadow border border-blue-100 dark:border-blue-800 p-8 flex flex-col w-full h-[260px] max-h-[280px] transition-transform hover:-translate-y-1 hover:shadow-xl text-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <span>🛠️</span> {t('skills')}
              </h2>
              {isAdmin && (
                <button className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm shadow" onClick={() => setEditModal({ type: 'skill', item: { id: '', skillId: '', name: '', level: '' } })}>{t('add')}</button>
              )}
            </div>
            {loadingSkills ? (
              <div className="text-blue-600 dark:text-blue-400 animate-pulse">{t('loadingSkills')}</div>
            ) : skillsError ? (
              <div className="text-red-600 dark:text-red-400">{skillsError}</div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto h-[240px] pr-2">
                {skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-white/80 dark:bg-zinc-900/80 rounded-lg p-3 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <span className="text-2xl">{skillIconMap[skill.name?.toLowerCase()] || <FaFilePdf className="text-zinc-400" />}</span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50 truncate">{skill.name}</span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1 truncate">{skill.level}</span>
                    </div>
                    {isAdmin && (
                      <>
                        <button className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition ml-2" title={t('edit')} onClick={() => setEditModal({ type: 'skill', item: skill })}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC107" width="20" height="20"><path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                        </button>
                        <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition text-red-500 text-lg font-bold" title={t('delete')} onClick={async () => { try { if (!isAuthenticated) return; const token = await getAccessTokenSilently(); await skillsApi.deleteSkill(skill.id, token); setSkills((prev) => prev.filter((_, i) => i !== idx)); } catch {} }} aria-label={t('delete')}>&times;</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Work Card */}
          <div className="bg-gradient-to-br from-emerald-100/80 to-emerald-200/80 dark:from-zinc-800/80 dark:to-emerald-900/80 rounded-2xl shadow border border-emerald-100 dark:border-emerald-800 p-8 flex flex-col w-full h-[260px] max-h-[280px] transition-transform hover:-translate-y-1 hover:shadow-xl text-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <span>💼</span> {t('workExperience')}
              </h2>
              {isAdmin && (
                <button className="px-3 py-1 rounded bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition text-sm shadow" onClick={() => setEditModal({ type: 'work', item: { id: '', workId: '', name: '', workName: '', time: '', description: '' } })}>{t('add')}</button>
              )}
            </div>
            {loadingWork ? (
              <div className="text-emerald-600 dark:text-emerald-400 animate-pulse">{t('loadingWork')}</div>
            ) : workError ? (
              <div className="text-red-600 dark:text-red-400">{workError}</div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto h-[240px] pr-2">
                {workExperience.map((job, idx) => (
                  <li key={job.workId || idx} className="flex flex-col bg-white/80 dark:bg-zinc-900/80 rounded-lg p-3 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <FaBriefcase className="text-lg text-emerald-600" />
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">{job.name}</span>
                      {isAdmin && (
                        <>
                          <button className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition ml-auto" title={t('edit')} onClick={() => setEditModal({ type: 'work', item: job })}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4 1 1-4 13.362-13.726z" /></svg>
                          </button>
                          <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition text-red-500 text-lg font-bold" title={t('delete')} onClick={async () => { try { if (!isAuthenticated) return; const token = await getAccessTokenSilently(); await workApi.deleteWork(job.id, token); setWorkExperience((prev) => prev.filter((_, i) => i !== idx)); } catch {} }} aria-label={t('delete')}>&times;</button>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 mb-1">
                      <FaBuilding className="text-md text-zinc-400" />
                      <span>{job.workName}</span>
                    </div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-1">{job.time}</div>
                    <div className="text-zinc-700 dark:text-zinc-200 text-sm">{job.description}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Education Card */}
          <div className="bg-gradient-to-br from-purple-100/80 to-purple-200/80 dark:from-zinc-800/80 dark:to-purple-900/80 rounded-2xl shadow border border-purple-100 dark:border-purple-800 p-8 flex flex-col w-full h-[260px] max-h-[280px] transition-transform hover:-translate-y-1 hover:shadow-xl text-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-200 flex items-center gap-2">
                <span>🎓</span> {t('education')}
              </h2>
              {isAdmin && (
                <button className="px-3 py-1 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition text-sm shadow" onClick={() => setEditModal({ type: 'education', item: { id: '', educationId: '', schoolName: '', program: '', time: '' } })}>{t('add')}</button>
              )}
            </div>
            {educationLoading ? (
              <div className="p-4 text-sm text-purple-600 dark:text-purple-400 animate-pulse">{t('loadingEducation')}</div>
            ) : educationError ? (
              <div className="p-4 text-sm text-red-500">{educationError}</div>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto h-[240px] pr-2">
                {education.map((item, idx) => (
                  <li key={item.educationId} className="flex flex-col bg-white/80 dark:bg-zinc-900/80 rounded-lg p-3 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <FaFilePdf className="text-lg text-purple-600" />
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">{item.schoolName}</span>
                      {isAdmin && (
                        <>
                          <button className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition ml-auto" title={t('edit')} onClick={() => setEditModal({ type: 'education', item })}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4 1 1-4 13.362-13.726z" /></svg>
                          </button>
                          <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition text-red-500 text-lg font-bold" title={t('delete')} onClick={async () => { try { if (!isAuthenticated) return; const token = await getAccessTokenSilently(); await educationApi.deleteEducation(item.id, token); setEducation((prev) => prev.filter((_, i) => i !== idx)); } catch {} }} aria-label={t('delete')}>&times;</button>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 mb-1">
                      <span>{item.program}</span>
                    </div>
                    <div className="text-xs text-purple-700 dark:text-purple-300 mb-1">{item.time}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        {/* Skills Modal */}
        <Modal isOpen={openModal === 'skills'} onClose={() => setOpenModal(null)} title={t('skills')}>
          {loadingSkills && <div className="text-blue-600 dark:text-blue-400">{t('loadingSkills')}</div>}
          {skillsError && <div className="text-red-600 dark:text-red-400">{skillsError}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-100 dark:border-zinc-800">
                <span className="text-3xl">
                  {skillIconMap[skill.name?.toLowerCase()] || <FaFilePdf className="text-zinc-400" />}
                </span>
                <div className="flex-1">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-50">{skill.name}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{skill.level}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    title="Edit"
                    style={{ background: 'none', border: 'none', boxShadow: 'none', lineHeight: 1 }}
                    onClick={() => setEditModal({ type: 'skill', item: skill })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC107" width="28" height="28" style={{ display: 'inline', verticalAlign: 'middle' }}>
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                  <button
                    className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition text-red-500 text-xl font-bold"
                    title="Delete"
                    onClick={async () => {
                      try {
                        if (!isAuthenticated) return;
                        const token = await getAccessTokenSilently();
                        await skillsApi.deleteSkill(skill.id, token);
                        setSkills((prev) => prev.filter((_, i) => i !== idx));
                      } catch {}
                    }}
                    aria-label="Delete skill"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => setEditModal({ type: 'skill', item: { id: '', skillId: '', name: '', level: '' } })}
            >
              {t('add')}
            </button>
          </div>
        </Modal>
        {/* Work Experience Modal */}
          <Modal isOpen={openModal === 'work'} onClose={() => setOpenModal(null)} title={t('workExperience')}>
            {loadingWork && <div className="text-blue-600 dark:text-blue-400">{t('loadingWork')}</div>}
            {workError && <div className="text-red-600 dark:text-red-400">{workError}</div>}
            <div className="space-y-4 mb-6">
              {workExperience.map((job, idx) => (
                <div key={job.workId || idx} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-100 dark:border-zinc-800 flex items-start gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <FaBriefcase className="text-lg text-emerald-600" />
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">{job.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 mb-1">
                      <FaBuilding className="text-md text-zinc-400" />
                      <span>{job.workName}</span>
                    </div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-1">{job.time}</div>
                    <div className="text-zinc-700 dark:text-zinc-200 text-sm">{job.description}</div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <button
                      className="ml-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition mt-1"
                      title="Edit"
                      onClick={() => setEditModal({ type: 'work', item: job })}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4 1 1-4 13.362-13.726z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition text-red-500 text-xl font-bold"
                      title="Delete"
                      onClick={async () => {
                        try {
                          if (!isAuthenticated) return;
                          const token = await getAccessTokenSilently();
                          await workApi.deleteWork(job.id, token);
                          setWorkExperience((prev) => prev.filter((_, i) => i !== idx));
                        } catch {}
                      }}
                      aria-label="Delete work"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                onClick={() => setEditModal({ type: 'work', item: { id: '', workId: '', name: '', workName: '', time: '', description: '' } })}
              >
                {t('add')}
              </button>
            </div>
          </Modal>
        {/* Education Modal */}
        <Modal isOpen={openModal === 'education'} onClose={() => setOpenModal(null)} title={t('education')}>
          {educationLoading && <div className="p-4 text-sm text-gray-500">{t('loadingEducation')}</div>}
          {educationError && <div className="p-4 text-sm text-red-500">{educationError}</div>}
          {!educationLoading && !educationError && (
            <div className="space-y-4 mb-6">
              {education.map((item, idx) => (
                <div key={item.educationId} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-100 dark:border-zinc-800 flex items-start gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <FaFilePdf className="text-lg text-purple-600" />
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">{item.schoolName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 mb-1">
                      <span>{item.program}</span>
                    </div>
                    <div className="text-xs text-purple-700 dark:text-purple-300 mb-1">{item.time}</div>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <button
                      className="ml-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition mt-1"
                      title="Edit"
                      onClick={() => setEditModal({ type: 'education', item })}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4 1 1-4 13.362-13.726z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition text-red-500 text-xl font-bold"
                      title="Delete"
                      onClick={async () => {
                        try {
                          if (!isAuthenticated) return;
                          const token = await getAccessTokenSilently();
                          await educationApi.deleteEducation(item.id, token);
                          setEducation((prev) => prev.filter((_, i) => i !== idx));
                        } catch {}
                      }}
                      aria-label="Delete education"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => setEditModal({ type: 'education', item: { id: '', educationId: '', schoolName: '', program: '', time: '' } })}
            >
              {t('add')}
            </button>
          </div>
        </Modal>
        {/* Edit Modal */}
        <Modal
          isOpen={!!editModal}
          onClose={() => setEditModal(null)}
          title={editModal ? `${isEditModal(editModal) ? t('edit') : t('add')} ${t(editModal.type)}` : ''}
        >
          {editModal && (
            <form className="space-y-4" onSubmit={handleEditSave}>
              {editModal.type === 'skill' && isSkill(editForm) && (
                <>
                  <div>
                    <div className="mb-2 font-semibold">{t('skillName')}</div>
                    <input
                      name="name"
                      className="w-full border rounded p-2 mb-2"
                      value={editForm.name}
                      onChange={handleEditChange}
                      required
                    />
                    <div className="mb-2 font-semibold">{t('level')}</div>
                    <input
                      name="level"
                      className="w-full border rounded p-2"
                      value={editForm.level ?? ''}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                </>
              )}
              {editModal.type === 'work' && isWork(editForm) && (
                <>
                  <div>
                    <div className="mb-2 font-semibold">{t('jobTitle')}</div>
                    <input
                      name="name"
                      className="w-full border rounded p-2 mb-2"
                      value={editForm.name}
                      onChange={handleEditChange}
                      required
                    />
                    <div className="mb-2 font-semibold">{t('company')}</div>
                    <input
                      name="workName"
                      className="w-full border rounded p-2 mb-2"
                      value={editForm.workName}
                      onChange={handleEditChange}
                      required
                    />
                    <div className="mb-2 font-semibold">{t('duration')}</div>
                    <input
                      name="time"
                      className="w-full border rounded p-2 mb-2"
                      value={editForm.time}
                      onChange={handleEditChange}
                      required
                    />
                    <div className="mb-2 font-semibold">{t('description')}</div>
                    <textarea
                      name="description"
                      className="w-full border rounded p-2"
                      value={editForm.description}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                </>
              )}
              {editModal.type === 'education' && isEducation(editForm) && (
                <>
                  <div>
                    <div className="mb-2 font-semibold">{t('schoolName')}</div>
                    <input
                      name="schoolName"
                      className="w-full border rounded p-2 mb-2"
                      value={editForm.schoolName}
                      onChange={handleEditChange}
                      required
                    />
                    <div className="mb-2 font-semibold">{t('program')}</div>
                    <input
                      name="program"
                      className="w-full border rounded p-2 mb-2"
                      value={editForm.program}
                      onChange={handleEditChange}
                      required
                    />
                    <div className="mb-2 font-semibold">{t('time')}</div>
                    <input
                      name="time"
                      className="w-full border rounded p-2"
                      value={editForm.time}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" className="px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-600 transition" onClick={() => setEditModal(null)}>{t('cancel')}</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">{t('save')}</button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </main>
  );
}

// Use type guards for editForm fields
function isSkill(item: unknown): item is Skill {
  return typeof item === 'object' && item !== null && 'name' in item && 'level' in item && 'id' in item;
}
function isWork(item: unknown): item is WorkExperience {
  return typeof item === 'object' && item !== null && 'workName' in item;
}
function isEducation(item: unknown): item is Education {
  return typeof item === 'object' && item !== null && 'schoolName' in item;
}

// ...existing code...
