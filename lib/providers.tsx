"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { en, type Dict } from "@/content/en";
import { vi } from "@/content/vi";
import type { L } from "@/content/types";
import { subscribe, useStored, writeRaw } from "./storage";

export type Lang = "en" | "vi";
export type Theme = "light" | "dark";

const dictionaries: Record<Lang, Dict> = { en, vi };

type Ctx = {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  /** Picks the current language from bilingual content; missing Vietnamese falls back to English. */
  pick: (text: L) => string;
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const AppContext = createContext<Ctx | null>(null);

// The theme lives on <html data-theme>, set before paint by lib/theme-script.ts.
const readTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

export function Providers({ children }: { children: ReactNode }) {
  // First visit: English (prd.md > Language Toggle). Pages are pre-rendered in English.
  const [lang, setLang] = useStored<Lang>("lang", ["en", "vi"], "en");
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    writeRaw("theme", t);
  }, []);

  const pick = useCallback((text: L) => (lang === "vi" && text.vi ? text.vi : text.en), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <AppContext.Provider value={{ lang, t: dictionaries[lang], setLang, pick, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("hooks from lib/providers must be used inside <Providers>");
  return ctx;
}

export function useLang() {
  const { lang, t, setLang, pick } = useApp();
  return { lang, t, setLang, pick };
}

export function useTheme() {
  const { theme, setTheme } = useApp();
  return { theme, setTheme };
}
