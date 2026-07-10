import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";
import { BLOG_POSTS, getBlogPostPath } from "@/lib/blog";
import { BRAND_NAME } from "@/lib/site";
import styles from "./blog.module.css";

export const metadata = {
  title: "Dental Tips & Insights",
  description:
    "Read Dental Square articles about whitening, children's dental visits, braces care, and everyday oral health habits.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Dental Tips & Insights | ${BRAND_NAME}`,
    description:
      "Helpful dental guides from Dental Square for brighter, healthier smiles.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];

  return (
    <div className={styles.page}>
      <Navbar homeHrefPrefix="/" activeKey="blogs" />

      <main>
        <section className={`${styles.section} ${styles.indexHero}`}>
          <div className={styles.indexHeroCopy}>
            <span className={styles.kicker}>
              <Newspaper size={20} aria-hidden="true" />
              Dental Square Blog
            </span>
            <h1>Dental tips for confident, healthy smiles</h1>
            <p>
              Practical guidance from everyday care to treatment prep, written
              for patients and families who want clear next steps.
            </p>
            <Link className={styles.primaryCta} href="/#contact">
              Book an appointment
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <Link className={styles.featuredPost} href={getBlogPostPath(featuredPost.slug)}>
            <div className={styles.featuredImage}>
              <Image
                src={featuredPost.image}
                alt={featuredPost.imageAlt}
                fill
                priority
                sizes="(max-width: 920px) 92vw, 560px"
                className={styles.fillImage}
              />
            </div>
            <div className={styles.featuredCopy}>
              <span>{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <span className={styles.inlineLink}>
                Read featured article
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </div>
          </Link>
        </section>

        <section className={`${styles.section} ${styles.articleList}`} aria-labelledby="all-articles-title">
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>All Articles</span>
            <h2 id="all-articles-title">Browse dental guides</h2>
          </div>

          <div className={styles.postGrid}>
            {BLOG_POSTS.map((post) => (
              <article className={styles.postCard} key={post.slug}>
                <Link className={styles.cardImage} href={getBlogPostPath(post.slug)}>
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 760px) 92vw, 380px"
                    className={styles.fillImage}
                  />
                </Link>
                <div className={styles.cardMeta}>
                  <span>{post.category}</span>
                  <span>
                    <CalendarDays size={15} aria-hidden="true" />
                    {post.date}
                  </span>
                  <span>
                    <Clock size={15} aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
                <h3>
                  <Link href={getBlogPostPath(post.slug)}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link className={styles.readMore} href={getBlogPostPath(post.slug)}>
                  Read More
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
