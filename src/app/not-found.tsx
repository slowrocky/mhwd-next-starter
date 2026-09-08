import Link from "next/link";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";

export default function NotFound() {
  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-muted">404</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Stránka sa nenašla</h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Požadovaná stránka neexistuje alebo už nie je dostupná.
            </p>
            <Link href="/" className="mt-8 inline-flex rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80">
              Späť na úvod
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
