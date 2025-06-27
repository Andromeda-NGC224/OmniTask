import type { Task, TaskStatus } from 'types/tasks';

export interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
}

export interface ChangeTaskStatusModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (newStatus: TaskStatus) => void;
  currentStatus: TaskStatus;
}

export interface DeleteTaskModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    id: number,
    title: string,
    description: string,
    status: TaskStatus,
  ) => void;
  task: Task | null;
}
