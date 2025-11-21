import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(60, 'Title must be 60 characters or less'),
    description: z.string().max(100, 'Description must be 100 characters or less'),
    status: z.enum([
      'In Development',
      'Early Prototype',
      'Live',
      'Archived'
    ]),
    order: z.number().int().positive(),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  projects: projectsCollection,
};
