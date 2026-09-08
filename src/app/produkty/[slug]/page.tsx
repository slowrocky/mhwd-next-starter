import Image from "next/image";
import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { client, sanityFetchOptions } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCT_QUERY } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getProduct = cache(async (slug: string) => {
  const product = await client.fetch(PRODUCT_QUERY, { slug }, sanityFetchOptions);
  if (!product) {
    notFound();
  }
  return product;
});

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  const site = await getSiteSettings();
  const title = `${product.name} | ${site.shortName}`;
  const description = product.description?.trim() || site.description;
  const url = new URL(`/produkty/${encodeURIComponent(slug)}`, site.url).href;
  const images = product.image?.asset
    ? [{
        url: urlFor(product.image).width(1200).height(630).fit("crop").url(),
        width: 1200,
        height: 630,
        alt: product.name,
      }]
    : [];

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title,
      description,
      url,
      images,
    },
    twitter: {
      card: images.length ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <main>
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {product.image && (
              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-surface">
                <Image
                  src={urlFor(product.image)
                    .width(1200)
                    .height(900)
                    .fit("crop")
                    .url()}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            )}

            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-6 text-lg leading-8 text-muted">
                  {product.description}
                </p>
              )}

              {typeof product.price === "number" && (
                <p className="mt-8 text-2xl font-semibold">
                  {product.price.toFixed(2)} €
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
