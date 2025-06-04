import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Невірний формат електронної пошти'),
  password: z.string().min(6, 'Пароль повинен містити щонайменше 6 символів'),
});
