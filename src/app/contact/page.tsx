import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container, SectionLabel } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Altura",
  description: "Get in touch with the Altura team.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Let&rsquo;s talk.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-slate">
              Whether you&rsquo;re setting up an entity, joining the Playbook Hub,
              or listing an event — our team responds within one business
              day.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="mailto:hello@altura.com"
                className="flex items-center gap-3 text-sm text-ink hover:text-gold-600"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-dim">
                  <Mail size={16} />
                </span>
                hello@altura.com
              </a>
              <p className="flex items-center gap-3 text-sm text-ink">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-dim">
                  <Phone size={16} />
                </span>
                +86 21 6000 1234
              </p>
              <p className="flex items-center gap-3 text-sm text-ink">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-dim">
                  <MapPin size={16} />
                </span>
                Shanghai · Shenzhen · Singapore
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-7 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
