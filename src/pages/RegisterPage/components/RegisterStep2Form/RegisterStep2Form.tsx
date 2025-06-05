import { useFormContext } from 'react-hook-form';
import type { RegisterFormInputs } from '../../types';
import { Button, Stack } from '@mui/material';
import { RegisterField } from '../../components';
import type { RegisterStep2FormProps } from './types';

export default function RegisterStep2Form({
  onBack,
  isSubmitting,
}: RegisterStep2FormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormInputs>();

  return (
    <Stack spacing={2}>
      <RegisterField
        name='name'
        label="Ім'я"
        control={control}
        errorMessage={errors.name?.message}
      />
      <RegisterField
        name='surname'
        label='Прізвище'
        control={control}
        errorMessage={errors.surname?.message}
      />
      <RegisterField
        name='avatar'
        label='Аватар (посилання)'
        control={control}
        errorMessage={errors.avatar?.message}
      />
      <Button
        type='submit'
        disabled={isSubmitting}
        variant='contained'
        color='primary'
        fullWidth
      >
        Завершити реєстрацію
      </Button>
      <Button
        type='button'
        onClick={onBack}
        variant='outlined'
        color='primary'
        fullWidth
      >
        Назад
      </Button>
    </Stack>
  );
}
