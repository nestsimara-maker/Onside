import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Globe, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui";
import { getCategoryBySlug } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getListing(category: string, id: string) {
  const meta = getCategoryBySlug(category);
  if (!meta) return null;
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing || listing.category !== meta.category) return null;
  return { meta, listing };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { category, id } = await params;
  const result = await getListing(category, id);
  if (!result) return {};
  return {
    title: `${result.listing.name} — Altura Playbook Hub`,
    description: result.listing.tagline ?? result.listing.description,
  };
}

const DETAIL_FIELDS: Array<{
  key:
    | "needs"
    | "offering"
    | "fundingStage"
    | "investmentFocus"
    | "ticketSize"
    | "program"
    | "fieldOfStudy"
    | "availability";
  label: string;
}> = [
  { key: "needs", label: "Looking for" },
  { key: "offering", label: "Offering" },
  { key: "fundingStage", label: "Funding stage" },
  { key: "investmentFocus", label: "Investment focus" },
  { key: "ticketSize", label: "Typical ticket size" },
  { key: "program", label: "Program" },
  { key: "fieldOfStudy", label: "Field of study" },
  { key: "availability", label: "Availability" },
];

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const result = await getListing(category, id);
  if (!result) notFound();
  const { meta, listing } = result;

  const tags = (listing.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const website = listing.website
    ? listing.website.startsWith("http")
      ? listing.website
      : `https://${listing.website}`
    : null;

  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <Link
          href={`/hub/${meta.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-ink"
        >
          <ArrowLeft size={15} />
          Back to {meta.label}
        </Link>

        <div className="mt-6 rounded-2xl border border-line bg-white p-7 sm:p-10">
          <div className="flex items-start gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-xl font-semibold text-white"
              style={{ backgroundColor: meta.colorVar }}
            >
              {listing.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <span
                className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
                style={{ backgroundColor: meta.colorVar }}
              >
                {meta.singular}
              </span>
              <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                {listing.name}
              </h1>
              {listing.tagline && (
                <p className="mt-1 text-sm text-slate">{listing.tagline}</p>
              )}
            </div>
          </div>

          <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate">
            {listing.description}
          </p>

          <div className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
            {DETAIL_FIELDS.filter((f) => listing[f.key]).map((f) => (
              <div key={f.key}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-light">
                  {f.label}
                </p>
                <p className="mt-1 text-sm text-ink">{listing[f.key]}</p>
              </div>
            ))}
          </div>

          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cream-dim px-3 py-1 text-xs font-medium text-slate"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-4 border-t border-line pt-6 text-sm">
            {listing.location && (
              <span className="flex items-center gap-1.5 text-slate">
                <MapPin size={15} />
                {listing.location}
              </span>
            )}
            <a
              href={`mailto:${listing.email}`}
              className="flex items-center gap-1.5 text-navy-800 hover:text-gold-600"
            >
              <Mail size={15} />
              {listing.email}
            </a>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-navy-800 hover:text-gold-600"
              >
                <Globe size={15} />
                Visit website
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
