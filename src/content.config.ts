import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().default('Giannis Psarakis'),
    slug: z.string(),
    originalUrl: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const collections = { blog };
