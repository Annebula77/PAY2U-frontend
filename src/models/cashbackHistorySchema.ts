import { z } from 'zod';
import {
  cashbackSchema,
  subscriptionBenefitSchema,
} from './singleSubscriptionSchema';
import { categorySchema } from './categorySchema';

const subscriptionSchema = z.object({
  id: z.number(),
  popularity: z.number(),
  name: z.string(),
  image_preview: z.string(),
  image_detail: z.string(),
  description: z.string(),
  conditions: z.string(),
  is_recommended: z.boolean(),
  category: categorySchema,
  cashback: cashbackSchema,
  subscription_benefits: z.array(subscriptionBenefitSchema),
  is_liked: z.boolean(),
});

export const cashbackHistoryOutputSchema = z.object({
  id: z.number(),
  client: z.number(),
  amount: z.number(),
  status: z.enum(['pending', 'credited']),
  subscription: subscriptionSchema,
  invoice_id: z.number(),
  created_at: z.string(),
});

export const paginatedCashbackHistoryOutputSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(cashbackHistoryOutputSchema),
});

export type CashbackHistoryOutputModel = z.infer<
  typeof cashbackHistoryOutputSchema
>;
export type PaginatedCashbackHistoryOutputModel = z.infer<
  typeof paginatedCashbackHistoryOutputSchema
>;
