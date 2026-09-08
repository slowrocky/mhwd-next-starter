import Link from "next/link";

import type { SiteConfig } from "@/config/site";

import { Container } from "./container";
import { MobileNav } from "./mobile-nav";

type HeaderProps = { site: SiteConfig };

export function Header({ site }: HeaderProps) {
  return (
    <header className="relative border-b border-border bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {site.shortName}
          </Link>

          <nav aria-label="Hlavná navigácia" className="hidden md:block">
            <ul className="flex items-center gap-6">
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
          </nav>

          <MobileNav navigation={site.navigation} />
        </div>
      </Container>
    </header>
  );
}
