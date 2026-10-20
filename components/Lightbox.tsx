"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Screenshot } from "@/content/types";
import { en } from "@/content/en";
import { largeSize, shotSrc } from "@/lib/shots";

type Props = {
  slug: string;
  shots: Screenshot[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
};

const SWIPE_PX = 40;

// Full-screen viewer for the large screenshots (spec.md > Lightbox). No library.
export default function Lightbox({ slug, shots, index, onIndex, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const t = en.lightbox;
  const shot = shots[index];
  const count = shots.length;
  const prev = () => onIndex((index - 1 + count) % count);
  const next = () => onIndex((index + 1) % count);

  // Lock page scroll and move keyboard focus into the dialog while open.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Preload the next image so moving forward feels instant.
  useEffect(() => {
    if (count < 2) return;
    const img = new Image();
    img.src = shotSrc(slug, shots[(index + 1) % count].file, "lg");
  }, [slug, shots, index, count]);

  const size = largeSize(slug, shot.file);
  const navBtn =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/25";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.label.en}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (dx > SWIPE_PX) prev();
        else if (dx < -SWIPE_PX) next();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.close}
        className="absolute top-3 right-3 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/25"
      >
        ✕
      </button>

      {count > 1 && (
        <>
          <button type="button" onClick={prev} aria-label={t.prev} className={`${navBtn} left-2 sm:left-4`}>
            ‹
          </button>
          <button type="button" onClick={next} aria-label={t.next} className={`${navBtn} right-2 sm:right-4`}>
            ›
          </button>
        </>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={shot.file}
        src={shotSrc(slug, shot.file, "lg")}
        alt={shot.label.en}
        width={size?.width}
        height={size?.height}
        decoding="async"
        className="h-auto max-h-[82vh] w-auto max-w-[92vw] rounded-(--radius-sm) object-contain shadow-(--shadow-lg)"
      />

      <p className="mt-3 flex items-center gap-3 text-sm text-white/85">
        <span className="font-semibold">{shot.label.en}</span>
        <span className="figure text-white/60">
          {index + 1} / {count}
        </span>
      </p>
    </div>,
    document.body,
  );
}
