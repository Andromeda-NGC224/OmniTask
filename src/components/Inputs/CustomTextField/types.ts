import type { InputLabelProps, TextFieldProps } from '@mui/material';
import type { Path, Control, FieldValues } from 'react-hook-form';

export interface CustomTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  control: Control<T>;
  errorMessage?: string;
  slotProps?: {
    inputLabel?: Partial<InputLabelProps>;
  } & TextFieldProps['slotProps'];
}
