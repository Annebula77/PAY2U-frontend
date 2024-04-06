import { z } from 'zod';

export const deleteSubscriptionSchema = z.object({
  subscription_id: z.number().int(),
});
export type DeleteSubscriptionModel = z.infer<typeof deleteSubscriptionSchema>;
