import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { LoginFieldProps } from './types';

export default function LoginField({
  name,
  label,
  type = 'text',
  control,
  errorMessage,
}: LoginFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          value={field.value ?? ''}
          type={type}
          label={label}
          fullWidth
          variant='outlined'
          size='small'
          error={!!errorMessage}
          helperText={errorMessage}
        />
      )}
    />
  );
}
