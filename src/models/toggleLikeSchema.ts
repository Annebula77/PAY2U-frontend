import { z } from 'zod';

export const toggleLikeSchema = z.object({
  subscription: z.number().int(),
});
export type ToggleLikeModel = z.infer<typeof toggleLikeSchema>;
