"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { CategoryMeta } from "@/lib/constants";

const FIELD =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-500";
const LABEL = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate";

export default function ListingForm({ meta }: { meta: CategoryMeta }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.category = meta.category;

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong");
      }
      const { listing } = await res.json();
      router.push(`/hub/${meta.slug}/${listing.id}`);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className={LABEL}>{meta.singular} name</label>
        <input name="name" required className={FIELD} />
      </div>
      <div>
        <label className={LABEL}>Website</label>
        <input name="website" placeholder="https://" className={FIELD} />
      </div>

      <div className="sm:col-span-2">
        <label className={LABEL}>Tagline</label>
        <input
          name="tagline"
          maxLength={160}
          placeholder="One line describing what you do"
          className={FIELD}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={LABEL}>Description</label>
        <textarea name="description" required rows={4} className={`${FIELD} resize-none`} />
      </div>

      <div>
        <label className={LABEL}>Contact email</label>
        <input type="email" name="email" required className={FIELD} />
      </div>
      <div>
        <label className={LABEL}>Location</label>
        <input name="location" placeholder="City, country" className={FIELD} />
      </div>

      <div>
        <label className={LABEL}>{meta.fields.needsLabel}</label>
        <input name="needs" className={FIELD} />
      </div>
      <div>
        <label className={LABEL}>{meta.fields.offeringLabel}</label>
        <input name="offering" className={FIELD} />
      </div>

      {meta.category === "COMPANY" && (
        <div>
          <label className={LABEL}>Funding stage</label>
          <input name="fundingStage" placeholder="e.g. Seed, Series A" className={FIELD} />
        </div>
      )}

      {meta.category === "INVESTOR" && (
        <>
          <div>
            <label className={LABEL}>Investment focus</label>
            <input name="investmentFocus" placeholder="e.g. Deep tech, consumer" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Typical ticket size</label>
            <input name="ticketSize" placeholder="e.g. $250k–$2M" className={FIELD} />
          </div>
        </>
      )}

      {meta.category === "GOVERNMENT" && (
        <div className="sm:col-span-2">
          <label className={LABEL}>Program details</label>
          <input
            name="program"
            placeholder="Fund name, grant amount, industrial park, etc."
            className={FIELD}
          />
        </div>
      )}

      {meta.category === "STUDENT" && (
        <>
          <div>
            <label className={LABEL}>Field of study</label>
            <input name="fieldOfStudy" className={FIELD} />
          </div>
          <div>
            <label className={LABEL}>Availability</label>
            <input name="availability" placeholder="e.g. Internship, full-time" className={FIELD} />
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label className={LABEL}>Tags (comma-separated)</label>
        <input name="tags" placeholder="fintech, cross-border, B2B" className={FIELD} />
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-red-600">{error}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-navy-800 disabled:opacity-60"
        >
          {status === "loading" && <Loader2 size={15} className="animate-spin" />}
          Publish listing
        </button>
      </div>
    </form>
  );
}
