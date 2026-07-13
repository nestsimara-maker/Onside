"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import ServiceInquiryForm from "@/components/ServiceInquiryForm";
import type { ServiceMeta } from "@/lib/constants";

export default function ServiceItem({
  service,
  index,
}: {
  service: ServiceMeta;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id={service.slug}
      className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-5">
          <span className="font-display text-2xl font-semibold text-gold-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {service.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">
              {service.summary}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate">
                  <Check size={15} className="mt-0.5 shrink-0 text-gold-600" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex shrink-0 items-center gap-1.5 self-start rounded-full border border-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy-900 transition hover:border-gold-500 hover:text-gold-600"
        >
          {open ? "Close" : "Request service"}
          <ChevronDown
            size={14}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div className="mt-6 border-t border-line pt-6">
          <ServiceInquiryForm service={service.title} />
        </div>
      )}
    </div>
  );
}
