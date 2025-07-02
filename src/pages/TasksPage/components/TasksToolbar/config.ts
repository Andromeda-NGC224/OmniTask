import { TaskFilter, TaskSort } from 'pages/TasksPage/types';

export const filterOptionsConfig: { labelKey: string; value: TaskFilter }[] = [
  { labelKey: 'toolbar.filter.all', value: TaskFilter.All },
  { labelKey: 'toolbar.filter.completed', value: TaskFilter.Completed },
  { labelKey: 'toolbar.filter.pending', value: TaskFilter.Pending },
  { labelKey: 'toolbar.filter.in_progress', value: TaskFilter.InProgress },
];

export const sortOptionsConfig: { labelKey: string; value: TaskSort }[] = [
  { labelKey: 'toolbar.sort.created_at_desc', value: TaskSort.CreatedAtDesc },
  { labelKey: 'toolbar.sort.created_at_asc', value: TaskSort.CreatedAtAsc },
  { labelKey: 'toolbar.sort.titleAsc', value: TaskSort.TitleAsc },
  { labelKey: 'toolbar.sort.titleDesc', value: TaskSort.TitleDesc },
];
