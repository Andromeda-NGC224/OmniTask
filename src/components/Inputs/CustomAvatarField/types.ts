import type { Path, Control, FieldValues } from 'react-hook-form';

export interface CustomAvatarFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
}
