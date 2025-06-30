import { z } from 'zod';
import type { useRegisterSchema } from '../hooks';

export type RegisterFormInputs = z.infer<ReturnType<typeof useRegisterSchema>>;
