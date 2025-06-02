import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import type { Task } from 'types/tasks';
import { getTasks } from 'api/services/taskService';
import { TaskCard } from '../../components';
import type { TaskListProps } from './types';
import { Loader } from 'components/Loader';

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

  if (loading) return <Loader />;

  let filteredTasks = tasks;
  if (filter === 'completed') {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filter === 'pending') {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  if (searchQuery) {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }

  if (sort === 'completed-asc') {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (a.completed && !b.completed) return -1;
      if (!a.completed && b.completed) return 1;
      return 0;
    });
  } else if (sort === 'completed-desc') {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return 0;
    });
  } else if (sort === 'createdAt-desc') {
    filteredTasks = [...filteredTasks].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } else if (sort === 'createdAt-asc') {
    filteredTasks = [...filteredTasks].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  } else if (sort === 'title-asc') {
    filteredTasks = [...filteredTasks].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }

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
