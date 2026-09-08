import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { client, sanityFetchOptions } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICE_QUERY } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

const getService = cache(async (slug: string) => {
  const service = await client.fetch(SERVICE_QUERY, { slug }, sanityFetchOptions);

  if (!service) notFound();

  return service;
});

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  const site = await getSiteSettings();
  const title = `${service.name} | ${site.shortName}`;
  const description = service.description.trim() || site.description;
  const url = new URL(`/sluzby/${encodeURIComponent(slug)}`, site.url).href;
  const images = service.image?.asset
    ? [{
        url: urlFor(service.image).width(1200).height(630).fit("crop").url(),
        width: 1200,
        height: 630,
        alt: service.name,
      }]
    : [];

  return {
    title: service.name,
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

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  return (
    <main>
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {service.image && (
              <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-surface">
                <Image
                  src={urlFor(service.image).width(1200).height(900).fit("crop").url()}
                  alt={service.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-muted">Služba</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted">{service.description}</p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
