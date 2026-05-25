"use client";

import { useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { ru } from "date-fns/locale";
import "react-day-picker/style.css";
import { calculateTotal, formatPrice } from "@/lib/pricing";
import { INCLUDED, MIN_NIGHTS, SEASONS } from "@/lib/constants";
import BookingForm from "./BookingForm";

interface Props {
  bookedDates: { check_in: string; check_out: string }[];
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
            <DayPicker
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={[{ before: today }, ...disabledRanges]}
              locale={ru}
              numberOfMonths={1}
              showOutsideDays
              className="rdp-custom"
            />
          </div>

          <div>
            <div className="rounded-2xl bg-cream p-6 md:p-8">
              <h3 className="font-serif text-2xl">Цены</h3>
              <ul className="mt-4 space-y-2 text-muted">
                <li className="flex justify-between">
                  <span>{SEASONS.high.name} (июнь–август)</span>
                  <span className="text-ink">{formatPrice(SEASONS.high.pricePerNight)}/ночь</span>
                </li>
                <li className="flex justify-between">
                  <span>{SEASONS.mid.name} (май, сентябрь)</span>
                  <span className="text-ink">{formatPrice(SEASONS.mid.pricePerNight)}/ночь</span>
                </li>
                <li className="flex justify-between">
                  <span>{SEASONS.low.name}</span>
                  <span className="text-ink">{formatPrice(SEASONS.low.pricePerNight)}/ночь</span>
                </li>
              </ul>

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
