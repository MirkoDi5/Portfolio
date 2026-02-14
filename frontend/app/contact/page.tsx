"use client";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { contactsApi, ContactsResponseDTO } from "../contactsApi";
import profanityList from "../profanityList";

export default function ContactPage() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const roles = user && user["https://api.portfolio.com/roles"];
  const isUser = Array.isArray(roles) && roles.includes("user");
  const isAdmin = Array.isArray(roles) && roles.includes("admin");

  const [form, setForm] = useState({ name: "", lastName: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [contacts, setContacts] = useState<ContactsResponseDTO[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      setContactsLoading(true);
      setContactsError(null);
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          const data = await contactsApi.getAllContacts(token);
          setContacts(data);
        } catch {
          setContactsError("Failed to load contacts.");
        } finally {
          setContactsLoading(false);
        }
      })();
    }
  }, [isAdmin, getAccessTokenSilently]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        await contactsApi.createContact({
          name: form.name,
          lastName: form.lastName,
          email: form.email,
          comment: form.message,
        }, token);
        setSubmitted(true);
        setForm({ name: "", lastName: "", email: "", message: "" });
      } catch {
        setSubmitted(false);
        alert("Failed to send message. Please try again.");
      }
    })();
  }

  function getProfanity(text: string): string[] {
    if (!text) return [];
    const lower = text.toLowerCase();
    return profanityList.filter((word: string) => lower.includes(word));
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (isUser) {
    const profanity = getProfanity(form.message);
    return (
      <main className="py-8 px-4 min-h-[80vh] bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-900 dark:via-blue-950 dark:to-blue-800 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto bg-white/90 dark:bg-zinc-800/90 rounded-3xl shadow-2xl border border-blue-100 dark:border-blue-700 p-0 relative">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 dark:from-blue-900 dark:via-blue-950 dark:to-blue-800 blur-lg opacity-40 z-0"></div>
          <div className="relative z-10 p-8 md:p-10">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-blue-200 dark:bg-blue-900 p-3 rounded-full mb-3 shadow text-3xl">✉️</div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center text-blue-900 dark:text-blue-50 tracking-tight drop-shadow">Contact</h1>
              <p className="text-blue-600 dark:text-blue-200 text-center text-base max-w-md">I&apos;d love to hear from you! Fill out the form below and I&apos;ll get back to you soon.</p>
            </div>
            {profanity.length > 0 && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded text-center font-medium shadow">
                Profanity detected: {profanity.join(", ")}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold text-blue-700 dark:text-blue-200">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="ex: John"
                    className="w-full border border-blue-300 dark:border-blue-600 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-blue-700 dark:text-blue-200">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="ex: Doe"
                    className="w-full border border-blue-300 dark:border-blue-600 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-semibold text-blue-700 dark:text-blue-200">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ex: john.doe@email.com"
                  className="w-full border border-blue-300 dark:border-blue-600 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-blue-700 dark:text-blue-200">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="ex: I would like to connect about..."
                  className="w-full border border-blue-300 dark:border-blue-600 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm resize-none"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-xl hover:from-blue-600 hover:to-blue-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  if (isAdmin) {
    return (
      <main className="pt-0 px-4 min-h-[80vh] bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-blue-900 dark:via-blue-950 dark:to-blue-800 flex items-start justify-center">
        <div className="w-full max-w-4xl mx-auto mt-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-blue-900 dark:text-blue-50 tracking-tight drop-shadow">Contacts List</h1>
          <div className="bg-white/90 dark:bg-zinc-800/90 rounded-3xl shadow-2xl border border-blue-100 dark:border-blue-700 p-0 relative">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 dark:from-blue-900 dark:via-blue-950 dark:to-blue-800 blur-lg opacity-40 z-0"></div>
            <div className="relative z-10 p-6 md:p-8">
              {contactsLoading && <div className="text-center text-blue-500">Loading contacts...</div>}
              {contactsError && <div className="text-center text-red-500">{contactsError}</div>}
              {!contactsLoading && !contactsError && contacts.length === 0 && (
                <div className="text-center text-blue-400">No contacts found.</div>
              )}
              {!contactsLoading && !contactsError && contacts.length > 0 && (
                <div className="max-h-96 overflow-y-auto">
                  <ul className="divide-y divide-blue-200 dark:divide-blue-700">
                    {contacts.map((c) => (
                      <li key={c.id} className="mb-6 p-6 bg-white/90 rounded-2xl shadow flex flex-col gap-2 border border-blue-100">
                        <div className="font-bold text-blue-700 text-xl">{c.name} {c.lastName}</div>
                        <div className="text-blue-500 text-base">{c.email}</div>
                        <div className="text-blue-900 text-base mt-2">{c.comment}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
