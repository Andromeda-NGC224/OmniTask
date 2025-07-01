import { z } from 'zod';
import { useTranslation } from 'react-i18next';

export const useLoginSchema = () => {
  const { t } = useTranslation('login_page');

  const loginSchema = z.object({
    email: z.string().email(t('schema.email')),
    password: z.string().min(6, t('schema.password')),
  });

  return loginSchema;
};
