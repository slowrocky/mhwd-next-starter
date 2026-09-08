import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0] {
    name,
    shortName,
    description,
    url,
    locale,
    contact { email, phone },
    navigation[] { _key, label, href },
    social { facebook, instagram, linkedin }
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && status == "active"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    image
  }
`);

export const PRODUCTS_SITEMAP_QUERY = defineQuery(`
  *[
    _type == "product" &&
    active == true &&
    defined(slug.current) &&
    slug.current != ""
  ] | order(slug.current asc) {
    "slug": slug.current,
    _updatedAt
  }
`);

export const PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product" &&
    active == true
  ] | order(name asc) {
    _id,
    name,
    slug,
    description,
    price,
    image,
    featured
  }
`);

export const PRODUCT_QUERY = defineQuery(`
  *[
    _type == "product" &&
    slug.current == $slug &&
    active == true
  ][0] {
    _id,
    name,
    slug,
    description,
    price,
    image,
    featured
  }
`);
