import { useFormContext } from 'react-hook-form';
import type { RegisterFormInputs } from '../../types';
import { Button, CircularProgress, Stack } from '@mui/material';
import { RegisterField, RegisterFieldAvatar } from '../../components';
import type { RegisterStep2FormProps } from './types';
import { useTranslation } from 'react-i18next';
import { getFieldError } from './utils';

export default function RegisterStep2Form({
  onBack,
  isLoading,
}: RegisterStep2FormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormInputs>();

  const { t } = useTranslation('register_page');

  return (
    <Stack spacing={2}>
      <RegisterField
        name='name'
        label={t('name_placeholder')}
        control={control}
        errorMessage={errors.name?.message}
      />
      <RegisterField
        name='surname'
        label={t('surname_placeholder')}
        control={control}
        errorMessage={errors.surname?.message}
      />
      <RegisterField
        name='birthday'
        label={t('date_of_birth_placeholder')}
        control={control}
        type='date'
        errorMessage={errors.birthday?.message}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />

      <RegisterFieldAvatar
        name='avatar'
        control={control}
        errorMessage={getFieldError(errors.avatar)}
      />
      <Button
        type='submit'
        disabled={isLoading}
        variant='contained'
        color='primary'
        fullWidth
      >
        {isLoading ? (
          <CircularProgress size={24} color='primary' />
        ) : (
          t('button_finish')
        )}
      </Button>
      <Button
        type='button'
        onClick={onBack}
        variant='outlined'
        color='primary'
        fullWidth
      >
        {t('button_back')}
      </Button>
    </Stack>
  );
}
