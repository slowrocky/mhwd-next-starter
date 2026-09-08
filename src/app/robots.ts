import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/sanity/lib/site-settings";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
