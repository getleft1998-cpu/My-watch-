"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid password.");
        return;
      }
      router.push("/admin");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10 text-center">
        <p className="font-serif text-2xl tracking-widest text-gold uppercase mb-1">
          Poedagar
        </p>
        <p className="text-foreground/30 text-xs tracking-[0.3em] uppercase">
          Admin Access
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-surface border border-[var(--border)] rounded-lg p-8 flex flex-col gap-5"
      >
        <h1 className="font-serif text-2xl text-foreground">Sign in</h1>

        <div className="flex flex-col gap-2">
          <label className="text-xs tracking-widest text-foreground/40 uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
            autoFocus
            className="bg-surface-2 border border-[var(--border)] rounded px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gold text-[#0a0a0a] font-semibold text-sm tracking-widest uppercase rounded transition-all hover:bg-gold-light active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
