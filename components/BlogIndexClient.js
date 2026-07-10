"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  BLOG_POSTS,
  getPublicBlogPostPath,
  isRemoteUrl,
  normalizeStaticBlogPost,
} from "@/lib/blog";
import { getPublishedBlogPosts } from "@/lib/blogService";
import { withBasePath } from "@/lib/site";
import styles from "@/app/blog/blog.module.css";

function getImageSrc(src) {
  return isRemoteUrl(src) ? src : withBasePath(src);
}

export default function BlogIndexClient() {
  const fallbackPosts = BLOG_POSTS.map(normalizeStaticBlogPost);
  const [cmsPosts, setCmsPosts] = useState([]);

  useEffect(() => {
    let active = true;

    getPublishedBlogPosts()
      .then((posts) => {
        if (active) {
          setCmsPosts(posts);
        }
      })
      .catch(() => {
        if (active) {
          setCmsPosts([]);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const posts = cmsPosts.length ? cmsPosts : fallbackPosts;
  const featuredPost = posts[0];

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

          <Link className={styles.featuredPost} href={getPublicBlogPostPath(featuredPost)}>
            <div className={styles.featuredImage}>
              <Image
                src={getImageSrc(featuredPost.image)}
                alt={featuredPost.imageAlt}
                fill
                sizes="(max-width: 920px) 92vw, 560px"
                className={styles.mediaImage}
                priority
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
            {posts.map((post) => (
              <article className={styles.postCard} key={`${post.source}-${post.slug}`}>
                <Link className={styles.cardImage} href={getPublicBlogPostPath(post)}>
                  <Image
                    src={getImageSrc(post.image)}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 760px) 92vw, 380px"
                    className={styles.mediaImage}
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
                  <Link href={getPublicBlogPostPath(post)}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link className={styles.readMore} href={getPublicBlogPostPath(post)}>
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
