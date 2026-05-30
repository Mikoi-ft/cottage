import { COTTAGE, CONTACTS } from "@/lib/constants";

export default function LodgingSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: COTTAGE.name,
    description: COTTAGE.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Чон-Сары-Ой",
      addressRegion: "Иссык-Кульская область",
      addressCountry: "KG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COTTAGE.coords.lat,
      longitude: COTTAGE.coords.lng,
    },
    telephone: CONTACTS.phone,
    priceRange: "8000–15000 сом / сутки",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
