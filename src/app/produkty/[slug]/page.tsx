import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PRODUCT_QUERY } from "@/sanity/lib/queries";
import type { Product } from "@/types/product";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await client.fetch<Product | null>(PRODUCT_QUERY, { slug });

  if (!product) {
    notFound();
  }

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
