"use client";
import React, { useState } from "react";
import { TestimonyRequestDTO } from "../testimonyApi";
import Modal from "./Modal";
import profanityList from "../profanityList";

interface AddTestimonyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TestimonyRequestDTO) => Promise<void>;
  loading: boolean;
  lang: string;
}

export default function AddTestimonyModal({ isOpen, onClose, onSubmit, loading, lang }: AddTestimonyModalProps) {
  const [form, setForm] = useState<TestimonyRequestDTO>({ firstName: "", lastName: "", comment: "", rating: 5 });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name === "comment" && value.length > 130) return;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // Profanity check
    const lower = (str: string) => str.toLowerCase();
    const fields = [form.firstName, form.lastName, form.comment];
    const hasProfanity = fields.some(field =>
      profanityList.some(word => lower(field).includes(word))
    );
    if (hasProfanity) {
      setError(lang === "fr" ? "Veuillez retirer le langage inapproprié de votre témoignage." : "Please remove inappropriate language from your testimonial.");
      return;
    }
    if (form.comment.length > 130) {
      setError(lang === "fr" ? "La description ne doit pas dépasser 130 caractères." : "Description must not exceed 130 characters.");
      return;
    }
    try {
      await onSubmit(form);
      setSubmitted(true);
      setForm({ firstName: "", lastName: "", comment: "", rating: 5 });
    } catch {
      setError(lang === "fr" ? "Échec de la soumission du témoignage" : "Failed to submit testimonial");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={lang === "fr" ? "Soumettre un témoignage" : "Submit a Testimonial"}>
      <div className="rounded-2xl bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 dark:from-purple-900 dark:via-purple-950 dark:to-purple-800 p-6 shadow-lg">
        {error && <div className="mb-3 p-3 bg-red-100 text-red-800 rounded text-center font-medium shadow">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">{lang === "fr" ? "Prénom" : "First Name"}</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-purple-200 dark:border-purple-600 px-4 py-3 rounded-xl bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder={lang === "fr" ? "ex : Jean" : "ex: John"}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">{lang === "fr" ? "Nom" : "Last Name"}</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-purple-200 dark:border-purple-600 px-4 py-3 rounded-xl bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder={lang === "fr" ? "ex : Dupont (optionnel)" : "ex: Doe (optional)"}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">{lang === "fr" ? "Commentaire" : "Comment"}</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="w-full border border-purple-200 dark:border-purple-600 px-4 py-3 rounded-xl bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              rows={3}
              placeholder={lang === "fr" ? "ex : Mirko était un excellent coéquipier et a toujours livré à temps." : "ex: Mirko was a great teammate and always delivered on time."}
              required
              maxLength={130}
            />
            <div className="text-xs text-purple-500 mt-1 text-right">{form.comment.length}/130</div>
          </div>
          <div>
            <label className="block mb-1 font-semibold text-purple-700 dark:text-purple-200">{lang === "fr" ? "Note" : "Rating"}</label>
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${form.rating >= star ? 'text-yellow-400' : 'text-purple-300'} focus:outline-none`}
                  onClick={() => setForm({ ...form, rating: star })}
                  aria-label={lang === "fr" ? `Définir la note à ${star}` : `Set rating to ${star}`}
                >★</button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-teal-600 transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (lang === "fr" ? "Soumission..." : "Submitting...") : (lang === "fr" ? "Soumettre" : "Submit")}
          </button>
        </form>
      </div>
    </Modal>
  );
}
