import type { ErrorToHandle } from 'api/types';
import axios from 'axios';

export const getErrorStatusCode = (
  error: ErrorToHandle,
): number | undefined => {
  if (axios.isAxiosError(error)) {
    return error.response?.status;
  }
  return undefined;
};
