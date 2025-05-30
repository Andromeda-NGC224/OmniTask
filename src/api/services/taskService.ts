import { tasks } from '../mock/tasks';
import type { Task } from '../../types/tasks';

export const getTasks = (): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 500);
  });
};
