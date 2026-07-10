import BlogPostReader from "@/components/BlogPostReader";
import Navbar from "@/components/Navbar";
import { BRAND_NAME, toSiteUrl } from "@/lib/site";
import styles from "../blog.module.css";

export const metadata = {
  title: "Dental Article",
  description:
    "Read Dental Square guidance about dental care, appointments, and healthy smile habits.",
  alternates: {
    canonical: toSiteUrl("/blog/post"),
  },
  openGraph: {
    title: `Dental Article | ${BRAND_NAME}`,
    description:
      "Helpful dental guidance from Dental Square for brighter, healthier smiles.",
    url: toSiteUrl("/blog/post"),
    type: "article",
  },
};

export default function CmsBlogPostPage() {
  return (
    <div className={styles.page}>
      <Navbar homeHrefPrefix="/" activeKey="blogs" />
      <BlogPostReader />
    </div>
  );
}
