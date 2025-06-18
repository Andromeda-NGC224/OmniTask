import { toast } from 'react-hot-toast';
import { toastStyles } from 'styles/toastStyles';

export const showToast = {
  success: (message: string) => toast.success(message, { style: toastStyles }),

  error: (message: string) => toast.error(message, { style: toastStyles }),
};
