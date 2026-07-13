import type { Metadata } from "next";
import { Container, SectionLabel } from "@/components/ui";
import ServiceItem from "@/components/ServiceItem";
import { SERVICES } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Altura",
  description:
    "Entity registration, corporate bank accounts, taxation & accounting, grants & subsidies, visas & residence, legal translation, IP, and HR — everything to set up and run your business in China.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy-950 py-20 sm:py-28">
        <Container>
          <SectionLabel dark>Services</SectionLabel>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            Everything it takes to set up and run in China.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/60">
            Altura&rsquo;s advisors handle the paperwork, the bureaucracy, and the
            relationships — so you can focus on building. Pick a service
            below to request it directly.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-5">
            {SERVICES.map((service, i) => (
              <ServiceItem key={service.slug} service={service} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-navy-900 py-20">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mt-2 max-w-md text-sm text-cream/60">
              Tell us about your business and our team will map out the
              right path — registration, banking, tax, or all three.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
          >
            Talk to an advisor
          </Link>
        </Container>
      </section>
    </>
  );
}
