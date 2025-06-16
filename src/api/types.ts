import type { AxiosError } from 'axios';

export type ErrorToHandle = Error | AxiosError<{ message?: string }> | unknown;
