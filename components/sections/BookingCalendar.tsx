"use client";

import { useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ru } from "date-fns/locale";
import "react-day-picker/style.css";
import { calculateTotal, formatPrice } from "@/lib/pricing";
import { INCLUDED, MIN_NIGHTS, PRICE_PERIODS, LONG_STAY_DISCOUNT } from "@/lib/constants";
import BookingForm from "./BookingForm";

interface Props {
  bookedDates: { check_in: string; check_out: string; guest_name?: string }[];
}

export default function BookingCalendar({ bookedDates }: Props) {
  const [range, setRange] = useState<DateRange | undefined>();

  const disabledRanges = useMemo(
    () =>
      bookedDates.map((b) => ({
        from: new Date(b.check_in),
        to: new Date(new Date(b.check_out).getTime() - 24 * 60 * 60 * 1000),
      })),
    [bookedDates]
  );

  // Карта "YYYY-MM-DD" → имя гостя, для подсказки на занятых датах
  const guestByDate = useMemo(() => {
    const map = new Map<string, string>();
    bookedDates.forEach((b) => {
      if (!b.guest_name) return;
      const cur = new Date(b.check_in);
      const end = new Date(b.check_out);
      while (cur < end) {
        const key = cur.toISOString().split("T")[0];
        map.set(key, b.guest_name);
        cur.setDate(cur.getDate() + 1);
      }
    });
    return map;
  }, [bookedDates]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calculation = useMemo(() => {
    if (range?.from && range?.to) return calculateTotal(range.from, range.to);
    return null;
  }, [range]);

  const nights = calculation?.nights ?? 0;
  const isValidRange = nights >= MIN_NIGHTS;

  return (
    <section id="booking" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-serif text-3xl md:text-5xl">Бронирование</h2>
        <p className="mt-3 text-muted">
          Выберите даты заезда и выезда. Минимум {MIN_NIGHTS} ночи.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            <div>
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={[{ before: today }, ...disabledRanges]}
                modifiers={{ booked: disabledRanges }}
                modifiersClassNames={{ booked: "rdp-booked" }}
                components={{
                  DayButton: (props) => {
                    const key = props.day.date.toISOString().split("T")[0];
                    const guest = guestByDate.get(key);
                    return (
                      <button
                        {...props}
                        title={guest ? `Занято: ${guest}` : undefined}
                      />
                    );
                  },
                }}
                locale={ru}
                numberOfMonths={1}
                showOutsideDays
                className="rdp-custom"
              />
              <div className="mt-5 flex items-center gap-2 text-sm text-muted">
                <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#FCEEEC] text-[#C97A6D]">
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#C97A6D]" />
                </span>
                <span>— занято</span>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl bg-cream p-6 md:p-8">
              <h3 className="font-serif text-2xl">Цены за сутки</h3>
              <ul className="mt-4 space-y-2 text-muted">
                {PRICE_PERIODS.map((p) => (
                  <li key={p.label} className="flex justify-between gap-4">
                    <span>{p.label}</span>
                    <span className="whitespace-nowrap text-ink">{formatPrice(p.price)}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-lake">
                При брони от {LONG_STAY_DISCOUNT.minNights} суток — скидка {LONG_STAY_DISCOUNT.percent}%
              </p>

              <div className="mt-6 border-t border-ink/10 pt-6">
                <p className="text-sm font-medium text-ink">В стоимость входит:</p>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {INCLUDED.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              {calculation && (
                <div className="mt-6 border-t border-ink/10 pt-6">
                  <div className="flex justify-between text-muted">
                    <span>{nights} {pluralNights(nights)}</span>
                    <span className="text-ink">{formatPrice(calculation.subtotal)}</span>
                  </div>
                  {calculation.hasDiscount && (
                    <div className="mt-1 flex justify-between text-sm text-lake">
                      <span>Скидка {LONG_STAY_DISCOUNT.percent}%</span>
                      <span>−{formatPrice(calculation.discount)}</span>
                    </div>
                  )}
                  <div className="mt-2 flex justify-between border-t border-ink/10 pt-2 font-medium">
                    <span className="text-ink">Итого</span>
                    <span className="text-ink">{formatPrice(calculation.total)}</span>
                  </div>
                  {!isValidRange && (
                    <p className="mt-2 text-sm text-red-600">
                      Минимум {MIN_NIGHTS} ночи
                    </p>
                  )}
                </div>
              )}
            </div>

            {isValidRange && range?.from && range?.to && (
              <div className="mt-8">
                <BookingForm
                  checkIn={range.from}
                  checkOut={range.to}
                  total={calculation!.total}
                  nights={nights}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function pluralNights(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "ночь";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "ночи";
  return "ночей";
}