import type { ErrorToHandle } from 'api/types';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getErrorMessage } from './getErrorMessage';
import { toastErrorStyles } from 'styles/toastStyles';
// import { getErrorStatusCode } from './getErrorStatusCode';

export const errorHandler = (
  error: ErrorToHandle,
  displayErrorMessage = true,
): void => {
  const isCancelError = axios.isCancel(error);
  const errorMessage = getErrorMessage(error);
  // const statusCode = getErrorStatusCode(error);

  if (displayErrorMessage && !isCancelError)
    toast.error(errorMessage, {
      style: toastErrorStyles,
    });

  // if (statusCode === 401) {
  //   Logout()
  // }
  console.error(error);
};
