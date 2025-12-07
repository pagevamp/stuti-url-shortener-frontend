import * as z from 'zod';

export const urlFormValidationSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title can be at most 50 characters'),

  expiresAt: z.coerce
    .date()
    .min(1, { message: 'Expiry Date is required' })
    .refine((data) => data > new Date(), {
      message: 'The Expiry Date must be in the future',
    }),

  originalURL: z.url().optional(),
});
