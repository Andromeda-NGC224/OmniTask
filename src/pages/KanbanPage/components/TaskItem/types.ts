import { type SortActivatorProps } from 'pages/KanbanPage/types/dnd';
import { type Task } from 'types/tasks';

export interface TaskItemProps {
  task: Task;
  sortActivatorProps?: SortActivatorProps;
}
