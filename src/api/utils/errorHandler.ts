import type { ErrorToHandle } from 'api/types';
import axios from 'axios';
import { getErrorMessage } from './getErrorMessage';
import { showToast } from 'utils/toast';

// import { getErrorStatusCode } from './getErrorStatusCode';

export const errorHandler = (
  error: ErrorToHandle,
  displayErrorMessage = true,
): void => {
  const isCancelError = axios.isCancel(error);
  const errorMessage = getErrorMessage(error);
  // const statusCode = getErrorStatusCode(error);

  if (displayErrorMessage && !isCancelError) showToast.error(errorMessage);

  // if (statusCode === 401) {
  //   Logout()
  // }
  console.error(error);
};
