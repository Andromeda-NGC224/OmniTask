import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Loader } from 'components/Loader';
import { EmptyTaskList, TaskCard } from '../../components';
import type { Task } from 'types/tasks';
import type { TaskListProps } from './types';
import { useSearchParams } from 'react-router-dom';
import { getQueryParams } from 'utils';
import { taskService } from 'api/services';
import { errorHandler } from 'api/utils/errorHandler';
import type { ErrorToHandle } from 'api/types';

export default function TaskList({ viewMode }: TaskListProps) {
  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const { order, sortBy, per_page, page, search } =
    getQueryParams(searchParams);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTasks = async () => {
      setLoading(true);

      try {
        const response = await taskService.getTasks(
          {
            order,
            sortBy,
            per_page,
            page,
            search,
          },
          controller.signal,
        );

        setTasks(response.data);

        console.log('Fetched tasks:', response);
      } catch (err) {
        errorHandler(err as ErrorToHandle);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      controller.abort();
    };
  }, [order, page, per_page, sortBy, search]);

  if (loading) return <Loader />;

  if (tasks.length === 0) return <EmptyTaskList />;

  return (
    <Box
      display={viewMode === 'grid' ? 'grid' : 'flex'}
      gridTemplateColumns={
        viewMode === 'grid'
          ? 'repeat(auto-fill, minmax(280px, 1fr))'
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
