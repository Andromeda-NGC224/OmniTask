import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import type { Task } from 'types/tasks';
import { getTasks } from 'api/services/taskService';
import TaskCard from '../TaskCard/TaskCard';

export default function TaskList() {
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

  if (loading) return <p>Loading tasks...</p>;

  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(auto-fill, minmax(280px, 1fr))'
      gap={2}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  );
}
