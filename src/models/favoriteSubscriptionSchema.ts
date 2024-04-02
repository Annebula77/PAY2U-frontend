import { z } from 'zod';
import { singleSubscriptionSchema } from './singleSubscriptionSchema.ts';

export const favoriteSubscriptionSchema = z.object({
  id: z.number(),
  subscription: singleSubscriptionSchema,
  client: z.number(),
});

export type FavoriteSubscriptionModel = z.infer<
  typeof favoriteSubscriptionSchema
>;
