import type { MetadataRoute } from "next";
import { conditions } from "@/data/conditions";
import { topics } from "@/data/healthy-living";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/conditions`, priority: 0.9 },
    { url: `${base}/healthy-living`, priority: 0.9 },
    { url: `${base}/symptom-checker`, priority: 0.8 },
    { url: `${base}/about`, priority: 0.5 },
    { url: `${base}/contact`, priority: 0.5 },
  ];

  const conditionRoutes: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `${base}/conditions/${c.slug}`,
    priority: 0.7,
  }));

  const topicRoutes: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${base}/healthy-living/${t.slug}`,
    priority: 0.7,
  }));

  return [...staticRoutes, ...conditionRoutes, ...topicRoutes];
}