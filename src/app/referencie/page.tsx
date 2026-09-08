import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { client, sanityFetchOptions } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { REFERENCES_QUERY } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: "Referencie",
    description: `Referencie a projekty od ${site.name}.`,
    alternates: { canonical: new URL("/referencie", site.url).href },
  };
}

export default async function ReferencesPage() {
  const references = await client.fetch(REFERENCES_QUERY, {}, sanityFetchOptions);

  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
              Naše projekty
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Referencie</h1>
            {references.length === 0 ? (
              <p className="mt-6 text-lg leading-8 text-muted">
                Referencie pre tento projekt zatiaľ nie sú vyplnené. Po pridaní projektov v CMS sa
                tu zobrazia vybrané projekty.
              </p>
            ) : (
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {references.map((reference) => (
                  <article key={reference._id} className="overflow-hidden rounded-lg border border-border bg-surface">
                    {reference.image && (
                      <Image
                        src={urlFor(reference.image).width(1000).height(750).fit("crop").url()}
                        alt={reference.name}
                        width={1000}
                        height={750}
                        className="aspect-4/3 w-full object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        <Link href={`/referencie/${reference.slug.current}`} className="hover:underline">
                          {reference.name}
                        </Link>
                      </h2>
                      <p className="mt-3 leading-7 text-muted">{reference.description}</p>
                      {reference.url && (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex text-sm font-semibold underline underline-offset-4"
                        >
                          Navštíviť projekt
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
