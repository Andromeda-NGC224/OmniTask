import { useFormContext } from 'react-hook-form';
import type { RegisterFormInputs } from '../../types';
import { Button, Stack } from '@mui/material';
import { RegisterField } from '../../components';
import type { RegisterStep1FormProps } from './types';

export default function RegisterStep1Form({
  onNext,
  isSubmitting,
}: RegisterStep1FormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterFormInputs>();

  return (
    <Stack spacing={2}>
      <RegisterField
        name='email'
        label='Електронна пошта'
        type='email'
        control={control}
        errorMessage={errors.email?.message}
      />
      <RegisterField
        name='password'
        label='Пароль'
        type='password'
        control={control}
        errorMessage={errors.password?.message}
      />
      <RegisterField
        name='confirmPassword'
        label='Підтвердіть пароль'
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
        Наступний крок
      </Button>
    </Stack>
  );
}
