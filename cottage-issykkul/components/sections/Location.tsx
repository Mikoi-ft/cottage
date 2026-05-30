import { MapPin } from "lucide-react";
import { COTTAGE, RESORT_FEATURES } from "@/lib/constants";

export default function Location() {
  return (
    <section id="location" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-serif text-3xl md:text-5xl">Где находимся</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white md:aspect-auto">
            <iframe
              src={`https://yandex.ru/map-widget/v1/?ll=${COTTAGE.coords.lng}%2C${COTTAGE.coords.lat}&z=14&pt=${COTTAGE.coords.lng},${COTTAGE.coords.lat},pm2rdm`}
              className="h-full w-full border-0"
              loading="lazy"
              title="Карта"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 flex-shrink-0 text-lake" size={20} />
              <div>
                <p className="text-lg text-ink">{COTTAGE.address}</p>
                <p className="mt-1 text-muted">{COTTAGE.distanceFromBishkek}</p>
              </div>
            </div>

            <div className="mt-8 space-y-3 text-muted">
              {RESORT_FEATURES.map((f) => (
                <p key={f}>— {f}</p>
              ))}
              <p>— 10 км от аэропорта Тамчы</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
