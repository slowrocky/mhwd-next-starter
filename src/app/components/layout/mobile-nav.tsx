"use client";

import { useState } from "react";
import Link from "next/link";

import type { SiteConfig } from "@/config/site";

type MobileNavProps = { navigation: SiteConfig["navigation"] };

export function MobileNav({ navigation }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
      >
        <span className="sr-only">Otvoriť navigáciu</span>

        <span className="flex flex-col gap-1.5">
          <span className="h-0.5 w-5 bg-foreground" />
          <span className="h-0.5 w-5 bg-foreground" />
          <span className="h-0.5 w-5 bg-foreground" />
        </span>
      </button>

      {open && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-16 z-50 border-b border-border bg-background"
        >
          <nav aria-label="Mobilná navigácia">
            <ul className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
