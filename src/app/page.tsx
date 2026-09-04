import { Container } from "@/app/components/layout/container";
import { Section } from "@/app/components/layout/section";
import { Button } from "@/app/components/ui/button";
import { ButtonLink } from "@/app/components/ui/button-link";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

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
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/kontakt">Kontaktovať</ButtonLink>

            <ButtonLink href="/sluzby" variant="secondary">
              Služby
            </ButtonLink>

            <Button variant="ghost">Button test</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="vas@email.sk"
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
