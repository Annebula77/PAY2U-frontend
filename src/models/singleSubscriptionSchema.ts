import { z } from 'zod';
import { categorySchema } from './categorySchema';

const cashbackSchema = z.object({
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

const subscriptionBenefitSchema = z.object({
  id: z.number(),
  icon: z.string(),
  benefit: z.string(),
});

export const singleSubscriptionSchema = z.object({
  id: z.number(),
  name: z.string(),
  image_preview: z.string().url(),
  image_detail: z.string().url(),
  description: z.string(),
  is_recommended: z.boolean(),
  category: categorySchema,
  cashback: cashbackSchema,
  tariffs: z.array(tariffSchema),
  subscription_benefits: z.array(subscriptionBenefitSchema),
});
export type SingleSubScriptionModel = z.infer<typeof singleSubscriptionSchema>;
