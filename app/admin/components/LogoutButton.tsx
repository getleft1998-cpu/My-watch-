"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs tracking-widest uppercase text-foreground/40 hover:text-gold border border-[var(--border)] hover:border-gold px-4 py-2 rounded transition-all"
    >
      Logout
    </button>
  );
}
