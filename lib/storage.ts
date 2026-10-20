import { useCallback, useSyncExternalStore } from "react";

// Safe localStorage under the "portfolio:" prefix. If storage is blocked (private mode,
// strict settings), values live in memory for this visit, so the page still works
// without remembering choices (spec.md > Important Failure Modes).

export const PREFIX = "portfolio:";
const memory = new Map<string, string>();
const listeners = new Set<() => void>();

export function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(PREFIX + key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

export function writeRaw(key: string, value: string) {
  memory.set(key, value);
  try {
    window.localStorage.setItem(PREFIX + key, value);
  } catch {
    // storage unavailable — the in-memory copy keeps this visit working
  }
  notify();
}

export function notify() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

// A stored string, restricted to `allowed` values. Pre-rendered HTML and the first
// render use `fallback`; the saved value takes over right after hydration.
export function useStored<T extends string>(key: string, allowed: readonly T[], fallback: T): [T, (v: T) => void] {
  const raw = useSyncExternalStore(subscribe, () => readRaw(key), () => null);
  const value = raw !== null && (allowed as readonly string[]).includes(raw) ? (raw as T) : fallback;
  const set = useCallback((v: T) => writeRaw(key, v), [key]);
  return [value, set];
}
