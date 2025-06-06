import { useFormContext } from 'react-hook-form';
import type { RegisterFormInputs } from '../../types';
import { Button, Stack } from '@mui/material';
import { RegisterField } from '../../components';
import type { RegisterStep1FormProps } from './types';
import { useTranslation } from 'react-i18next';

export default function RegisterStep1Form({
  onNext,
  isSubmitting,
}: RegisterStep1FormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormInputs>();

  const { t } = useTranslation('register_page');

  return (
    <Stack spacing={2}>
      <RegisterField
        name='email'
        label={t('email_placeholder')}
        type='email'
        control={control}
        errorMessage={errors.email?.message}
      />
      <RegisterField
        name='password'
        label={t('password_placeholder')}
        type='password'
        control={control}
        errorMessage={errors.password?.message}
      />
      <RegisterField
        name='confirmPassword'
        label={t('password_confirmation_placeholder')}
        type='password'
        control={control}
        errorMessage={errors.confirmPassword?.message}
      />
      <Button
        type='button'
        onClick={onNext}
        disabled={isSubmitting}
        variant='contained'
        color='primary'
        fullWidth
      >
        {t('button_next_step')}
      </Button>
    </Stack>
  );
}
