import { cache } from "react";

import { siteConfig, type SiteConfig } from "@/config/site";

import { client, sanityFetchOptions } from "./client";
import { SITE_SETTINGS_QUERY } from "./queries";

function validUrl(value: string | null | undefined): string {
  if (!value) return siteConfig.url;

  try {
    return new URL(value).href.replace(/\/$/, "");
  } catch {
    return siteConfig.url;
  }
}

export const getSiteSettings = cache(async (): Promise<SiteConfig> => {
  const settings = await client.fetch(SITE_SETTINGS_QUERY, {}, sanityFetchOptions);

  if (!settings) return siteConfig;

  const navigation = settings.navigation
    ?.flatMap((item) =>
      item?.label?.trim() && item.href?.startsWith("/")
        ? [{ label: item.label.trim(), href: item.href }]
        : [],
    ) ?? siteConfig.navigation;

  return {
    name: settings.name?.trim() || siteConfig.name,
    shortName: settings.shortName?.trim() || siteConfig.shortName,
    description: settings.description?.trim() || siteConfig.description,
    url: validUrl(settings.url),
    locale: settings.locale?.trim() || siteConfig.locale,
    contact: {
      email: settings.contact?.email?.trim() || siteConfig.contact.email,
      phone: settings.contact?.phone?.trim() || siteConfig.contact.phone,
    },
    navigation: navigation.length ? navigation : siteConfig.navigation,
    social: {
      facebook: settings.social?.facebook?.trim() || siteConfig.social.facebook,
      instagram: settings.social?.instagram?.trim() || siteConfig.social.instagram,
      linkedin: settings.social?.linkedin?.trim() || siteConfig.social.linkedin,
    },
  };
});
