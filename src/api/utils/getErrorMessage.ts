import axios from 'axios';
import type { ErrorToHandle } from 'api/types';

export const getErrorMessage = (error: ErrorToHandle): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
};
