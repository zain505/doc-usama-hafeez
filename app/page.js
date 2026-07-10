import HomePage from "@/components/HomePage";
import { BRAND_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: BRAND_NAME,
  url: SITE_URL,
  telephone: "+923336367187",
  priceRange: "PKR 49 - PKR 149",
  description:
    "Dental Square provides comprehensive services including general dentistry, cosmetic dentistry, implants, orthodontics, whitening, and emergency dentistry.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2/A, Trust Colony",
    addressLocality: "Bahawalpur",
    postalCode: "63100",
    addressCountry: "PK",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
      opens: "13:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Thursday", "Saturday", "Sunday"],
      opens: "13:00",
      closes: "22:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "17:00",
      closes: "22:00",
    },
  ],
  medicalSpecialty: [
    "General Dentistry",
    "Cosmetic Dentistry",
    "Dental Implants",
    "Orthodontics",
    "Emergency Dentistry",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage />
    </>
  );
}
