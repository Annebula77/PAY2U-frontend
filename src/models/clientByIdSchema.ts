import { z } from 'zod';

export const accountSchema = z.object({
  name: z.string(),
  number: z.string(),
  balance: z.number(),
});

export type AccountModel = z.infer<typeof accountSchema>;

export const clientByIdSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  patronymic: z.string(),
  email: z.string().email(),
  phone: z.string(),
  subscriptions_count: z.number(),
  month_cashback: z.number().nullable(),
  bank_accounts: z.array(accountSchema),
});

export type ClientByIdModel = z.infer<typeof clientByIdSchema>;
