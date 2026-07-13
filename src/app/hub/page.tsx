import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionLabel } from "@/components/ui";
import { CATEGORIES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Playbook Hub — Altura",
  description:
    "Altura's digital hub connects companies, corporates, investors, banks, governments, and students across the ecosystem.",
};

export default async function HubPage() {
  const counts = await prisma.listing.groupBy({
    by: ["category"],
    _count: { category: true },
  });
  const countMap = Object.fromEntries(
    counts.map((c) => [c.category, c._count.category]),
  );

  return (
    <>
      <section className="bg-navy-950 py-20 sm:py-28">
        <Container>
          <SectionLabel dark>Playbook Hub</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            One hub. Six ecosystems. Every connection you need.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/60">
            Companies list their needs. Corporates post technology and
            talent needs. Investors scout deals. Banks and governments
            promote what they offer. Students find their next role. All in
            one place.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/hub/${c.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-900/5"
                style={{ borderTopWidth: 3, borderTopColor: c.colorVar }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: c.colorVar }}
                    >
                      {countMap[c.category] ?? 0} listed
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-slate-light opacity-0 transition group-hover:opacity-100"
                    />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-semibold text-ink">
                    {c.label}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-slate">
                    {c.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-light">
                    {c.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
