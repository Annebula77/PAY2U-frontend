import { z } from 'zod';

export const updateFavSubscriptionSchema = z.object({
  is_auto_pay: z.boolean(),
});

export type UpdateFavSubscriptionModel = z.infer<
  typeof updateFavSubscriptionSchema
>;

export const updateFavSubscriptionParamsSchema = z.object({
  client_id: z.number().int(),
  subscription_id: z.number().int(),
});

export type UpdateFavSubscriptionParamsModel = z.infer<
  typeof updateFavSubscriptionParamsSchema
>;
