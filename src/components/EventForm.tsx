"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { EVENT_VERTICALS } from "@/lib/constants";

const FIELD =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-500";
const LABEL = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate";

export default function EventForm({ onDone }: { onDone?: () => void }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong");
      }
      router.refresh();
      onDone?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={LABEL}>Event title</label>
        <input name="title" required className={FIELD} />
      </div>

      <div>
        <label className={LABEL}>Vertical</label>
        <select name="vertical" required defaultValue="" className={FIELD}>
          <option value="" disabled>
            Select a vertical
          </option>
          {EVENT_VERTICALS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={LABEL}>Date</label>
        <input type="date" name="date" required className={FIELD} />
      </div>

      <div>
        <label className={LABEL}>Location</label>
        <input name="location" required placeholder="City, venue" className={FIELD} />
      </div>
      <div>
        <label className={LABEL}>Organizer</label>
        <input name="organizer" required className={FIELD} />
      </div>

      <div className="sm:col-span-2">
        <label className={LABEL}>Event website URL</label>
        <input
          name="url"
          required
          placeholder="https://"
          className={FIELD}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={LABEL}>Description</label>
        <textarea name="description" required rows={3} className={`${FIELD} resize-none`} />
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
          Submit event
        </button>
      </div>
    </form>
  );
}
