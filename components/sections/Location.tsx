import { MapPin } from "lucide-react";
import { COTTAGE } from "@/lib/constants";

export default function Location() {
  return (
    <section id="location" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-serif text-3xl md:text-5xl">Где находимся</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white md:aspect-auto">
            {/* 2GIS embed — самый рабочий вариант для КР */}
            <iframe
              src={`https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A${COTTAGE.coords.lat}%2C%22lon%22%3A${COTTAGE.coords.lng}%2C%22zoom%22%3A14%7D%7D`}
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
              <p>До пляжа - 3 минут пешком</p>
              <p>Магазин - 300 м</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
