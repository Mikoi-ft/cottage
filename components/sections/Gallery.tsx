"use client";

import Image from "next/image";
import { useState } from "react";
import { GALLERY } from "@/lib/constants";
import Lightbox from "@/components/ui/Lightbox";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-serif text-3xl md:text-5xl">Как здесь</h2>

        {/* Mobile: horizontal scroll */}
        <div className="mt-10 -mx-6 flex gap-3 overflow-x-auto px-6 pb-4 md:hidden">
          {GALLERY.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-[4/3] w-72 flex-shrink-0 overflow-hidden rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="288px"
              />
            </button>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="mt-10 hidden grid-cols-3 gap-4 md:grid">
          {GALLERY.slice(0, 6).map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 1200px) 33vw, 400px"
                loading={i < 3 ? "eager" : "lazy"}
              />
            </button>
          ))}
        </div>

        {GALLERY.length > 6 && (
          <div className="mt-4 hidden grid-cols-2 gap-4 md:grid">
            {GALLERY.slice(6).map((img, i) => (
              <button
                key={i + 6}
                onClick={() => setLightboxIndex(i + 6)}
                className="group relative aspect-[16/9] overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1200px) 50vw, 600px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
