import { z } from 'zod';

export const addSubscriptionSchema = z.object({
  subscription: z.number().int(),
  tariff: z.number().int(),
  charge_account: z.number().int(),
  is_auto_pay: z.boolean(),
});

export type AddSubscriptionModel = z.infer<typeof addSubscriptionSchema>;
