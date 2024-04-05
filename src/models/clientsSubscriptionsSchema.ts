import { z } from 'zod';
import {
  tariffSchema,
  subscriptionBenefitSchema,
} from './singleSubscriptionSchema';
import { categorySchema } from './categorySchema';

const invoiceSchema = z.object({
  id: z.number(),
  amount: z.number(),
  date: z.string(),
});

export const clientSubscriptionSchema = z.object({
  id: z.number(),
  popularity: z.number(),
  name: z.string(),
  // NOTE: убрала валидацию на url(с бека на моке приходит другой формат)
  image_preview: z.string(),
  image_detail: z.string(),
  description: z.string(),
  is_recommended: z.boolean(),
  category: categorySchema,
  subscription_benefits: z.array(subscriptionBenefitSchema),
});
export type ClientSubscriptionModal = z.infer<typeof clientSubscriptionSchema>;

export const resultSubscriptionSchema = z.object({
  id: z.number(),
  subscription: clientSubscriptionSchema,
  tariff: tariffSchema,
  invoice: invoiceSchema,
  expiration_date: z.string(),
  is_active: z.boolean(),
  is_auto_pay: z.boolean(),
  cashback_amount: z.number(),
  deleted_at: z.string().nullable(),
});

export type ResultSubscriptionModal = z.infer<typeof resultSubscriptionSchema>;
export const clientSubscriptionsSchema = z.object({
  count: z.number(),
  next: z.null().optional(),
  previous: z.null().optional(),
  results: z.array(resultSubscriptionSchema),
});

export type ClientSubscriptionsModal = z.infer<
  typeof clientSubscriptionsSchema
>;
