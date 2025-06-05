import { z } from 'zod';
import type { registerFormSchema } from '../config';

export type RegisterFormInputs = z.infer<typeof registerFormSchema>;
