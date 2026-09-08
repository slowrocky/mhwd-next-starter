"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-muted">Chyba</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Niečo sa pokazilo</h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Stránku sa nepodarilo načítať. Skúste to znova alebo sa vráťte na úvod.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => reset()} className="rounded-md bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80">
                Skúsiť znova
              </button>
              <Link href="/" className="rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-surface">
                Späť na úvod
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
