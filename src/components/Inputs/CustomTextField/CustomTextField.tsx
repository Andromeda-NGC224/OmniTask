import { Controller, type FieldValues } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { CustomTextFieldProps } from './types';

export default function CustomTextField<T extends FieldValues>({
  name,
  label,
  type = 'text',
  control,
  errorMessage,
  slotProps,
}: CustomTextFieldProps<T>) {
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
          slotProps={slotProps}
        />
      )}
    />
  );
}
