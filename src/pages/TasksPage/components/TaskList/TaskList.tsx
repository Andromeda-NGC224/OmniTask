import { Box } from '@mui/material';

import type { TaskListProps } from './types';

import { EmptyTaskList } from '../EmptyTaskList';
import { ErrorTaskList } from '../ErrorTaskList';

import { TaskCard } from '../TaskCard';
import { SkeletonWrapper } from '../TaskCard/skeleton';
import { ViewMode } from 'pages/TasksPage/types';

export default function TaskList({
  viewMode,
  tasks,
  loading,
  error,
  onDelete,
  onComplete,
  onDetails,
  onEdit,
}: TaskListProps) {
  if (loading) {
    return <SkeletonWrapper viewMode={viewMode} />;
  }

  if (error) {
    return <ErrorTaskList />;
  }

  if (tasks.length === 0) return <EmptyTaskList />;

  return (
    <Box
      display={viewMode === ViewMode.Grid ? 'grid' : 'flex'}
      gridTemplateColumns={
        viewMode === ViewMode.Grid
          ? 'repeat(auto-fill, minmax(285px, 1fr))'
          : undefined
      }
      flexDirection={viewMode === ViewMode.List ? 'column' : undefined}
      gap={2}
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
          onDetails={onDetails}
          onEdit={onEdit}
        />
      ))}
    </Box>
  );
}
