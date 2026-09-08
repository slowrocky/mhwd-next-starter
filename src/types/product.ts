import type { SanityImageSource } from "@sanity/image-url";

export type Product = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  price?: number;
  image?: SanityImageSource;
  featured?: boolean;
};