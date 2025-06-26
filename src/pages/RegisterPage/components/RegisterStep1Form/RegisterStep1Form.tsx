import { useFormContext } from 'react-hook-form';
import type { RegisterFormInputs } from '../../types';
import { Button, CircularProgress, Stack } from '@mui/material';
import type { RegisterStep1FormProps } from './types';
import { useTranslation } from 'react-i18next';
import { CustomTextField } from 'components/Inputs';

export default function RegisterStep1Form({
  onNext,
  isLoading,
}: RegisterStep1FormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormInputs>();

  const { t } = useTranslation('register_page');

  return (
    <Stack spacing={2}>
      <CustomTextField
        name='email'
        label={t('email_placeholder')}
        type='email'
        control={control}
        errorMessage={errors.email?.message}
      />
      <CustomTextField
        name='password'
        label={t('password_placeholder')}
        type='password'
        control={control}
        errorMessage={errors.password?.message}
      />
      <CustomTextField
        name='confirmPassword'
        label={t('password_confirmation_placeholder')}
        type='password'
        control={control}
        errorMessage={errors.confirmPassword?.message}
      />
      <Button
        type='button'
        onClick={onNext}
        disabled={isLoading}
        variant='contained'
        color='primary'
        fullWidth
      >
        {isLoading ? (
          <CircularProgress size={24} color='primary' />
        ) : (
          t('button_next_step')
        )}
      </Button>
    </Stack>
  );
}
