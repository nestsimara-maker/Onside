"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const FIELD =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-500";
const LABEL = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-gold-500/30 bg-gold-400/10 px-4 py-3.5 text-sm text-gold-700">
        <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
        <p>Message received — we&rsquo;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className={LABEL}>Name</label>
        <input name="name" required className={FIELD} />
      </div>
      <div>
        <label className={LABEL}>Email</label>
        <input type="email" name="email" required className={FIELD} />
      </div>
      <div className="sm:col-span-2">
        <label className={LABEL}>Subject</label>
        <input name="subject" className={FIELD} />
      </div>
      <div className="sm:col-span-2">
        <label className={LABEL}>Message</label>
        <textarea name="message" required rows={5} className={`${FIELD} resize-none`} />
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
          Send message
        </button>
      </div>
    </form>
  );
}
