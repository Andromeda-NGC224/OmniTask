import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import type { Task } from 'types/tasks';
import type { TaskListProps } from './types';
import { useSearchParams } from 'react-router-dom';

import { taskService } from 'api/services';
import { errorHandler } from 'api/utils/errorHandler';
import type { ErrorToHandle } from 'api/types';
import { EmptyTaskList } from '../EmptyTaskList';

import { ErrorTaskList } from '../ErrorTaskList';
import {
  SkeletonTaskCardGrid,
  SkeletonTaskCardList,
} from '../TaskCard/skeleton';
import { TaskCard } from '../TaskCard';
import { getQueryParams } from 'api/services/taskService/utils';

export default function TaskList({ viewMode, refreshKey }: TaskListProps) {
  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  const { order, sortBy, per_page, page, search } =
    getQueryParams(searchParams);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTasks = async () => {
      setLoading(true);

      try {
        const response = await taskService.getTasks(
          { order, sortBy, per_page, page, search },
          controller.signal,
        );

        setTasks(response.data);

        setError(null);

        console.log('Fetched tasks:', response);
      } catch (err) {
        setError(true);
        errorHandler(err as ErrorToHandle);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      controller.abort();
    };
  }, [order, page, per_page, sortBy, search, refreshKey]);

  if (loading) {
    return (
      <Box
        display={viewMode === 'grid' ? 'grid' : 'flex'}
        gridTemplateColumns={
          viewMode === 'grid'
            ? 'repeat(auto-fill, minmax(285px, 1fr))'
            : undefined
        }
        flexDirection={viewMode === 'list' ? 'column' : undefined}
        gap={2}
      >
        {Array.from({ length: 6 }).map((_, i) =>
          viewMode === 'grid' ? (
            <SkeletonTaskCardGrid key={i} />
          ) : (
            <SkeletonTaskCardList key={i} />
          ),
        )}
      </Box>
    );
  }

  if (error) {
    return <ErrorTaskList />;
  }

  if (tasks.length === 0) return <EmptyTaskList />;

  return (
    <Box
      display={viewMode === 'grid' ? 'grid' : 'flex'}
      gridTemplateColumns={
        viewMode === 'grid'
          ? 'repeat(auto-fill, minmax(285px, 1fr))'
          : undefined
      }
      flexDirection={viewMode === 'list' ? 'column' : undefined}
      gap={2}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  );
}
