import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { CategoryMeta } from "@/lib/constants";
import type { Listing } from "@/generated/prisma/client";

export default function ListingCard({
  listing,
  meta,
}: {
  listing: Listing;
  meta: CategoryMeta;
}) {
  const tags = (listing.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Link
      href={`/hub/${meta.slug}/${listing.id}`}
      className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-gold-500 hover:shadow-lg hover:shadow-navy-900/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white"
          style={{ backgroundColor: meta.colorVar }}
        >
          {listing.name.slice(0, 1).toUpperCase()}
        </div>
        <ArrowUpRight
          size={16}
          className="mt-1 shrink-0 text-slate-light opacity-0 transition group-hover:opacity-100"
        />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink">
        {listing.name}
      </h3>
      {listing.tagline && (
        <p className="mt-1 text-sm text-slate">{listing.tagline}</p>
      )}

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate">
        {listing.description}
      </p>

      {listing.location && (
        <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-light">
          <MapPin size={13} />
          {listing.location}
        </p>
      )}

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream-dim px-2.5 py-1 text-[11px] font-medium text-slate"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
