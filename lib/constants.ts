import { Bed, Users, Wifi, ChefHat, Flame, Car, Waves, MapPin } from "lucide-react";

export const COTTAGE = {
  name: "Дом у Иссык-Куля", // TODO: реальное название
  tagline: "Дом у воды, где время замедляется",
  // TODO: реальные координаты
  coords: { lat: 42.6500, lng: 77.0833 },
  address: "с. Тамчы, Иссык-Кульская область", // TODO
  distanceFromBishkek: "260 км от Бишкека",
};

export const CONTACTS = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "996700000000",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME ?? "your_cottage",
  phone: "+996 700 000 000", // TODO
};

export const AMENITIES = [
  { icon: Bed, label: "1 спальня" },
  { icon: Users, label: "до 4 гостей" },
  { icon: Wifi, label: "Wi-Fi" },
  { icon: ChefHat, label: "Кухня" },
  { icon: Flame, label: "Мангал" },
  { icon: Car, label: "Парковка" },
  { icon: Waves, label: "Выход к воде" },
  { icon: MapPin, label: "100 м до пляжа" },
];

export const SEASONS = {
  high: { name: "Высокий сезон", months: [6, 7, 8], pricePerNight: 18000 },
  mid: { name: "Межсезонье", months: [5, 9], pricePerNight: 12000 },
  low: { name: "Низкий сезон", months: [1, 2, 3, 4, 10, 11, 12], pricePerNight: 8000 },
};

export const MIN_NIGHTS = 2;

export const INCLUDED = [
  "Постельное бельё и полотенца",
  "Wi-Fi",
  "Уборка после выезда",
];

// TODO: реальные фото — заменить на URL из Supabase Storage или Cloudinary
export const GALLERY = [
  { src: "/images/placeholder-1.jpg", alt: "Вид на коттедж на закате" },
  { src: "/images/placeholder-2.jpg", alt: "Балкон" },
  { src: "/images/placeholder-3.jpg", alt: "Гостиная" },
  { src: "/images/placeholder-4.jpg", alt: "Главная спальня" },
  { src: "/images/placeholder-5.jpg", alt: "Кухня" },
  { src: "/images/placeholder-7.jpg", alt: "Мангальная зона" },
  { src: "/images/placeholder-8.jpg", alt: "Выход к воде" },
];


export const FAQ = [
  {
    q: "Как происходит оплата?",
    a: "Предоплата 30% переводом на банковскую карту для брони дат. Остальная сумма — наличными или переводом при заезде.",
  },
  {
    q: "Можно ли с животными?",
    a: "По согласованию. Напишите в WhatsApp — обсудим.",
  },
  {
    q: "Что взять с собой?",
    a: "Личные вещи и продукты. Всё остальное (постель, полотенца, посуда, дрова) уже на месте.",
  },
  {
    q: "Время заезда и выезда?",
    a: "Заезд с 14:00, выезд до 12:00. Раннее заселение и поздний выезд — по договорённости.",
  },
  {
    q: "Есть ли депозит?",
    a: "Да, 5000 сом при заезде. Возвращается при выезде, если имущество в порядке.",
  },
];
