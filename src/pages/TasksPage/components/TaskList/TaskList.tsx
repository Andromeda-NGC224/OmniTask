import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Loader } from 'components/Loader';
import { TaskCard } from '../../components';
import type { Task } from 'types/tasks';
import type { TaskListProps } from './types';
// import { filterTasks, searchTasks, sortTasks } from './utils';
import { useSearchParams } from 'react-router-dom';
import { getQueryParams } from 'utils';
import { taskService } from 'api/services';

export default function TaskList({
  viewMode,
  // filter,
  // sort,
  // searchQuery,
}: TaskListProps) {
  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const { order, sortBy, per_page, page, search } =
    getQueryParams(searchParams);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await taskService.getTasks({
          order,
          sortBy,
          per_page,
          page,
          search,
        });
        setTasks(response.data);
        console.log('Fetched tasks:', response);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error loading tasks:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [order, page, per_page, sortBy, search]);

  // const filteredTasks = useMemo(() => {
  //   let result = filterTasks(tasks, filter);
  //   result = searchTasks(result, searchQuery);
  //   result = sortTasks(result, sort);
  //   return result;
  // }, [tasks, filter, searchQuery, sort]);

  if (loading) return <Loader />;

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
