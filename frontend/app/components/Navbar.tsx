"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { loginWithRedirect, isAuthenticated, logout, user, getAccessTokenSilently } = useAuth0();
  // Use the actual roles claim from the JWT
  const roles = user && user["https://api.portfolio.com/roles"];
  const isUserRole = Array.isArray(roles) && roles.includes("user");
  const isAdminRole = Array.isArray(roles) && roles.includes("admin");

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().catch(e => {
        console.log("JWT fetch error:", e);
      });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const toggleLang = () => {
    setLang(lang === "en" ? "fr" : "en");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-20">
      <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Mirko Di Criscio</span>
      <div className="flex items-center gap-6">
        <ul className="flex gap-6 text-zinc-700 dark:text-zinc-200 font-medium">
          <li><Link href="/" className="hover:text-blue-600 transition-colors">{t('home')}</Link></li>
          <li><Link href="/projects" className="hover:text-blue-600 transition-colors">{t('projects')}</Link></li>
          <li><Link href="/about" className="hover:text-blue-600 transition-colors">{t('about')}</Link></li>
          <li><Link href="/testimonials" className="hover:text-blue-600 transition-colors">{t('testimonials')}</Link></li>
          <li>
            <button
              className="hover:text-blue-600 transition-colors bg-transparent border-none p-0 m-0 text-inherit cursor-pointer"
              onClick={() => {
                if (!isAuthenticated) {
                  loginWithRedirect();
                } else {
                  window.location.href = "/contact";
                }
              }}
              style={{ background: "none", border: "none" }}
            >
              {t('contact')}
            </button>
          </li>
        </ul>
        {!isAuthenticated ? (
          <>
            <button
              className="px-4 py-2 rounded bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors border border-teal-600 ml-4"
              onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
            >
              Sign Up
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors border border-blue-600 ml-2"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <span className="ml-4 text-teal-900 dark:text-teal-100 font-semibold">{user?.name}</span>
            <button
              className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors border border-red-600 ml-2"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Logout
            </button>
          </>
        )}
        <button
          className="ml-4 px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          onClick={toggleLang}
          aria-label={t('language')}
        >
          🌐 {lang === "fr" ? "FR" : "EN"}
        </button>
      </div>
    </nav>
  );
}
