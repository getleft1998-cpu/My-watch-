"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    // Simulate submission (hook up to a real endpoint or email service later)
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full border-2 border-gold/50 bg-gold/10 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 text-gold">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-foreground mb-2">Message Sent</h2>
        <p className="text-foreground/50 text-sm">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-surface border border-[var(--border)] rounded-lg px-4 py-3 text-foreground text-sm placeholder:text-foreground/25 focus:outline-none focus:border-gold/50 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-foreground/40 tracking-wider uppercase">Name</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-foreground/40 tracking-wider uppercase">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-foreground/40 tracking-wider uppercase">Subject</label>
        <select
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="" disabled>Select a topic</option>
          <option value="order">Order enquiry</option>
          <option value="shipping">Shipping &amp; tracking</option>
          <option value="return">Return or refund</option>
          <option value="product">Product question</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-foreground/40 tracking-wider uppercase">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="How can we help you?"
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold hover:bg-gold/90 text-background font-medium tracking-widest uppercase text-sm py-4 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
