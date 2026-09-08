import type { Metadata } from "next";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    title: "Kontakt",
    description: `Kontaktujte ${site.name}.`,
    alternates: { canonical: new URL("/kontakt", site.url).href },
  };
}

export default async function ContactPage() {
  const site = await getSiteSettings();
  const phoneHref = site.contact.phone.replace(/\s/g, "");

  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
              Ozvite sa
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Kontakt</h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Máte otázku alebo projekt? Napíšte nám alebo zavolajte.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <a
              href={`mailto:${site.contact.email}`}
              className="rounded-lg border border-border bg-surface p-6 transition-colors hover:bg-background"
            >
              <p className="text-sm font-medium text-muted">E-mail</p>
              <p className="mt-2 font-semibold">{site.contact.email}</p>
            </a>
            <a
              href={`tel:${phoneHref}`}
              className="rounded-lg border border-border bg-surface p-6 transition-colors hover:bg-background"
            >
              <p className="text-sm font-medium text-muted">Telefón</p>
              <p className="mt-2 font-semibold">{site.contact.phone}</p>
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
