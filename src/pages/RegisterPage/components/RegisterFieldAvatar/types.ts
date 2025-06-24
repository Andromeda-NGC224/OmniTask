import type { Path, Control, FieldValues } from 'react-hook-form';

export interface RegisterFieldAvatarProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errorMessage?: string;
}
