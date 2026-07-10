"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MessageCircle,
} from "lucide-react";
import {
  BLOG_POSTS,
  getBlogPost,
  getPublicBlogPostPath,
  isRemoteUrl,
  normalizeStaticBlogPost,
} from "@/lib/blog";
import {
  getPublishedBlogPost,
  getPublishedBlogPosts,
} from "@/lib/blogService";
import { withBasePath } from "@/lib/site";
import styles from "@/app/blog/blog.module.css";

function getImageSrc(src) {
  return isRemoteUrl(src) ? src : withBasePath(src);
}

function getSlugFromLocation() {
  if (typeof window === "undefined") {
    return "";
  }

  return new URLSearchParams(window.location.search).get("slug") || "";
}

function fallbackRelatedPosts(slug) {
  return BLOG_POSTS
    .filter((post) => post.slug !== slug)
    .slice(0, 2)
    .map(normalizeStaticBlogPost);
}

export default function BlogPostReader() {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    async function loadPost() {
      await Promise.resolve();

      const slug = getSlugFromLocation();

      if (!slug) {
        if (active) {
          setStatus("missing");
        }
        return;
      }

      setStatus("loading");

      try {
        const [publishedPostResult, publishedPostsResult] = await Promise.allSettled([
          getPublishedBlogPost(slug),
          getPublishedBlogPosts(4),
        ]);
        const publishedPost =
          publishedPostResult.status === "fulfilled" ? publishedPostResult.value : null;
        const fallbackPost = getBlogPost(slug);
        const nextPost = publishedPost || (fallbackPost ? normalizeStaticBlogPost(fallbackPost) : null);

        if (!active) {
          return;
        }

        if (!nextPost) {
          setPost(null);
          setRelatedPosts([]);
          setStatus("missing");
          return;
        }

        const cmsRelatedPosts =
          publishedPostsResult.status === "fulfilled"
            ? publishedPostsResult.value.filter((item) => item.slug !== slug).slice(0, 2)
            : [];

        setPost(nextPost);
        setRelatedPosts(cmsRelatedPosts.length ? cmsRelatedPosts : fallbackRelatedPosts(slug));
        setStatus("ready");
      } catch {
        if (active) {
          setStatus("missing");
        }
      }
    }

    loadPost();

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <main>
        <section className={`${styles.section} ${styles.statePanel}`}>
          <span className={styles.kicker}>Loading Article</span>
          <h1>Preparing the dental guide...</h1>
        </section>
      </main>
    );
  }

  if (!post) {
    return (
      <main>
        <section className={`${styles.section} ${styles.statePanel}`}>
          <span className={styles.kicker}>Article Not Found</span>
          <h1>This article is not published yet.</h1>
          <p>Published CMS posts appear here as soon as they are available.</p>
          <Link className={styles.primaryCta} href="/blog">
            Back to articles
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
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
                src={getImageSrc(post.image)}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 920px) 92vw, 560px"
                className={styles.mediaImage}
                priority
              />
            </div>
          </div>
        </header>

        <section className={`${styles.section} ${styles.readerWrap}`}>
          <div className={styles.articleBody}>
            {post.body.map((section) => (
              <section className={styles.articleSection} key={section.heading}>
                <h2>{section.heading}</h2>
                {(section.paragraphs || []).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list?.length ? (
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
                  Dental articles are helpful, but your mouth deserves personal
                  guidance. Book a visit with Dental Square for care that fits
                  your teeth, gums, and goals.
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
                  href={getPublicBlogPostPath(relatedPost)}
                  key={`${relatedPost.source}-${relatedPost.slug}`}
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
  );
}
