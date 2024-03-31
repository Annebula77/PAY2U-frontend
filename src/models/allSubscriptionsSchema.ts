import { z } from 'zod';
import { singleSubscriptionSchema } from './singleSubscriptionSchema';

export const allSubscriptionsResponseSchema = z.object({
  count: z.number(),
  next: z.null(),
  previous: z.null(),
  results: z.array(singleSubscriptionSchema),
});

export type AllSubscriptionsResponseModel = z.infer<typeof allSubscriptionsResponseSchema>;
