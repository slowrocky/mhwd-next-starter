import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { client, sanityFetchOptions } from "@/sanity/lib/client";
import { PRODUCTS_SITEMAP_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await client.fetch(PRODUCTS_SITEMAP_QUERY, {}, sanityFetchOptions);

  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...products.flatMap((product) => product.slug ? [{
      url: new URL(`/produkty/${encodeURIComponent(product.slug)}`, siteConfig.url).href,
      lastModified: product._updatedAt,
    }] : []),
  ];
}
