# Cottage Issyk-Kul

Сайт-витрина для бронирования частного коттеджа на Иссык-Куле.

## Стек

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- react-day-picker
- Lucide React
- Деплой на Vercel

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Supabase

1. Зарегистрируйся на https://supabase.com и создай новый проект
2. В разделе **SQL Editor** выполни содержимое файла `supabase.sql`
3. В **Settings → API** скопируй:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Переменные окружения

Скопируй `.env.local.example` в `.env.local` и заполни значения:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=996700000000      # без + и пробелов
NEXT_PUBLIC_TELEGRAM_USERNAME=your_username    # без @
NEXT_PUBLIC_INSTAGRAM_USERNAME=your_cottage
NEXT_PUBLIC_SITE_URL=https://your-cottage.vercel.app
```

### 4. Локальный запуск

```bash
npm run dev
```

Открой http://localhost:3000

## Деплой на Vercel

1. Залей код на GitHub (private repo)
2. Vercel → **New Project** → Import from GitHub
3. В **Environment Variables** добавь все переменные из `.env.local`
4. **Deploy** — получишь URL вида `your-cottage.vercel.app`
5. После деплоя обнови `NEXT_PUBLIC_SITE_URL` на реальный URL и сделай Redeploy

## Управление бронированиями

Пока через Supabase Dashboard:
- **Table Editor → bookings**
- Меняй статус заявки с `pending` на `confirmed`
- Подтверждённые брони автоматически попадут в календарь на сайте (с задержкой до 5 минут — это `revalidate` в `app/page.tsx`)

## TODO — что нужно заменить

### Изображения (`public/images/`)
- [ ] `hero-placeholder.jpg` — главное фото коттеджа на закате (1920×1080, до 300KB)
- [ ] `og-image.jpg` — превью для WhatsApp/соцсетей (1200×630)
- [ ] `placeholder-1.jpg` … `placeholder-8.jpg` — галерея (1600×1200)

### Тексты (`lib/constants.ts`)
- [ ] `COTTAGE.name` — название коттеджа
- [ ] `COTTAGE.tagline` — фраза-обещание
- [ ] `COTTAGE.coords` — реальные координаты (взять из 2GIS)
- [ ] `COTTAGE.address` — адрес
- [ ] `COTTAGE.distanceFromBishkek`
- [ ] `CONTACTS.phone` — реальный телефон
- [ ] `AMENITIES` — уточнить количество спален/мест
- [ ] `SEASONS` — реальные цены
- [ ] `REVIEWS` — реальные отзывы
- [ ] `FAQ` — уточнить условия (предоплата, депозит)

### Прочее
- [ ] `components/sections/Location.tsx` — список «что рядом»
- [ ] `components/schema/LodgingSchema.tsx` — `addressLocality`

## Структура

```
app/
  layout.tsx          # Root layout, шрифты, метаданные
  page.tsx            # Главная страница
  globals.css
  api/bookings/       # POST endpoint для заявок
components/
  sections/           # Hero, Gallery, Amenities, Location, BookingCalendar, BookingForm, Reviews, FAQ, Footer
  ui/Lightbox.tsx
  schema/             # JSON-LD для SEO
lib/
  constants.ts        # Контент, цены, контакты
  pricing.ts          # Расчёт по сезонам
  utils.ts
  supabase/           # Клиенты Supabase
types/
  booking.ts
public/images/        # Плейсхолдеры
supabase.sql          # SQL для базы
```

## Рекомендации

**Защита от спама.** POST на `/api/bookings` сейчас без капчи. Если начнётся флуд — поставь Cloudflare Turnstile.

**Кэширование календаря.** В `app/page.tsx` стоит `revalidate = 300` (5 минут). Если хочешь мгновенное обновление после подтверждения брони — настрой Supabase Webhook → Vercel `revalidatePath`.

**OG-картинка для WhatsApp.** Это критично — большинство заявок придёт оттуда. После замены `og-image.jpg` проверь превью через https://developers.facebook.com/tools/debug
