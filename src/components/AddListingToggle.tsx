"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import ListingForm from "@/components/ListingForm";
import type { CategoryMeta } from "@/lib/constants";

export default function AddListingToggle({ meta }: { meta: CategoryMeta }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-800"
      >
        {open ? <X size={16} /> : <Plus size={16} />}
        {open ? "Close form" : `List your ${meta.singular.toLowerCase()}`}
      </button>

      {open && (
        <div className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-ink">
            List your {meta.singular.toLowerCase()} on Altura
          </h2>
          <p className="mt-1.5 text-sm text-slate">
            Your listing appears in the {meta.label} directory immediately.
          </p>
          <div className="mt-6">
            <ListingForm meta={meta} />
          </div>
        </div>
      )}
    </div>
  );
}
