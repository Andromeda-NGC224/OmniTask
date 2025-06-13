import type { ErrorToHandle } from 'api/types';
import axios from 'axios';

export const getErrorMessage = (error: ErrorToHandle): string => {
  if (axios.isAxiosError(error)) {

    return error.response?.data?.message || error.message;

    return error.response?.data?.message;
  }

  return error.message;
};
