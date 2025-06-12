import type { Task } from 'types/tasks';

export interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
}

export interface CompleteTaskModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
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
    completed: boolean,
  ) => void;
  task: Task | null;
}

export interface TaskDetailsModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}
