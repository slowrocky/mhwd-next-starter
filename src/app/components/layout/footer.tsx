import Link from "next/link";

import type { SiteConfig } from "@/config/site";

import { Container } from "./container";

type FooterProps = { site: SiteConfig };

export function Footer({ site }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          <div>
            <p className="font-semibold">{site.name}</p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              {site.description}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Navigácia</p>

            <ul className="mt-4 space-y-2">
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Kontakt</p>

            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {site.contact.email}
                </a>
              </p>

              <p>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {site.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-sm text-muted">
            © {currentYear} {site.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
