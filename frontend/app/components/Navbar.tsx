"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { loginWithRedirect, isAuthenticated, logout, user, getAccessTokenSilently } = useAuth0();
  // Use the actual roles claim from the JWT
  const roles = user && user["https://api.portfolio.com/roles"];
  const isUserRole = Array.isArray(roles) && roles.includes("user");
  const isAdminRole = Array.isArray(roles) && roles.includes("admin");

  const [openMenu, setOpenMenu] = useState(false);

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
    <nav className="flex md:flex-row flex-col md:justify-between md:items-center px-2 md:px-8 py-4 bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-20">
      <div className="flex flex-row md:flex-row justify-between items-center w-full md:w-auto">
        <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Mirko Di Criscio</span>
        <button
          className="md:hidden ml-auto px-3 py-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          onClick={() => setOpenMenu(!openMenu)}
          aria-label={t('language')}
        >
          ☰
        </button>
      </div>
      <div className={`w-full md:w-auto ${openMenu ? 'block' : 'hidden'} md:flex md:items-center md:gap-6`}>
        <ul className="flex flex-col md:flex-row gap-2 md:gap-6 text-zinc-700 dark:text-zinc-200 font-medium md:items-center">
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
        <div className={`flex flex-col md:flex-row gap-2 md:gap-4 mt-2 md:mt-0 md:items-center ${openMenu ? 'items-start' : ''}`}>
          {!isAuthenticated ? (
            <>
              <button
                className={`px-4 py-2 rounded bg-teal-500 text-white font-semibold hover:bg-teal-600 transition-colors border border-teal-600 ${openMenu ? 'ml-0 w-full text-left' : 'ml-4'}`}
                onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
              >
                {t('signUp')}
              </button>
              <button
                className={`px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors border border-blue-600 ${openMenu ? 'ml-0 w-full text-left' : 'ml-2'}`}
                onClick={() => loginWithRedirect()}
              >
                {t('login')}
              </button>
            </>
          ) : (
            <>
              <span className={`text-teal-900 dark:text-teal-100 font-semibold ${openMenu ? 'ml-0 w-full text-left' : 'ml-4'}`}>{user?.name}</span>
              <button
                className={`px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors border border-red-600 ${openMenu ? 'ml-0 w-1/2 text-left mt-2' : 'ml-2'}`}
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              >
                {t('logout')}
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
      </div>
    </nav>
  );
}
