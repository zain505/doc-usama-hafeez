import { BLOG_POSTS, getBlogPostPath } from "@/lib/blog";
import { toSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: toSiteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: toSiteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...BLOG_POSTS.map((post) => ({
      url: toSiteUrl(getBlogPostPath(post.slug)),
      lastModified: new Date(post.dateISO),
      changeFrequency: "monthly",
      priority: 0.65,
    })),
  ];
}
