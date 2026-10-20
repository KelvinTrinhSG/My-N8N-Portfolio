import type { ComponentProps } from "react";

type Props = ComponentProps<"a"> & {
  variant?: "primary" | "outline";
};

// Link styled as a button (every button on this site navigates somewhere).
export default function ButtonLink({ variant = "primary", className = "", ...rest }: Props) {
  return (
    <a
      className={`btn-${variant} inline-flex items-center justify-center gap-2 rounded-(--radius-sm) px-5 py-2.5 text-sm font-semibold ${className}`}
      {...rest}
    />
  );
}
