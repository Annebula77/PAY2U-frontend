import { z } from 'zod';
import { categorySchema } from './categorySchema';

const cashbackSubscriptionSchema = z.object({
  id: z.number(),
  popularity: z.number(),
  name: z.string(),
  image_preview: z.string(),
  image_detail: z.string(),
  description: z.string(),
  is_recommended: z.boolean(),
  category: categorySchema,
});

export const cashbackStatusResponseSchema = z.object({
  id: z.number(),
  client: z.number(),
  amount: z.number(),
  status: z.enum(['cancelled', 'pending', 'credited']),
  subscription: cashbackSubscriptionSchema,
  invoice_id: z.number(),
  created_at: z.string(),
});

export type CashbackSubscriptionModel = z.infer<
  typeof cashbackSubscriptionSchema
>;
export type CashbackStatusResponseModel = z.infer<
  typeof cashbackStatusResponseSchema
>;
