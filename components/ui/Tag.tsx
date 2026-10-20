import type { ReactNode } from "react";

// Integration tag: 9%-tint fill with a 19%-tint border, in the secondary (violet) color.
export default function Tag({ children, color = "var(--secondary)" }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{
        color,
        background: `color-mix(in srgb, ${color} 9%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 19%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}
