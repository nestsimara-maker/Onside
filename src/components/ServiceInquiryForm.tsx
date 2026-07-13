"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ServiceInquiryForm({ service }: { service: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      service,
      name: fd.get("name"),
      company: fd.get("company"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/service-inquiries", {
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
        <p>
          Thanks — your request for <strong>{service}</strong> has been
          received. An Altura advisor will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
          Full name
        </label>
        <input
          name="name"
          required
          className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-500"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
          Company
        </label>
        <input
          name="company"
          className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-500"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-500"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
          Phone
        </label>
        <input
          name="phone"
          className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-500"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate">
          What do you need help with?
        </label>
        <textarea
          name="message"
          rows={3}
          className="w-full resize-none rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-500"
        />
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
          Request {service}
        </button>
      </div>
    </form>
  );
}
