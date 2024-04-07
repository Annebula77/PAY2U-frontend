import { z } from 'zod';

export const loginRequestSchema = z.object({
  id: z.number().int(),
});
export type LoginRequestModel = z.infer<typeof loginRequestSchema>;

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
export type LoginResponseModel = z.infer<typeof loginResponseSchema>;
