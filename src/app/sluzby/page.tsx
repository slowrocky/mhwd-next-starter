import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { getSiteSettings } from "@/sanity/lib/site-settings";
import { client, sanityFetchOptions } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICES_QUERY } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: "Služby",
    description: `Ponuka služieb od ${site.name}.`,
    alternates: { canonical: new URL("/sluzby", site.url).href },
  };
}

export default async function ServicesPage() {
  const services = await client.fetch(SERVICES_QUERY, {}, sanityFetchOptions);

  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
              Čo robíme
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Služby
            </h1>
          </div>

          {services.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service._id}
                  className="overflow-hidden rounded-lg border border-border bg-background"
                >
                  {service.image && (
                    <div className="relative aspect-4/3 bg-surface">
                      <Image
                        src={urlFor(service.image).width(800).height(600).fit("crop").url()}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold tracking-tight">{service.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted">{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
