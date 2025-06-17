import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { taskService } from 'api/services/TaskService/taskService';
import type { Task } from 'types/tasks';
import { Box, Typography, Alert } from '@mui/material';
import { errorHandler } from 'api/utils';
import { Loader } from 'components/Loader';

export default function TasksDetailsPage() {
  const { id } = useParams() as { id: string };
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await taskService.getTaskById(id);
        console.log('response', response);

        setTask(response.data);
      } catch (err) {
        setError('Failed to fetch task details.');
        errorHandler(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert severity='error' sx={{ mt: 4 }}>
        Error
      </Alert>
    );
  }

  if (!task) {
    return (
      <Alert severity='info' sx={{ mt: 4 }}>
        Task not found.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        {task.title}
      </Typography>
      <Typography variant='body1' color='text.secondary' paragraph>
        {task.description}
      </Typography>
      <Typography variant='caption' color='text.disabled'>
        Created at: {new Date(task.createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
}
