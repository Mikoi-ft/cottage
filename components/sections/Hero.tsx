import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ChevronDown } from "lucide-react";
import { COTTAGE, CONTACTS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* TODO: заменить на реальное фото коттеджа на закате */}
      <Image
        src="/images/hero.webp"
        alt={COTTAGE.name}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="font-serif text-5xl leading-tight md:text-7xl">
          {COTTAGE.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg font-light md:text-xl">
          {COTTAGE.tagline}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#booking"
            className="rounded-full bg-white px-8 py-4 font-medium text-ink transition hover:scale-[1.02]"
          >
            Забронировать даты
          </Link>
          <a
            href={`https://wa.me/${CONTACTS.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-8 py-4 font-medium text-white transition hover:bg-white/10"
          >
            <MessageCircle size={20} />
            Написать в WhatsApp
          </a>
        </div>
      </div>

      <a
        href="#gallery"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/80 transition hover:text-white"
        aria-label="Прокрутить вниз"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </a>
    </section>
  );
}
