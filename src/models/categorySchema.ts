import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CategoryModel = z.infer<typeof categorySchema>;

export const categoryListSchema = z.object({
  count: z.number(),
  next: z.null().optional(),
  previous: z.null().optional(),
  results: z.array(categorySchema),
});

export type CategoryListModel = z.infer<typeof categoryListSchema>;