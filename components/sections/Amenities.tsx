import { AMENITIES } from "@/lib/constants";

export default function Amenities() {
  return (
    <section id="amenities" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-content px-6">
        <h2 className="font-serif text-3xl md:text-5xl">Что внутри</h2>

        <div className="mt-10 grid grid-cols-2 gap-6 md:mt-14 md:grid-cols-4 md:gap-8">
          {AMENITIES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-start">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-lake">
                <Icon size={24} strokeWidth={1.5} />
              </div>
              <p className="mt-3 text-base text-ink md:text-lg">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
