import { z } from 'zod';
import { tariffSchema, singleSubscriptionSchema } from './singleSubscriptionSchema';


const invoiceSchema = z.object({
  id: z.number(),
  amount: z.number(),
  date: z.string(),
});

const clientSubscriptionSchema = z.object({
  id: z.number(),
  subscription: singleSubscriptionSchema,
  tariff: tariffSchema,
  invoice: invoiceSchema,
  expiration_date: z.string(),
  is_active: z.boolean(),
  is_liked: z.boolean(),
});

export const clientSubscriptionsSchema = z.object({
  count: z.number(),
  next: z.null().optional(),
  previous: z.null().optional(),
  results: z.array(clientSubscriptionSchema),
});

export type ClientSubscriptionsModal = z.infer<typeof clientSubscriptionsSchema>;
