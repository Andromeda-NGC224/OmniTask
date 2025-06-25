import type { Task } from 'types/tasks';

export interface TasksStatsProps {
  tasks?: Task[];
  total: number;
}
