import { BLOG_POSTS, getBlogPostPath } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const buildUrl = (path) => new URL(path, SITE_URL).toString();

  return [
    {
      url: buildUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: buildUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...BLOG_POSTS.map((post) => ({
      url: buildUrl(getBlogPostPath(post.slug)),
      lastModified: new Date(post.dateISO),
      changeFrequency: "monthly",
      priority: 0.65,
    })),
  ];
}
