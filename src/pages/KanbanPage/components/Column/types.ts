import { TaskStatus, type Task } from 'types/tasks';

export interface ColumnProps {
  title: TaskStatus;
  tasks: Task[];
}
