import type { TasksStatsResponse } from 'api/services/TasksService/types';

export interface TasksStatsProps {
  tasksStats: TasksStatsResponse | null;
}
