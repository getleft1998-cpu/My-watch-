"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "When will I receive my order?",
    a: "We ship within 24 hours of payment confirmation. Orders typically arrive within 3–5 business days to EU countries and 5–10 business days for international destinations. You will receive tracking information by email once your order has been dispatched.",
  },
  {
    q: "Are both watches included in the box?",
    a: "Yes! The POEDAGAR Classic Duo Set includes both the deep ocean blue dial and the fresh emerald green dial watch — packaged together in a premium gift box. Everything you see in the photos is included. Nothing is sold separately.",
  },
  {
    q: "Can I return it if I'm not happy?",
    a: "Absolutely. We offer a full 30-day money-back guarantee. If you are not completely satisfied for any reason, contact us within 30 days of receiving your order and we will arrange a full refund. No questions asked, no hassle.",
  },
  {
    q: "Is my payment secure?",
    a: "All payments are processed by Stripe, one of the world's most trusted payment processors. We never store your card details. Every transaction is encrypted with 256-bit SSL and complies with PCI-DSS standards. You can pay confidently with Visa, Mastercard, or any major credit card.",
  },
  {
    q: "What materials are the watches made of?",
    a: "Both watches feature a 316L stainless steel case and bracelet, chosen for its durability and hypoallergenic properties. The crystal glass is sapphire-coated for scratch resistance. Movement is Swiss quartz for precise, reliable timekeeping. Water resistant to 30 metres.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
          Got Questions?
        </p>
        <h2 className="font-serif text-3xl text-foreground">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-[var(--border)]">
        {FAQS.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left group"
            >
              <span
                className={`text-sm font-medium transition-colors ${
                  open === i ? "text-gold" : "text-foreground/80 group-hover:text-foreground"
                }`}
              >
                {faq.q}
              </span>
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                  open === i
                    ? "border-gold bg-gold/10 text-gold rotate-45"
                    : "border-[var(--border)] text-foreground/30 group-hover:border-gold/40"
                }`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                open === i ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-foreground/55 text-sm leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
