import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, SectionLabel } from "@/components/ui";
import ListingCard from "@/components/ListingCard";
import AddListingToggle from "@/components/AddListingToggle";
import { getCategoryBySlug } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta) return {};
  return {
    title: `${meta.label} — Playbook Hub — Altura`,
    description: meta.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta) notFound();

  const listings = await prisma.listing.findMany({
    where: { category: meta.category },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section
        className="py-16 sm:py-20"
        style={{
          background: `linear-gradient(135deg, ${meta.colorVar}14, transparent 60%)`,
        }}
      >
        <Container>
          <SectionLabel>Playbook Hub / {meta.label}</SectionLabel>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {meta.label}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
            {meta.description}
          </p>
          <div className="mt-8">
            <AddListingToggle meta={meta} />
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-14 sm:py-20">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-medium text-slate">
              {listings.length} {listings.length === 1 ? "listing" : "listings"}
            </p>
          </div>

          {listings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line py-20 text-center">
              <p className="text-sm text-slate-light">
                No listings yet. Be the first {meta.singular.toLowerCase()} in
                this directory.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} meta={meta} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
