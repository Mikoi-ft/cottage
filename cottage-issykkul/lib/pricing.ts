import { PRICE_PERIODS, DEFAULT_PRICE, LONG_STAY_DISCOUNT } from "./constants";

// Получить цену за конкретную ночь по дате
export function getPriceForDate(date: Date): number {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

  for (const period of PRICE_PERIODS) {
    if (mmdd >= period.from && mmdd <= period.to) {
      return period.price;
    }
  }
  return DEFAULT_PRICE;
}

export function calculateTotal(
  checkIn: Date,
  checkOut: Date
): {
  nights: number;
  subtotal: number;
  discount: number;
  total: number;
  hasDiscount: boolean;
  breakdown: { date: Date; price: number }[];
} {
  const breakdown: { date: Date; price: number }[] = [];
  let subtotal = 0;
  const cur = new Date(checkIn);
  while (cur < checkOut) {
    const price = getPriceForDate(cur);
    breakdown.push({ date: new Date(cur), price });
    subtotal += price;
    cur.setDate(cur.getDate() + 1);
  }

  const nights = breakdown.length;
  const hasDiscount = nights >= LONG_STAY_DISCOUNT.minNights;
  const discount = hasDiscount
    ? Math.round((subtotal * LONG_STAY_DISCOUNT.percent) / 100)
    : 0;
  const total = subtotal - discount;

  return { nights, subtotal, discount, total, hasDiscount, breakdown };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("ru-RU").format(amount) + " сом";
}
