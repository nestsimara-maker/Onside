import Link from "next/link";
import { ArrowUpRight, Rocket } from "lucide-react";
import { Container, SectionLabel } from "@/components/ui";
import EventCard from "@/components/EventCard";
import { CATEGORIES, SERVICES } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const STATS = [
  { num: "420+", label: "companies launched" },
  { num: "38", label: "government & bank partners" },
  { num: "6", label: "ecosystems on the hub" },
  { num: "$180M", label: "in grants facilitated" },
];

const PROCESS = [
  { title: "Tell us your goal", body: "Registration, banking, a grant, a hire — start anywhere." },
  { title: "Get matched", body: "An advisor scopes the right services and hub connections." },
  { title: "We execute", body: "Filings, meetings, and translations handled end to end." },
  { title: "You grow", body: "Stay connected through the hub as your business scales." },
];

export default async function Home() {
  const [counts, events] = await Promise.all([
    prisma.listing.groupBy({ by: ["category"], _count: { category: true } }),
    prisma.event.findMany({ orderBy: { date: "asc" }, take: 3 }),
  ]);
  const countMap = Object.fromEntries(
    counts.map((c) => [c.category, c._count.category]),
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 pb-20 pt-16 sm:pb-28 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(217,175,87,0.16), transparent 45%), radial-gradient(circle at 85% 0%, rgba(44,77,128,0.35), transparent 50%)",
          }}
        />
        <Container className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
            Business Accelerator · China
          </div>

          <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[1.03] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            The launchpad for business{" "}
            <span className="italic text-gold-300">in China.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-cream/60">
            Altura handles entity registration, banking, tax, grants, visas,
            and translation — and connects you to the companies, investors,
            banks, and government partners who move your business forward.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              Explore services
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
            <Link
              href="/hub"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-cream transition hover:border-white/40"
            >
              Enter the Playbook Hub
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-semibold text-cream sm:text-4xl">
                  {s.num}
                </p>
                <p className="mt-1 text-xs text-cream/45">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b border-line bg-cream-dim py-3">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10">
          {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <span
              key={`${c.slug}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-slate"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: c.colorVar }}
              />
              {c.label} Network
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Services</SectionLabel>
              <h2 className="max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
                Everything to set up and stay compliant.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600"
            >
              View all services
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((s, i) => (
              <Link
                key={s.slug}
                href={`/services#${s.slug}`}
                className="group bg-white p-7 transition hover:bg-cream"
              >
                <span className="font-display text-xs font-semibold text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {s.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-600 opacity-0 transition group-hover:opacity-100">
                  Request service <ArrowUpRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* HUB TEASER */}
      <section className="border-t border-line bg-navy-950 py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel dark>Playbook Hub</SectionLabel>
              <h2 className="max-w-xl font-display text-3xl font-semibold text-cream sm:text-4xl">
                One hub. Six ecosystems.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/55">
                Companies, corporates, investors, banks, governments, and
                students — networking in one digital space.
              </p>
            </div>
            <Link
              href="/hub"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-200"
            >
              Browse the hub
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/hub/${c.slug}`}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-5 transition hover:border-white/25 hover:bg-white/10"
              >
                <div>
                  <p className="font-display text-base font-semibold text-cream">
                    {c.label}
                  </p>
                  <p className="mt-0.5 text-xs text-cream/45">
                    {countMap[c.category] ?? 0} listed
                  </p>
                </div>
                <span
                  className="h-2.5 w-2.5 rounded-full transition group-hover:scale-125"
                  style={{ backgroundColor: c.colorVar }}
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
            From first call to fully operational.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-line bg-white p-6">
                <span className="font-display text-3xl font-semibold text-gold-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* EVENTS TEASER */}
      {events.length > 0 && (
        <section className="border-t border-line bg-cream-dim py-20 sm:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel>Events</SectionLabel>
                <h2 className="max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
                  Where the ecosystem shows up.
                </h2>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-600"
              >
                View all events
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-900 py-20">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="hidden shrink-0 rounded-full bg-white/10 p-3 sm:block">
              <Rocket size={22} className="text-gold-300" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                Ready to build in China?
              </h2>
              <p className="mt-2 max-w-md text-sm text-cream/60">
                Talk to an advisor about registration, banking, or your next
                grant application.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
          >
            Talk to an advisor
            <ArrowUpRight size={16} />
          </Link>
        </Container>
      </section>
    </>
  );
}
