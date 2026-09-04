import Link from "next/link";

import { siteConfig } from "@/config/site";

import { Container } from "./container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          <div>
            <p className="font-semibold">{siteConfig.name}</p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">Navigácia</p>

            <ul className="mt-4 space-y-2">
              {siteConfig.navigation.map((item) => (
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
                  href={`mailto:${siteConfig.contact.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </p>

              <p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-sm text-muted">
            © {currentYear} {siteConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
