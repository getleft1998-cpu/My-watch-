"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-5 flex items-center justify-between border-b border-[var(--border)]">
        <span className="font-serif text-xl tracking-widest text-gold uppercase">
          Poedagar
        </span>
        <span className="text-xs tracking-widest text-foreground/40 uppercase">
          Fine Timepieces
        </span>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-16 max-w-6xl mx-auto w-full">
        {/* Watch visual */}
        <div className="relative flex-shrink-0 w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-3xl" />
          {/* Watch face placeholder — replace src with real product image */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-gold/40 bg-surface-2 flex items-center justify-center shadow-2xl shadow-gold/10">
            <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-gold/20 bg-[#0d0d0d] flex items-center justify-center">
              <div className="text-center">
                <div className="w-1 h-16 sm:h-20 bg-gold mx-auto mb-1 origin-bottom rotate-[-30deg] rounded-full" />
                <div className="w-0.5 h-12 sm:h-14 bg-gold/70 mx-auto origin-bottom rotate-[60deg] rounded-full -mt-16 sm:-mt-20" />
                <div className="font-serif text-gold text-xs tracking-[0.3em] uppercase mt-4">
                  Poedagar
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md gap-6">
          <div>
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">
              Limited Edition
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl text-foreground leading-tight mb-4">
              The Prestige<br />Collection
            </h1>
            <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
              Precision Swiss movement. 316L surgical steel case. Sapphire
              crystal glass. Water resistant to 30 ATM. Crafted for those who
              value time above all else.
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-2 text-sm text-foreground/50 w-full">
            {[
              "Swiss quartz movement",
              "Sapphire crystal glass",
              "316L stainless steel",
              "30 ATM water resistance",
              "Free worldwide shipping",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Price + CTA */}
          <div className="w-full border-t border-[var(--border)] pt-6 flex flex-col gap-4">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl text-gold">€49</span>
              <span className="text-foreground/30 text-sm line-through">€149</span>
              <span className="text-xs text-gold-light bg-gold/10 px-2 py-0.5 rounded">
                67% OFF
              </span>
            </div>

            <button
              onClick={handleBuy}
              disabled={loading}
              className="w-full sm:w-auto px-10 py-4 bg-gold text-[#0a0a0a] font-sans font-semibold text-sm tracking-widest uppercase rounded transition-all duration-200 hover:bg-gold-light active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Redirecting…" : "Buy Now"}
            </button>

            <p className="text-foreground/30 text-xs text-center lg:text-left">
              Secure checkout via Stripe · 30-day returns
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-6 text-center text-foreground/20 text-xs tracking-widest">
        © {new Date().getFullYear()} POEDAGAR — ALL RIGHTS RESERVED
      </footer>
    </main>
  );
}
