import { TaskFilter, TaskSort, ViewMode } from 'pages/TasksPage/types';

export interface TasksToolbarProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  onFilterChange: (filter: TaskFilter) => void;
  onSortChange: (sort: TaskSort) => void;
  onSearchChange: (searchQuery: string) => void;
}
