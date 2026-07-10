import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MessageCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  BLOG_POSTS,
  getBlogPost,
  getBlogPostPath,
  getRelatedPosts,
} from "@/lib/blog";
import { BRAND_NAME, SITE_URL } from "@/lib/site";
import styles from "../blog.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.seoDescription,
    alternates: {
      canonical: getBlogPostPath(post.slug),
    },
    openGraph: {
      title: `${post.title} | ${BRAND_NAME}`,
      description: post.seoDescription,
      url: getBlogPostPath(post.slug),
      type: "article",
      publishedTime: post.dateISO,
      images: [
        {
          url: post.image,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    image: new URL(post.image, SITE_URL).toString(),
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    mainEntityOfPage: new URL(getBlogPostPath(post.slug), SITE_URL).toString(),
  };

  return (
    <div className={styles.page}>
      <Navbar homeHrefPrefix="/" activeKey="blogs" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <article>
          <header className={`${styles.section} ${styles.articleHero}`}>
            <Link className={styles.backLink} href="/blog">
              <ArrowLeft size={18} aria-hidden="true" />
              Back to articles
            </Link>

            <div className={styles.articleHeroGrid}>
              <div className={styles.articleHeroCopy}>
                <span className={styles.categoryPill}>{post.category}</span>
                <h1>{post.title}</h1>
                <p>{post.excerpt}</p>
                <div className={styles.articleMeta}>
                  <span>
                    <CalendarDays size={17} aria-hidden="true" />
                    {post.date}
                  </span>
                  <span>
                    <Clock size={17} aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <div className={styles.articleHeroImage}>
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  preload
                  sizes="(max-width: 920px) 92vw, 560px"
                  className={styles.fillImage}
                />
              </div>
            </div>
          </header>

          <section className={`${styles.section} ${styles.readerWrap}`}>
            <div className={styles.articleBody}>
              {post.body.map((section) => (
                <section className={styles.articleSection} key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <div className={styles.articleCta}>
                <div>
                  <h2>Need advice for your own smile?</h2>
                  <p>
                    Dental articles are helpful, but your mouth deserves
                    personal guidance. Book a visit with Dental Square for care
                    that fits your teeth, gums, and goals.
                  </p>
                </div>
                <div className={styles.ctaActions}>
                  <Link className={styles.primaryCta} href="/#contact">
                    Book an appointment
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <a className={styles.secondaryCta} href="https://wa.me/923336367187">
                    <MessageCircle size={18} aria-hidden="true" />
                    WhatsApp us
                  </a>
                </div>
              </div>
            </div>

            <aside className={styles.relatedPanel} aria-labelledby="related-posts-title">
              <h2 id="related-posts-title">Related articles</h2>
              <div className={styles.relatedList}>
                {relatedPosts.map((relatedPost) => (
                  <Link
                    className={styles.relatedCard}
                    href={getBlogPostPath(relatedPost.slug)}
                    key={relatedPost.slug}
                  >
                    <span>{relatedPost.category}</span>
                    <strong>{relatedPost.title}</strong>
                    <small>{relatedPost.readTime}</small>
                  </Link>
                ))}
              </div>
            </aside>
          </section>
        </article>
      </main>
    </div>
  );
}
