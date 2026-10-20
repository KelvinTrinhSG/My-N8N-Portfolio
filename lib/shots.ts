// Paths and intrinsic sizes for the pre-compressed screenshots (scripts/images.mjs).
import n8nFormCrmAutomations from "@/content/projects/n8n-form-crm-automations.images.json";

type Sizes = Record<string, { w: number; h: number }>;

const SIZES: Record<string, Sizes> = {
  "n8n-form-crm-automations": n8nFormCrmAutomations,
};

export function shotSrc(slug: string, file: string, size: "sm" | "lg") {
  return `/shots/${slug}/${file}-${size}.webp`;
}

/** Size of the -sm thumbnail (640px wide), so the layout can reserve space before it loads. */
export function thumbSize(slug: string, file: string) {
  const s = SIZES[slug]?.[file];
  if (!s) return { width: 640, height: 400 };
  const width = Math.min(640, s.w);
  return { width, height: Math.round((s.h * width) / s.w) };
}

export function largeSize(slug: string, file: string) {
  const s = SIZES[slug]?.[file];
  return s ? { width: s.w, height: s.h } : undefined;
}
