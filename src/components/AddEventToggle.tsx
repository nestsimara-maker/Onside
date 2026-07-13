"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import EventForm from "@/components/EventForm";

export default function AddEventToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-800"
      >
        {open ? <X size={16} /> : <Plus size={16} />}
        {open ? "Close form" : "Submit an event"}
      </button>

      {open && (
        <div className="mt-6 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-ink">
            Submit an event
          </h2>
          <p className="mt-1.5 text-sm text-slate">
            Approved events appear in the listing and link out to your event
            page.
          </p>
          <div className="mt-6">
            <EventForm onDone={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
