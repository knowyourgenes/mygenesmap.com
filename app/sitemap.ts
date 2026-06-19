import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import { getAreaSitemap, getDecodeSitemap } from "../sanity/fetch";

const BASE = siteConfig.siteUrl;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/map`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // CMS-driven routes. Wrapped so the static routes still emit if Sanity is down.
  // lastModified uses each doc's publishedAt (falling back to _updatedAt via GROQ).
  let areaRoutes: MetadataRoute.Sitemap = [];
  let decodeRoutes: MetadataRoute.Sitemap = [];
  try {
    const [areaItems, decodeItems] = await Promise.all([
      getAreaSitemap(),
      getDecodeSitemap(),
    ]);

    areaRoutes = areaItems.map((item) => ({
      url: `${BASE}/area/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    decodeRoutes = decodeItems.map((item) => ({
      url: `${BASE}/decode/${item.slug}`,
      lastModified: item.publishedAt ? new Date(item.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.9,
    }));
  } catch (err) {
    console.warn("[sitemap] CMS fetch failed, emitting static routes only:", err);
  }

  // Dedupe by URL.
  const seen = new Set<string>();
  return [...staticRoutes, ...areaRoutes, ...decodeRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
