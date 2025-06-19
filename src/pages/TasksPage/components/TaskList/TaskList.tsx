import { Alert, Box } from '@mui/material';

import type { TaskListProps } from './types';

import { EmptyTaskList } from '../EmptyTaskList';
import { ErrorTaskList } from '../ErrorTaskList';

import { TaskCard } from '../TaskCard';
import { SkeletonWrapper } from '../TaskCard/skeleton';
import { ViewMode } from 'pages/TasksPage/types';
import { useTranslation } from 'react-i18next';
import { FailedToLoad } from '../FailedToLoad';

export default function TaskList({
  viewMode,
  tasks,
  loading,
  error,
  onDelete,
  onComplete,
  onDetails,
  onEdit,
  lastElementRef,
  hasMore,
  onRetry,
}: TaskListProps) {
  const { t } = useTranslation('tasks_page');

  if (error && tasks.length === 0) {
    return <ErrorTaskList />;
  }

  if (loading && tasks.length === 0) {
    return <SkeletonWrapper viewMode={viewMode} />;
  }

  if (tasks.length === 0 && !loading) {
    return <EmptyTaskList />;
  }

  return (
    <>
      <Box
        display={viewMode === ViewMode.Grid ? 'grid' : 'flex'}
        gridTemplateColumns={
          viewMode === ViewMode.Grid
            ? 'repeat(auto-fill, minmax(285px, 1fr))'
            : undefined
        }
        flexDirection={viewMode === ViewMode.List ? 'column' : undefined}
        gap={2}
        mb={2}
      >
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onComplete={onComplete}
              onDetails={onDetails}
              onEdit={onEdit}
            />
          );
        })}
      </Box>

      <div style={{ height: '1px' }} ref={lastElementRef} />

      {loading && <SkeletonWrapper viewMode={viewMode} />}

      {error && tasks.length > 0 && hasMore && (
        <FailedToLoad onRetry={onRetry} />
      )}

      {!hasMore && (
        <Alert severity='info' variant='filled' sx={{ mt: 2 }}>
          {t('taskList.noTasks')}
        </Alert>
      )}
    </>
  );
}
