import { z } from 'zod';
import { favoriteSubscriptionSchema } from './favoriteSubscriptionSchema.ts';

export const favoriteSubscriptionsResponseSchema = z.object({
  count: z.number(),
  next: z.null().optional(),
  previous: z.null().optional(),
  results: z.array(favoriteSubscriptionSchema),
});

export type FavoriteSubscriptionsResponseModel = z.infer<
  typeof favoriteSubscriptionsResponseSchema
>;
