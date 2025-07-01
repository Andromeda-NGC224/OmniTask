import type { User } from 'api/services/UserService';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  author: User;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
