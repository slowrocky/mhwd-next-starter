import type { MetadataRoute } from "next";

import { client, sanityFetchOptions } from "@/sanity/lib/client";
import { PRODUCTS_SITEMAP_QUERY } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await client.fetch(PRODUCTS_SITEMAP_QUERY, {}, sanityFetchOptions);
  const site = await getSiteSettings();

  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/sluzby", site.url).href,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...products.flatMap((product) => product.slug ? [{
      url: new URL(`/produkty/${encodeURIComponent(product.slug)}`, site.url).href,
      lastModified: product._updatedAt,
    }] : []),
  ];
}
