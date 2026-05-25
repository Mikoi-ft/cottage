import { Phone, MessageCircle, Send, Instagram } from "lucide-react";
import { CONTACTS, COTTAGE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-white/80">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl text-white">{COTTAGE.name}</h3>
            <p className="mt-2 text-sm">{COTTAGE.address}</p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a href={`tel:${CONTACTS.phone}`} className="inline-flex items-center gap-2 hover:text-white">
              <Phone size={16} /> {CONTACTS.phone}
            </a>
            <a
              href={`https://wa.me/${CONTACTS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              href={`https://t.me/${CONTACTS.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Send size={16} /> Telegram
            </a>
            <a
              href={`https://instagram.com/${CONTACTS.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Instagram size={16} /> Instagram
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} {COTTAGE.name}
        </div>
      </div>
    </footer>
  );
}
