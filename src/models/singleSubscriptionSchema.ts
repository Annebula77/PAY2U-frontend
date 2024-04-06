import { z } from 'zod';
import { categorySchema } from './categorySchema';

export const cashbackSchema = z.object({
  id: z.number(),
  amount: z.number(),
});

export const tariffSchema = z.object({
  id: z.number(),
  name: z.string(),
  days_amount: z.number(),
  amount: z.number(),
  description: z.string(),
});

export type TariffModel = z.infer<typeof tariffSchema>;

export const subscriptionBenefitSchema = z.object({
  id: z.number(),
  icon: z.string(),
  benefit: z.string(),
});

export const singleSubscriptionSchema = z.object({
  id: z.number(),
  popularity: z.number(),
  name: z.string(),
  // NOTE: убрала валидацию на url(с бека на моке приходит другой формат)
  image_preview: z.string(),
  image_detail: z.string(),
  description: z.string(),
  is_recommended: z.boolean(),
  category: categorySchema,
  cashback: cashbackSchema,
  tariffs: z.array(tariffSchema),
  subscription_benefits: z.array(subscriptionBenefitSchema),
  is_liked: z.boolean(),
});
export type SingleSubScriptionModel = z.infer<typeof singleSubscriptionSchema>;
