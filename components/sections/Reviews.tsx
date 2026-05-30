import { REVIEWS } from "@/lib/constants";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-serif text-3xl md:text-5xl">Отзывы гостей</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 md:p-8">
              <p className="text-ink leading-relaxed">«{r.text}»</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-lake/10 text-lake flex items-center justify-center font-medium">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm text-ink">{r.name}</p>
                  <p className="text-xs text-muted">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
