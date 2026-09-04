import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";

export default function Home() {
  return (
    <main>
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted">
              MHWD
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Next.js Starter
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Reusable foundation for custom MHWD client websites.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Core layout is working.
          </h2>
        </Container>
      </Section>
    </main>
  );
}
