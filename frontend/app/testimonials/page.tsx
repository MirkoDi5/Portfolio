"use client";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { testimonyApi, TestimonyResponseDTO, TestimonyRequestDTO } from "../testimonyApi";
import AddTestimonyModal from "../components/AddTestimonyModal";
import Modal from "../components/Modal";
import { useLanguage } from "../context/LanguageContext";

function getInitials(firstName: string, lastName: string) {
  return (firstName?.[0] || "") + (lastName?.[0] || "");
}

export default function TestimonialsPage() {
  const { lang } = useLanguage();
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const roles = user && user["https://api.portfolio.com/roles"];
  const isAdmin = Array.isArray(roles) && roles.includes("admin");
  const [testimonials, setTestimonials] = useState<TestimonyResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await testimonyApi.getAll();
        setTestimonials(data);
      } catch {
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  async function handleAddTestimony(data: TestimonyRequestDTO) {
    if (!isAuthenticated) return;
    setActionLoading(true);
    setError("");
    try {
      const token = await getAccessTokenSilently();
      await testimonyApi.createTestimony(data, token);
      const refreshed = await testimonyApi.getAll();
      setTestimonials(refreshed);
      setModalOpen(false);
      setSuccessModalOpen(true);
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError("Failed to submit testimonial");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleApprove(id: number) {
    if (!isAdmin) return;
    setActionLoading(true);
    setError("");
    try {
      const testimony = testimonials.find(t => t.id === id);
      if (!testimony) return;
      const updateDto = {
        firstName: testimony.firstName,
        lastName: testimony.lastName,
        comment: testimony.comment,
        rating: testimony.rating,
        status: "APPROVED" as const
      };
      const token = await getAccessTokenSilently();
      await testimonyApi.updateTestimony(id, updateDto, token);
      setTestimonials(ts => ts.map(t => t.id === id ? { ...t, status: "APPROVED" } : t));
    } catch {
      setError("Failed to approve testimonial");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReject(id: number) {
    if (!isAdmin) return;
    setActionLoading(true);
    setError("");
    try {
      const testimony = testimonials.find(t => t.id === id);
      if (!testimony) return;
      const updateDto = {
        firstName: testimony.firstName,
        lastName: testimony.lastName,
        comment: testimony.comment,
        rating: testimony.rating,
        status: "REJECTED" as const
      };
      const token = await getAccessTokenSilently();
      await testimonyApi.updateTestimony(id, updateDto, token);
      setTestimonials(ts => ts.map(t => t.id === id ? { ...t, status: "REJECTED" } : t));
    } catch {
      setError("Failed to reject testimonial");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!isAdmin) return;
    setActionLoading(true);
    setError("");
    try {
      const token = await getAccessTokenSilently();
      await testimonyApi.deleteTestimony(id, token);
      setTestimonials(ts => ts.filter(t => t.id !== id));
    } catch {
      setError("Failed to delete testimonial");
    } finally {
      setActionLoading(false);
    }
  }

  const visibleTestimonials = isAdmin ? testimonials : testimonials.filter(t => t.status === "APPROVED");

  return (
    <main className="pt-8 px-4 min-h-[80vh] bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 dark:from-purple-900 dark:via-purple-950 dark:to-purple-800 flex items-start justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-900 dark:text-purple-100 tracking-tight">{lang === "fr" ? "Témoignages" : "Testimonials"}</h1>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded text-center font-medium shadow">{error}</div>}
        <div className="flex justify-end mb-6">
          {isAuthenticated && !isAdmin && (
            <button
              className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-colors text-lg"
              onClick={() => setModalOpen(true)}
            >
              {lang === "fr" ? "+ Ajouter un témoignage" : "+ Add Testimony"}
            </button>
          )}
        </div>
        <AddTestimonyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddTestimony} loading={actionLoading} lang={lang} />
        <Modal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} title={lang === "fr" ? "Succès !" : "Success!"}>
          <div className="p-6 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-lg font-semibold mb-2">{lang === "fr" ? "Témoignage soumis !" : "Testimonial submitted!"}</div>
            <div className="text-zinc-600 dark:text-zinc-300 mb-4">{lang === "fr" ? "Approbation en attente." : "Approval is now pending."}</div>
            <button
              className="mt-2 px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
              onClick={() => setSuccessModalOpen(false)}
            >
              {lang === "fr" ? "Fermer" : "Close"}
            </button>
          </div>
        </Modal>
        <section>
          <h2 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">{isAdmin ? (lang === "fr" ? "Tous les témoignages" : "All Testimonials") : (lang === "fr" ? "Ce que les gens disent" : "What people say")}</h2>
          <div className="rounded-2xl bg-white/90 dark:bg-purple-900/80 shadow-lg border border-purple-100 dark:border-purple-700 p-6 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-8">{lang === "fr" ? "Chargement..." : "Loading..."}</div>
            ) : (
              <ul className="space-y-6">
                {visibleTestimonials.length === 0 && <li className="text-center text-purple-500">{lang === "fr" ? "Aucun témoignage pour le moment." : "No testimonials yet."}</li>}
                {visibleTestimonials.map(t => (
                  <li key={t.id} className="bg-white dark:bg-purple-900 rounded-xl shadow p-6 border border-purple-100 dark:border-purple-700 relative transition-transform hover:-translate-y-1 hover:shadow-2xl">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-md">
                        {getInitials(t.firstName, t.lastName)}
                      </div>
                      <span className="font-bold text-lg text-purple-900 dark:text-purple-100">{t.firstName} {t.lastName}</span>
                      <span className="ml-auto text-purple-500 font-semibold text-lg">{t.rating}★</span>
                    </div>
                    <div className="mb-2 text-purple-700 dark:text-purple-200 text-base">{t.comment}</div>
                    {isAdmin && (
                      <div className="text-xs text-purple-400">{lang === "fr" ? "Statut" : "Status"}: {t.status}</div>
                    )}
                    {isAdmin && (
                      <div className="flex gap-2 mt-2">
                        {t.status !== "APPROVED" && (
                          <button onClick={() => handleApprove(t.id)} className="px-3 py-1 rounded bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors disabled:opacity-60 shadow-md" disabled={actionLoading}>{lang === "fr" ? "Approuver" : "Approve"}</button>
                        )}
                        {t.status !== "REJECTED" && (
                          <button onClick={() => handleReject(t.id)} className="px-3 py-1 rounded bg-yellow-500 text-white text-sm font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-60 shadow-md" disabled={actionLoading}>{lang === "fr" ? "Rejeter" : "Reject"}</button>
                        )}
                        <button onClick={() => handleDelete(t.id)} className="px-3 py-1 rounded bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-60 shadow-md" disabled={actionLoading}>{lang === "fr" ? "Supprimer" : "Delete"}</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
