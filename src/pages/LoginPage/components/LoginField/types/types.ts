import type { Control, FieldValues } from 'react-hook-form';

export interface LoginFieldProps<T extends FieldValues> {
  name: keyof T;
  label: string;
  type?: string;
  control: Control<T>;
  errorMessage?: string;
}
