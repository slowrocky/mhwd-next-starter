import type { Metadata } from "next";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
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
  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
              Naše projekty
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Referencie</h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Referencie pre tento projekt zatiaľ nie sú vyplnené. Po pridaní CMS modelu
              sa tu zobrazia vybrané projekty.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
