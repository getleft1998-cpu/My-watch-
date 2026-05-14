"use client";

import { useState } from "react";

export default function BuyButton() {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="w-full sm:w-auto px-10 py-4 bg-gold text-[#0a0a0a] font-sans font-semibold text-sm tracking-widest uppercase rounded transition-all duration-200 hover:bg-gold-light active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Redirecting…" : "Buy Now"}
    </button>
  );
}
