import { Bed, Users, Wifi, Tv, Microwave, WashingMachine, Flame, UtensilsCrossed, Waves, Baby } from "lucide-react";

export const COTTAGE = {
  name: "Квартира в Chaika Resort",
  tagline: "Отдых у воды на Иссык-Куле — первая береговая линия",
  coords: { lat: 42.6411, lng: 76.9897 }, // с. Чон-Сары-Ой, Chaika Resort
  address: "Chaika Resort, с. Чон-Сары-Ой, Иссык-Кульская область",
  distanceFromBishkek: "230 км от Бишкека · 14 км от Чолпон-Аты",
};

export const CONTACTS = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "996508516651",
  phone: "+996 508 516 651",
};

export const AMENITIES = [
  { icon: Bed, label: "Спальня + раскладной диван" },
  { icon: Users, label: "до 4 гостей" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: Tv, label: "Телевизор" },
  { icon: Microwave, label: "Микроволновка" },
  { icon: WashingMachine, label: "Стиральная машина" },
  { icon: UtensilsCrossed, label: "Кухонная утварь" },
  { icon: Flame, label: "Мангал" },
  { icon: Waves, label: "Первая береговая линия" },
  { icon: Baby, label: "Аниматоры для детей (лето)" },
];

// Ценовые периоды по конкретным датам (формат MM-DD)
export const PRICE_PERIODS = [
  { from: "05-01", to: "06-14", price: 8000, label: "1 мая – 14 июня" },
  { from: "06-15", to: "07-05", price: 10000, label: "15 июня – 5 июля" },
  { from: "07-06", to: "08-18", price: 15000, label: "6 июля – 18 августа" },
  { from: "08-18", to: "09-15", price: 10000, label: "18 августа – 15 сентября" },
];

export const DEFAULT_PRICE = 8000; // вне сезона

export const MIN_NIGHTS = 2;

export const LONG_STAY_DISCOUNT = { minNights: 5, percent: 10 };

export const INCLUDED = [
  "Постельное бельё и полотенца",
  "Вся кухонная утварь и техника",
  "Wi-Fi и телевизор",
  "Доступ к территории резорта (3 ресторана и столовая)",
];

export const RESORT_FEATURES = [
  "3 ресторана и столовая на территории",
  "Первая береговая линия, 3 вида пляжа",
  "Летом — бесплатные аниматоры для детей",
];

// TODO: реальные фото — заменить на URL из Supabase Storage или Cloudinary
export const GALLERY = [
  { src: "/images/placeholder-1.jpg", alt: "Вид на озеро" },
  { src: "/images/placeholder-2.jpg", alt: "Спальня с двуспальной кроватью" },
  { src: "/images/placeholder-3.jpg", alt: "Гостиная-кухня" },
  { src: "/images/placeholder-4.jpg", alt: "Кухонная зона" },
  { src: "/images/placeholder-5.jpg", alt: "Раскладной диван в гостиной" },
  { src: "/images/placeholder-6.jpg", alt: "Мангальная зона" },
  { src: "/images/placeholder-7.jpg", alt: "Территория резорта" },
  { src: "/images/placeholder-8.jpg", alt: "Пляж и берег" },
];

// TODO: реальные отзывы
export const REVIEWS = [
  {
    name: "Айгуль",
    date: "Август 2025",
    text: "Отличная квартира, всё чисто и уютно. Дети были в восторге от аниматоров и пляжа. Вернёмся!",
  },
  {
    name: "Денис",
    date: "Июль 2025",
    text: "Первая линия — до воды пара минут. Рестораны прямо на территории, очень удобно с детьми.",
  },
  {
    name: "Семья Касымовых",
    date: "Июнь 2025",
    text: "Всё для комфортного проживания: стиралка, кухня, мангал. Бронировали на неделю — не пожалели.",
  },
];

export const FAQ = [
  {
    q: "Как происходит оплата?",
    a: "Предоплата 30% переводом для брони дат. Остальная сумма — при заезде.",
  },
  {
    q: "Сколько человек помещается?",
    a: "До 4 человек: двуспальная кровать в спальне и раскладной диван в гостиной.",
  },
  {
    q: "Что входит на территории резорта?",
    a: "3 ресторана и столовая, первая береговая линия с тремя видами пляжа. Летом работают бесплатные аниматоры для детей.",
  },
  {
    q: "Есть ли скидка за длительное проживание?",
    a: "Да, при бронировании от 5 суток — скидка 10%.",
  },
  {
    q: "Что взять с собой?",
    a: "Личные вещи и продукты. Всё остальное (постель, полотенца, посуда, техника) уже в квартире.",
  },
];
