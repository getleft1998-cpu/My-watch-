"use client";

import { useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string | null;
  brand: string | null;
  price: number | null;
  description: string | null;
  image_url: string | null;
  stock: number | null;
  featured: boolean | null;
}

interface Props {
  product: Product;
}

export default function ProductEditor({ product }: Props) {
  const [form, setForm] = useState({
    name: product.name ?? "",
    brand: product.brand ?? "",
    price: product.price?.toString() ?? "",
    description: product.description ?? "",
    image_url: product.image_url ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus("idle");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/product", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          name: form.name,
          brand: form.brand,
          price: parseFloat(form.price),
          description: form.description,
          image_url: form.image_url,
        }),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  const previewSrc = form.image_url || null;

  return (
    <form onSubmit={handleSave} className="flex flex-col lg:flex-row gap-8">
      {/* Fields */}
      <div className="flex-1 flex flex-col gap-4">
        {(
          [
            { label: "Product Name", name: "name", type: "input" },
            { label: "Brand", name: "brand", type: "input" },
            { label: "Price (€)", name: "price", type: "input" },
            { label: "Image URL", name: "image_url", type: "input" },
            { label: "Description", name: "description", type: "textarea" },
          ] as const
        ).map(({ label, name, type }) => (
          <div key={name} className="flex flex-col gap-1.5">
            <label className="text-xs tracking-widest text-foreground/40 uppercase">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={handleChange}
                rows={4}
                className="bg-surface-2 border border-[var(--border)] rounded px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold transition-colors resize-none"
              />
            ) : (
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="bg-surface-2 border border-[var(--border)] rounded px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold transition-colors"
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gold text-[#0a0a0a] font-semibold text-sm tracking-widest uppercase rounded transition-all hover:bg-gold-light active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>

          {status === "saved" && (
            <span className="text-emerald-400 text-xs">✓ Saved</span>
          )}
          {status === "error" && (
            <span className="text-red-400 text-xs">✗ Failed to save</span>
          )}
        </div>
      </div>

      {/* Image preview */}
      <div className="lg:w-64 flex flex-col gap-3">
        <p className="text-xs tracking-widest text-foreground/40 uppercase">
          Image Preview
        </p>
        <div className="bg-surface-2 border border-[var(--border)] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
          {previewSrc ? (
            <Image
              src={previewSrc}
              alt="Product preview"
              width={256}
              height={256}
              className="w-full h-full object-cover"
              unoptimized={previewSrc.startsWith("http")}
            />
          ) : (
            <span className="text-foreground/20 text-xs">No image</span>
          )}
        </div>
      </div>
    </form>
  );
}
