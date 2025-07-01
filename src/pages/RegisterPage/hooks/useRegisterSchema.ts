import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { isValidBirthday } from '../utils';

export const useRegisterSchema = () => {
  const { t } = useTranslation('register_page');

  const registerSchema = z
    .object({
      email: z.string().email(t('schema.email')),
      password: z.string().min(6, t('schema.password')),
      confirmPassword: z.string(),
      name: z.string().optional(),
      surname: z.string().optional(),
      birthday: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, t('schema.birthday_format'))
        .optional()
        .refine(isValidBirthday, t('schema.birthday_valid')),
      avatar: z.any().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('schema.confirmPassword'),
      path: ['confirmPassword'],
    });

  return registerSchema;
};
