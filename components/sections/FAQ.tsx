"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-serif text-3xl md:text-5xl">Частые вопросы</h2>

        <div className="mt-10 divide-y divide-ink/10">
          {FAQ.map((item, i) => (
            <div key={i} className="py-2">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-lg text-ink">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={cn("flex-shrink-0 text-muted transition", open === i && "rotate-180")}
                />
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-300",
                  open === i ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-muted leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
