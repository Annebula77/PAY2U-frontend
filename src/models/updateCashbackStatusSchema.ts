import { z } from 'zod';

export const statusQueryParamsSchema = z.object({
  cashback_id: z.number().int(),
});

export const statusRequestBodySchema = z.object({
  status: z.enum(['cancelled', 'pending', 'credited']),
});

export type StatusQueryParamsModel = z.infer<typeof statusQueryParamsSchema>;
export type StatusRequestBodyModel = z.infer<typeof statusRequestBodySchema>;
