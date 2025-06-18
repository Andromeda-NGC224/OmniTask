import { z } from 'zod';

export const registerFormSchema = z
  .object({
    email: z.string().email('Невірний формат електронної пошти'),
    password: z.string().min(6, 'Пароль повинен містити щонайменше 6 символів'),
    confirmPassword: z.string(),
    name: z.string().min(1, "Ім'я обов'язкове").optional(),
    surname: z.string().min(1, "Прізвище обов'язкове").optional(),
    // avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  });
