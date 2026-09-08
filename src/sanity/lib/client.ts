import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Next.js caches responses; refreshes should read fresh Sanity data.
  perspective: 'published',
})

// Shared policy for published content on the homepage and product detail.
export const sanityFetchOptions = {
  next: { revalidate: 60 },
} as const
