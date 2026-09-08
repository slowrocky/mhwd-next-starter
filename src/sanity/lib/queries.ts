import { defineQuery } from "next-sanity";

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
