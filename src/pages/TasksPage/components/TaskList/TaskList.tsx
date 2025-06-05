import { useEffect, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { getTasks } from 'api/services/taskService';
import { Loader } from 'components/Loader';
import { TaskCard } from '../../components';
import type { Task } from 'types/tasks';
import type { TaskListProps } from './types';
import { filterTasks, searchTasks, sortTasks } from './utils';

export default function TaskList({
  viewMode,
  filter,
  sort,
  searchQuery,
}: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading tasks:', error);
        setLoading(false);
      });
  }, []);

  const filteredTasks = useMemo(() => {
    let result = filterTasks(tasks, filter);
    result = searchTasks(result, searchQuery);
    result = sortTasks(result, sort);
    return result;
  }, [tasks, filter, searchQuery, sort]);

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
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  );
}
