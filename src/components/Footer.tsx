import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 text-cream/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-lg font-semibold text-cream"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 font-display text-xs font-bold text-navy-950">
                A
              </span>
              Altura
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              The launchpad for business in China — services to set up and
              operate, and a digital hub to network across the ecosystem.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/40">
              Services
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/services" className="hover:text-cream">All services</Link></li>
              <li><Link href="/services#entity-registration" className="hover:text-cream">Entity registration</Link></li>
              <li><Link href="/services#taxation-accounting" className="hover:text-cream">Taxation & accounting</Link></li>
              <li><Link href="/services#visa-residence" className="hover:text-cream">Visa & residence</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/40">
              Playbook Hub
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link href={`/hub/${c.slug}`} className="hover:text-cream">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/40">
              Altura
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/events" className="hover:text-cream">Events</Link></li>
              <li><Link href="/about" className="hover:text-cream">About</Link></li>
              <li><Link href="/contact" className="hover:text-cream">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Altura. All rights reserved.</p>
          <p>Shanghai · Shenzhen · Singapore</p>
        </div>
      </div>
    </footer>
  );
}
