import type { TaskFilter, TaskSort, ViewMode } from 'pages/TasksPage/types';

export type TaskListProps = {
  viewMode: ViewMode;
  filter: TaskFilter;
  sort: TaskSort;
  searchQuery: string;
};
