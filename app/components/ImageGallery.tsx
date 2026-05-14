"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [selected, setSelected] = useState(0);
  const currentSrc = images[Math.min(selected, images.length - 1)] ?? "";
  const isExternal = currentSrc.startsWith("http");

  return (
    <div className="relative flex-shrink-0 w-72 sm:w-96 lg:w-[480px] flex flex-col gap-3">
      {/* Main image */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gold/10 blur-3xl" />
        <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-2xl shadow-gold/10">
          <Image
            src={currentSrc}
            alt={alt}
            width={480}
            height={480}
            priority
            unoptimized={isExternal}
            className="w-full h-auto object-cover transition-opacity duration-300"
          />
        </div>
      </div>

      {/* Thumbnails — only if more than 1 image */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center flex-wrap">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 ${
                i === selected
                  ? "border-gold shadow-md shadow-gold/20"
                  : "border-[var(--border)] opacity-50 hover:opacity-80 hover:border-gold/40"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} — view ${i + 1}`}
                width={56}
                height={56}
                unoptimized={src.startsWith("http")}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
