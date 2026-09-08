import type { MetadataRoute } from "next";

import { client, sanityFetchOptions } from "@/sanity/lib/client";
import {
  PRODUCTS_SITEMAP_QUERY,
  REFERENCES_SITEMAP_QUERY,
  SERVICES_SITEMAP_QUERY,
} from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, services, references] = await Promise.all([
    client.fetch(PRODUCTS_SITEMAP_QUERY, {}, sanityFetchOptions),
    client.fetch(SERVICES_SITEMAP_QUERY, {}, sanityFetchOptions),
    client.fetch(REFERENCES_SITEMAP_QUERY, {}, sanityFetchOptions),
  ]);
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
    {
      url: new URL("/referencie", site.url).href,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: new URL("/kontakt", site.url).href,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...services.map((service) => ({
      url: new URL(`/sluzby/${encodeURIComponent(service.slug)}`, site.url).href,
      lastModified: service._updatedAt,
    })),
    ...references.map((reference) => ({
      url: new URL(`/referencie/${encodeURIComponent(reference.slug)}`, site.url).href,
      lastModified: reference._updatedAt,
    })),
    ...products.flatMap((product) => product.slug ? [{
      url: new URL(`/produkty/${encodeURIComponent(product.slug)}`, site.url).href,
      lastModified: product._updatedAt,
    }] : []),
  ];
}
