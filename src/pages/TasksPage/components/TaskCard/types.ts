import type { Task } from 'types/tasks';

export interface TaskCardProps {
  task: Task;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
  onDetails: (task: Task) => void;
  onEdit: (task: Task) => void;
}
