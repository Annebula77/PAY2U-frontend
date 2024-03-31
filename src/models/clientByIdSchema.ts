import { z } from 'zod';

export const clientByIdSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  patronymic: z.string(),
  email: z.string().email(),
  phone: z.string(),
  subscriptions_count: z.number(),
  month_cashback: z.number(),
});

export type ClientByIdModel = z.infer<typeof clientByIdSchema>;
