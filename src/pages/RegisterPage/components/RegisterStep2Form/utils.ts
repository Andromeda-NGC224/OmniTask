import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  FieldValues,
} from 'react-hook-form';

export function getFieldError<TFieldValues extends FieldValues = FieldValues>(
  error:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<TFieldValues>>
    | undefined,
): string | undefined {
  if (!error) return undefined;
  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return undefined;
}
