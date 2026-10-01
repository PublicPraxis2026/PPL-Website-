import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    introduction: z.string(),
    image: z.object({
      label: z.string(),
      caption: z.string(),
    }).optional(),
    callout: z.object({
      heading: z.string(),
      text: z.string(),
    }).optional(),
    cta: z.object({
      label: z.string(),
      note: z.string(),
    }).optional(),
  }),
});

export const collections = { pages };
