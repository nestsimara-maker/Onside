import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionLabel } from "@/components/ui";
import EventCard from "@/components/EventCard";
import AddEventToggle from "@/components/AddEventToggle";
import { EVENT_VERTICALS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events — Altura",
  description:
    "Events across technology, finance, trade, legal & policy, talent, and sustainability — click through to the organizer's page.",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ vertical?: string }>;
}) {
  const { vertical } = await searchParams;

  const events = await prisma.event.findMany({
    where: vertical ? { vertical } : undefined,
    orderBy: { date: "asc" },
  });

  return (
    <>
      <section className="bg-navy-950 py-20 sm:py-28">
        <Container>
          <SectionLabel dark>Events</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            Where the ecosystem shows up.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/60">
            Conferences, summits, and meetups across every vertical in the
            Altura network. Click through to the organizer to register.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/events"
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  !vertical
                    ? "bg-navy-900 text-cream"
                    : "bg-cream-dim text-slate hover:bg-line"
                }`}
              >
                All
              </Link>
              {EVENT_VERTICALS.map((v) => (
                <Link
                  key={v}
                  href={`/events?vertical=${encodeURIComponent(v)}`}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    vertical === v
                      ? "bg-navy-900 text-cream"
                      : "bg-cream-dim text-slate hover:bg-line"
                  }`}
                >
                  {v}
                </Link>
              ))}
            </div>
            <AddEventToggle />
          </div>

          <div className="mt-10">
            {events.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line py-20 text-center">
                <p className="text-sm text-slate-light">
                  No events in this vertical yet.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
