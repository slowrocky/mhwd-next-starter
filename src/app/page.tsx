import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { client, sanityFetchOptions } from "@/sanity/lib/client";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import Link from "next/link";

import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const [products, site] = await Promise.all([
    client.fetch(PRODUCTS_QUERY, {}, sanityFetchOptions),
    getSiteSettings(),
  ]);

  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
              {site.shortName}
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {site.description}
            </p>
          </div>
        </Container>
      </Section>

      {products.length > 0 && (
        <Section className="border-t border-border bg-surface">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Produkty
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
              <article
                key={product._id}
                className="rounded-lg border border-border bg-background p-6"
              >
                {product.image && (
                  <div className="relative mb-5 aspect-4/3 overflow-hidden rounded-md bg-surface">
                    <Image
                      src={urlFor(product.image)
                        .width(800)
                        .height(600)
                        .fit("crop")
                        .url()}
                      alt={product.name}
                      loading={index === 0 ? "eager" : "lazy"}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold">
                  <Link
                    href={`/produkty/${product.slug.current}`}
                    className="hover:underline"
                  >
                    {product.name}
                  </Link>
                </h3>

                {product.description && (
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {product.description}
                  </p>
                )}

                {typeof product.price === "number" && (
                  <p className="mt-4 font-medium">
                    {product.price.toFixed(2)} €
                  </p>
                )}
              </article>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
