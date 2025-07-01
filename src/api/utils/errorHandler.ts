import type { ErrorToHandle } from 'api/types';
import axios from 'axios';
import { getErrorMessage } from './getErrorMessage';
import { showToast } from 'utils/toast';

export const errorHandler = (
  error: ErrorToHandle,
  displayErrorMessage = true,
): void => {
  const isCancelError = axios.isCancel(error);
  const errorMessage = getErrorMessage(error);

  if (displayErrorMessage && !isCancelError) showToast.error(errorMessage);

  console.error(error);
};
