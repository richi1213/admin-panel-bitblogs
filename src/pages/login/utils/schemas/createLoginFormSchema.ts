import { z } from 'zod';

export const createLoginFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({
      message: t('valid-email'),
    }),
    password: z
      .string()
      .min(1, { message: t('password-required') })
      .min(8, { message: t('password-min') }),
  });
