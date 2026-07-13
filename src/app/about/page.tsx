import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionLabel } from "@/components/ui";

export const metadata: Metadata = {
  title: "About — Altura",
  description:
    "Altura is a business accelerator and digital hub built to make China accessible — for companies, corporates, investors, banks, governments, and students.",
};

const VALUES = [
  {
    title: "On the ground",
    body: "Local teams in Shanghai, Shenzhen, and Singapore who know the regulators, the banks, and the paperwork firsthand.",
  },
  {
    title: "One relationship",
    body: "A single point of contact across registration, banking, tax, visas, and translation — no juggling five vendors.",
  },
  {
    title: "Open network",
    body: "The Playbook Hub exists because the best opportunities come from connections, not cold outreach.",
  },
];

const STATS = [
  { num: "420+", label: "companies launched" },
  { num: "38", label: "government & bank partners" },
  { num: "6", label: "ecosystems on the hub" },
  { num: "12", label: "countries served" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 py-20 sm:py-28">
        <Container>
          <SectionLabel dark>About Altura</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            We make building a business in China feel like building
            anywhere.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/60">
            Altura started as a registration desk for foreign founders and
            grew into a full accelerator — services to get set up, and a
            digital hub to plug into the wider ecosystem.
          </p>
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
                  {s.num}
                </p>
                <p className="mt-1 text-sm text-slate">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionLabel>What we believe</SectionLabel>
          <h2 className="max-w-xl font-display text-3xl font-semibold text-ink sm:text-4xl">
            Three ideas behind everything we build.
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.title}>
                <span className="font-display text-2xl font-semibold text-gold-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-navy-900 py-20">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
              Ready to build in China?
            </h2>
            <p className="mt-2 max-w-md text-sm text-cream/60">
              Start with a service, or jump straight into the Playbook Hub.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              Explore services
            </Link>
            <Link
              href="/hub"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-cream transition hover:border-white/40"
            >
              Enter the hub
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
