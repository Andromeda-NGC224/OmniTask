import { Controller, type FieldValues } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { RegisterFieldProps } from './types';

export default function RegisterField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  control,
  errorMessage,
}: RegisterFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
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
