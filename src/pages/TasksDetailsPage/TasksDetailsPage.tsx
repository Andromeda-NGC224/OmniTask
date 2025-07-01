import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Task } from 'types/tasks';
import { Box, Alert, Paper, Divider } from '@mui/material';
import { errorHandler } from 'api/utils';
import { Loader } from 'components/Loader';
import { TasksService } from 'api/services';
import { useTranslation } from 'react-i18next';
import {
  TaskAuthorInfo,
  TaskDescription,
  TaskDetailsHeader,
} from './components';

export default function TasksDetailsPage() {
  const { id } = useParams() as { id: string };
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation('tasks_details_page');

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);

      try {
        const response = await TasksService.getTaskById(id);
        setTask(response.data);
      } catch (err) {
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

  if (!task) {
    return (
      <Alert severity='info' sx={{ mt: 4 }}>
        {t('taskNotFound')}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 8,
          boxShadow: 6,
        }}
      >
        <TaskDetailsHeader
          title={task.title}
          status={task.status}
          createdAt={task.createdAt}
          updatedAt={task.updatedAt}
        />

        <Divider sx={{ my: 3 }} />

        <TaskDescription description={task.description} />

        <TaskAuthorInfo author={task.author} />
      </Paper>
    </Box>
  );
}
