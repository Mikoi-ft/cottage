import { SEASONS } from "./constants";

export function getPriceForDate(date: Date): number {
  const month = date.getMonth() + 1;
  if (SEASONS.high.months.includes(month)) return SEASONS.high.pricePerNight;
  if (SEASONS.mid.months.includes(month)) return SEASONS.mid.pricePerNight;
  return SEASONS.low.pricePerNight;
}

export function calculateTotal(checkIn: Date, checkOut: Date): {
  nights: number;
  total: number;
  breakdown: { date: Date; price: number }[];
} {
  const breakdown: { date: Date; price: number }[] = [];
  let total = 0;
  const cur = new Date(checkIn);
  while (cur < checkOut) {
    const price = getPriceForDate(cur);
    breakdown.push({ date: new Date(cur), price });
    total += price;
    cur.setDate(cur.getDate() + 1);
  }
  return { nights: breakdown.length, total, breakdown };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("ru-RU").format(amount) + " сом";
}
