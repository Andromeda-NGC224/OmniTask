import { ViewMode } from 'pages/TasksPage/types';

export interface TasksToolbarProps {
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  onTaskAdded: () => void;
}
