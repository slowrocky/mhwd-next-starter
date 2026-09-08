import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { client, sanityFetchOptions } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { REFERENCE_QUERY } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";

type ReferencePageProps = {
  params: Promise<{ slug: string }>;
};

const getReference = cache(async (slug: string) => {
  const reference = await client.fetch(REFERENCE_QUERY, { slug }, sanityFetchOptions);
  if (!reference) notFound();
  return reference;
});

export async function generateMetadata({ params }: ReferencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const reference = await getReference(slug);
  const site = await getSiteSettings();
  const title = `${reference.name} | ${site.shortName}`;
  const description = reference.description.trim() || site.description;
  const url = new URL(`/referencie/${encodeURIComponent(slug)}`, site.url).href;
  const images = reference.image?.asset
    ? [{
        url: urlFor(reference.image).width(1200).height(630).fit("crop").url(),
        width: 1200,
        height: 630,
        alt: reference.name,
      }]
    : [];

  return {
    title: reference.name,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: site.locale, siteName: site.name, title, description, url, images },
    twitter: { card: images.length ? "summary_large_image" : "summary", title, description, images },
  };
}

export default async function ReferencePage({ params }: ReferencePageProps) {
  const { slug } = await params;
  const reference = await getReference(slug);

  return (
    <main>
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {reference.image && (
              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-surface">
                <Image
                  src={urlFor(reference.image).width(1200).height(900).fit("crop").url()}
                  alt={reference.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-muted">Referencia</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{reference.name}</h1>
              <p className="mt-6 text-lg leading-8 text-muted">{reference.description}</p>
              {reference.url && (
                <a href={reference.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex font-semibold underline underline-offset-4">
                  Navštíviť projekt
                </a>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
