import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionLabel({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`mb-4 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] ${
        dark ? "text-gold-300" : "text-gold-600"
      }`}
    >
      <span
        className={`h-px w-6 ${dark ? "bg-gold-300" : "bg-gold-600"}`}
      />
      {children}
    </p>
  );
}
