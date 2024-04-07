import { z } from 'zod';

export const autoPayQueryParamsSchema = z.object({
  subscription_id: z.number().int(),
});

export const autoPaysRequestSchema = z.object({
  is_auto_pay: z.boolean(),
});

export type AutoPayQueryParamsModel = z.infer<typeof autoPayQueryParamsSchema>;
export type AutoPaysRequestModel = z.infer<typeof autoPaysRequestSchema>;
