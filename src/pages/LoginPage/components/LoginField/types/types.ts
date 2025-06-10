import type { Control } from 'react-hook-form';
import type { LoginFormInputs } from 'pages/LoginPage/types';

export interface LoginFieldProps {
  name: keyof LoginFormInputs;
  label: string;
  type?: string;
  control: Control<LoginFormInputs>;
  errorMessage?: string;
}
