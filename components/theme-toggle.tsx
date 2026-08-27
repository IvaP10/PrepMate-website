"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystemPreference = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem("prepmate-theme")) return;
      const nextTheme: Theme = event.matches ? "dark" : "light";
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
    };
    preference.addEventListener("change", followSystemPreference);
    return () => preference.removeEventListener("change", followSystemPreference);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("prepmate-theme", nextTheme);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Switch color theme"
      title="Switch color theme"
    >
      <span className="theme-icon theme-icon-moon" aria-hidden="true">☾</span>
      <span className="theme-icon theme-icon-sun" aria-hidden="true">☀</span>
    </button>
  );
}
