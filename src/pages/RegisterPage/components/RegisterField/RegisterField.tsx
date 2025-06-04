import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import type { Path, Control, FieldValues } from 'react-hook-form';

export interface RegisterFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  control: Control<T>;
  errorMessage?: string;
}

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
