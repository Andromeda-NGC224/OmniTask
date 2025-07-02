import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { isValidBirthday } from 'pages/RegisterPage/utils';

export const useEditProfileSchema = () => {
  const { t } = useTranslation('profile_page');

  const editProfileSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z
      .union([
        z.string().email(t('editProfileModal.schema.email')),
        z.literal(''),
      ])
      .optional(),
    birthday: z
      .union([
        z
          .string()
          .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            t('editProfileModal.schema.birthday_format'),
          )
          .refine(isValidBirthday, t('editProfileModal.schema.birthday_valid')),
        z.literal(''),
      ])
      .optional(),
    avatar: z.any().optional(),
  });

  return editProfileSchema;
};
