"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string | null;
  brand: string | null;
  price: number | null;
  original_price: number | null;
  description: string | null;
  image_url: string | null;
  images: string[] | null;
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
    original_price: product.original_price?.toString() ?? "",
    description: product.description ?? "",
  });

  // Gallery: seed from images[] → fall back to [image_url]
  const [images, setImages] = useState<string[]>(
    product.images && product.images.length > 0
      ? product.images
      : product.image_url
      ? [product.image_url]
      : []
  );

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  // Upload state
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [uploadErrors, setUploadErrors] = useState<Record<number, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingUploadIdx = useRef<number | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus("idle");
  }

  // ── Gallery helpers ──────────────────────────────────────────────────────
  function addImage() {
    if (images.length >= 6) return;
    setImages([...images, ""]);
    setStatus("idle");
  }

  function removeImage(idx: number) {
    setImages(images.filter((_, i) => i !== idx));
    setUploadErrors((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });
    setStatus("idle");
  }

  function updateImage(idx: number, val: string) {
    setImages(images.map((img, i) => (i === idx ? val : img)));
    setStatus("idle");
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const next = [...images];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setImages(next);
    setStatus("idle");
  }

  function moveDown(idx: number) {
    if (idx === images.length - 1) return;
    const next = [...images];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setImages(next);
    setStatus("idle");
  }

  // ── Upload helpers ───────────────────────────────────────────────────────
  function triggerUpload(idx: number) {
    pendingUploadIdx.current = idx;
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset so same file can be re-selected
      fileInputRef.current.click();
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const idx = pendingUploadIdx.current;
    if (!file || idx === null) return;

    // Clear previous error for this slot
    setUploadErrors((prev) => {
      const next = { ...prev };
      delete next[idx];
      return next;
    });

    setUploadingIdx(idx);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) {
        setUploadErrors((prev) => ({ ...prev, [idx]: json.error ?? "Upload failed" }));
      } else {
        updateImage(idx, json.url);
        // Auto-clear error on success
        setUploadErrors((prev) => {
          const next = { ...prev };
          delete next[idx];
          return next;
        });
      }
    } catch {
      setUploadErrors((prev) => ({ ...prev, [idx]: "Network error" }));
    } finally {
      setUploadingIdx(null);
      pendingUploadIdx.current = null;
    }
  }

  // ── Discount preview ─────────────────────────────────────────────────────
  const priceNum = parseFloat(form.price);
  const origNum = parseFloat(form.original_price);
  const discountPreview =
    form.original_price &&
    !isNaN(priceNum) &&
    !isNaN(origNum) &&
    origNum > priceNum
      ? Math.round(((origNum - priceNum) / origNum) * 100)
      : null;

  // ── Save ─────────────────────────────────────────────────────────────────
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    const cleanImages = images.filter((u) => u.trim() !== "");
    try {
      const res = await fetch("/api/admin/product", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: product.id,
          name: form.name,
          brand: form.brand,
          price: parseFloat(form.price),
          original_price: form.original_price ? parseFloat(form.original_price) : null,
          description: form.description,
          images: cleanImages,
        }),
      });
      setStatus(res.ok ? "saved" : "error");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

  const previewSrc = images[0] || null;

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8">
      {/* Hidden shared file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Left: text fields ── */}
        <div className="flex-1 flex flex-col gap-4">

          {(["name", "brand"] as const).map((name) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-foreground/40 uppercase">
                {name === "name" ? "Product Name" : "Brand"}
              </label>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="bg-surface-2 border border-[var(--border)] rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          ))}

          {/* Price row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-foreground/40 uppercase">
                Sale Price (€)
              </label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="bg-surface-2 border border-[var(--border)] rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs tracking-widest text-foreground/40 uppercase">
                Original Price (€)
                <span className="ml-1 normal-case text-foreground/20">(optional)</span>
              </label>
              <input
                type="text"
                name="original_price"
                value={form.original_price}
                onChange={handleChange}
                placeholder="e.g. 149"
                className="bg-surface-2 border border-[var(--border)] rounded px-4 py-3 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Discount preview */}
          {discountPreview !== null && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-foreground/40">Discount badge preview:</span>
              <span className="text-gold-light bg-gold/10 border border-gold/20 px-2 py-0.5 rounded">
                {discountPreview}% OFF
              </span>
              <span className="text-foreground/30">
                €{form.original_price} → €{form.price}
              </span>
            </div>
          )}

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs tracking-widest text-foreground/40 uppercase">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="bg-surface-2 border border-[var(--border)] rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors resize-none"
            />
          </div>
        </div>

        {/* ── Right: image preview ── */}
        <div className="lg:w-56 flex flex-col gap-3 flex-shrink-0">
          <p className="text-xs tracking-widest text-foreground/40 uppercase">
            Main Image Preview
          </p>
          <div className="bg-surface-2 border border-[var(--border)] rounded-lg overflow-hidden aspect-square flex items-center justify-center">
            {previewSrc ? (
              <Image
                src={previewSrc}
                alt="Main product image"
                width={224}
                height={224}
                unoptimized={previewSrc.startsWith("http")}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-foreground/20 text-xs">No image</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Image Gallery Manager ── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-widest text-foreground/40 uppercase">
            Image Gallery ({images.length}/6)
          </p>
          <button
            type="button"
            onClick={addImage}
            disabled={images.length >= 6}
            className="text-xs text-gold border border-gold/30 hover:border-gold hover:bg-gold/5 px-3 py-1.5 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            + Add Slot
          </button>
        </div>

        {images.length === 0 && (
          <p className="text-foreground/20 text-xs italic">
            No images. Add up to 6. The first is the main image. Paste a URL or click Upload.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {images.map((src, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {/* Order controls */}
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveUp(i)}
                    disabled={i === 0}
                    className="text-foreground/30 hover:text-gold disabled:opacity-20 text-xs leading-none px-1"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(i)}
                    disabled={i === images.length - 1}
                    className="text-foreground/30 hover:text-gold disabled:opacity-20 text-xs leading-none px-1"
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>

                {/* Badge */}
                {i === 0 && (
                  <span className="text-[10px] text-gold border border-gold/30 px-1.5 py-0.5 rounded flex-shrink-0">
                    MAIN
                  </span>
                )}

                {/* URL input */}
                <input
                  type="text"
                  value={src}
                  onChange={(e) => updateImage(i, e.target.value)}
                  placeholder="https://... or /image.jpg"
                  className="flex-1 bg-surface-2 border border-[var(--border)] rounded px-3 py-2 text-xs text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-gold transition-colors"
                />

                {/* Upload button */}
                <button
                  type="button"
                  onClick={() => triggerUpload(i)}
                  disabled={uploadingIdx !== null}
                  title="Upload image from your computer"
                  className="flex-shrink-0 flex items-center gap-1 text-xs text-foreground/40 hover:text-gold border border-[var(--border)] hover:border-gold/40 bg-surface-2 px-2.5 py-2 rounded transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {uploadingIdx === i ? (
                    // Spinner
                    <svg
                      className="w-3.5 h-3.5 animate-spin text-gold"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                  ) : (
                    // Camera icon
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{uploadingIdx === i ? "" : "Upload"}</span>
                </button>

                {/* Thumbnail */}
                {src && (
                  <div className="w-9 h-9 rounded overflow-hidden border border-[var(--border)] flex-shrink-0">
                    <Image
                      src={src}
                      alt={`img ${i + 1}`}
                      width={36}
                      height={36}
                      unoptimized={src.startsWith("http")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="text-foreground/30 hover:text-red-400 transition-colors text-sm flex-shrink-0"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>

              {/* Inline upload error */}
              {uploadErrors[i] && (
                <p className="text-red-400 text-[10px] pl-10">
                  ✗ {uploadErrors[i]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Save ── */}
      <div className="flex items-center gap-4 pt-2 border-t border-[var(--border)]">
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
    </form>
  );
}
