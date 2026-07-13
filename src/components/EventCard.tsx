import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import type { Event } from "@/generated/prisma/client";

const VERTICAL_COLORS: Record<string, string> = {
  Technology: "var(--color-cat-corporate)",
  "Finance & Investment": "var(--color-cat-investor)",
  "Trade & Manufacturing": "var(--color-cat-bank)",
  "Legal & Policy": "var(--color-cat-government)",
  "Talent & Careers": "var(--color-cat-student)",
  Sustainability: "var(--color-cat-company)",
};

export default function EventCard({ event }: { event: Event }) {
  const color = VERTICAL_COLORS[event.vertical] ?? "var(--color-navy-700)";
  const date = new Date(event.date);
  const dateLabel = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-lg hover:shadow-navy-900/5"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {event.vertical}
        </span>
        <ArrowUpRight
          size={16}
          className="mt-1 shrink-0 text-slate-light opacity-0 transition group-hover:opacity-100"
        />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink">
        {event.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">
        {event.description}
      </p>

      <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-xs text-slate-light">
        <p className="flex items-center gap-1.5">
          <CalendarDays size={13} />
          {dateLabel}
        </p>
        <p className="flex items-center gap-1.5">
          <MapPin size={13} />
          {event.location}
        </p>
      </div>

      <p className="mt-3 text-xs font-medium text-slate">
        Organized by {event.organizer}
      </p>
    </a>
  );
}
