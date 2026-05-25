"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { formatDateRu } from "@/lib/utils";
import { formatPrice } from "@/lib/pricing";
import { CONTACTS } from "@/lib/constants";

interface Props {
  checkIn: Date;
  checkOut: Date;
  total: number;
  nights: number;
}

export default function BookingForm({ checkIn, checkOut, total, nights }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+996 ");
  const [guests, setGuests] = useState(2);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (v: string) => {
    let cleaned = v.replace(/[^\d+]/g, "");
    if (!cleaned.startsWith("+996")) cleaned = "+996" + cleaned.replace(/^\+?/, "");
    const digits = cleaned.slice(4).slice(0, 9);
    let formatted = "+996";
    if (digits.length > 0) formatted += " " + digits.slice(0, 3);
    if (digits.length > 3) formatted += " " + digits.slice(3, 6);
    if (digits.length > 6) formatted += " " + digits.slice(6, 9);
    setPhone(formatted);
  };

  const buildMessage = () => {
    return `Здравствуйте! Хочу забронировать коттедж с ${formatDateRu(checkIn)} по ${formatDateRu(checkOut)} (${nights} ночей), ${guests} гостей. Имя: ${name}. Итого: ${formatPrice(total)}.${comment ? ` Комментарий: ${comment}` : ""}`;
  };

  const handleSubmit = async (channel: "whatsapp") => {
    setError(null);
    if (!name.trim() || phone.replace(/\D/g, "").length < 12) {
      setError("Заполните имя и корректный телефон");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: name,
          guest_phone: phone,
          check_in: checkIn.toISOString().split("T")[0],
          check_out: checkOut.toISOString().split("T")[0],
          guests_count: guests,
          comment: comment || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Ошибка отправки");
      }

      const message = encodeURIComponent(buildMessage());
      if (channel === "whatsapp") {
        window.open(`https://wa.me/${CONTACTS.whatsapp}?text=${message}`, "_blank");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Что-то пошло не так");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-ink/10 p-6 md:p-8">
      <h3 className="font-serif text-2xl">Оставить заявку</h3>
      <p className="mt-2 text-sm text-muted">
        Заезд: {formatDateRu(checkIn)} · Выезд: {formatDateRu(checkOut)}
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-muted">Имя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none transition focus:border-lake"
            placeholder="Как к вам обращаться"
          />
        </div>

        <div>
          <label className="text-sm text-muted">Телефон</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none transition focus:border-lake"
            placeholder="+996 700 000 000"
          />
        </div>

        <div>
          <label className="text-sm text-muted">Количество гостей</label>
          <input
            type="number"
            min={1}
            max={8}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none transition focus:border-lake"
          />
        </div>

        <div>
          <label className="text-sm text-muted">Комментарий (необязательно)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="mt-1 w-full resize-none rounded-xl border border-ink/15 bg-white px-4 py-3 outline-none transition focus:border-lake"
            placeholder="Например: едем с собакой, нужна детская кроватка..."
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => handleSubmit("whatsapp")}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-lake px-6 py-4 font-medium text-white transition hover:scale-[1.02] disabled:opacity-60"
          >
            <Send size={18} />
            {submitting ? "Отправка..." : "В WhatsApp"}
          </button>
        </div>

        <p className="text-center text-xs text-muted">
          Нажимая кнопку, вы соглашаетесь с условиями бронирования
        </p>
      </div>
    </div>
  );
}
