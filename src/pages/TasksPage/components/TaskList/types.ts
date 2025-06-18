import type { ViewMode } from 'pages/TasksPage/types';
import type { Task } from 'types/tasks';

export type TaskListProps = {
  viewMode: ViewMode;
  tasks: Task[];
  loading: boolean;
  error: boolean | null;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
  onDetails: (task: Task) => void;
  onEdit: (task: Task) => void;
};
