import I18nProvider from "@/components/I18nProvider";
import { BRAND_NAME, SITE_URL } from "@/lib/site";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | Family Dental Clinic`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Dental Square offers family dentistry, cosmetic treatments, implants, orthodontics, whitening, and emergency dentistry.",
  keywords: [
    "Dental Square",
    "dentist",
    "dental clinic",
    "teeth whitening",
    "orthodontics",
    "dental implants",
    "emergency dentistry",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${BRAND_NAME} | Exceptional Dentistry`,
    description:
      "Modern dentistry with advanced technology and a gentle touch for healthier, brighter smiles.",
    url: SITE_URL,
    siteName: BRAND_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | Exceptional Dentistry`,
    description:
      "Family dentistry, cosmetic care, dental implants, orthodontics, and emergency appointments.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={poppins.variable}>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
