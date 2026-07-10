import BlogIndexClient from "@/components/BlogIndexClient";
import { BRAND_NAME, toSiteUrl } from "@/lib/site";

export const metadata = {
  title: "Dental Tips & Insights",
  description:
    "Read Dental Square articles about whitening, children's dental visits, braces care, and everyday oral health habits.",
  alternates: {
    canonical: toSiteUrl("/blog"),
  },
  openGraph: {
    title: `Dental Tips & Insights | ${BRAND_NAME}`,
    description:
      "Helpful dental guides from Dental Square for brighter, healthier smiles.",
    url: toSiteUrl("/blog"),
    type: "website",
  },
};

export default function BlogIndexPage() {
  return <BlogIndexClient />;
}
