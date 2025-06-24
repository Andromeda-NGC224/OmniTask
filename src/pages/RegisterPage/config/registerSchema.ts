import { z } from 'zod';
import { isValidBirthday } from './utils';

export const registerFormSchema = z
  .object({
    email: z.string().email('Невірний формат електронної пошти'),
    password: z.string().min(6, 'Пароль повинен містити щонайменше 6 символів'),
    confirmPassword: z.string(),
    name: z.string().optional(),
    surname: z.string().optional(),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Дата повинна бути у форматі YYYY-MM-DD')
      .optional()
      .refine(isValidBirthday, 'Недійсна дата народження'),
    avatar: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  });
