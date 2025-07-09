import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Task } from 'types/tasks';
import {
  Box,
  Alert,
  Paper,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material';
import { errorHandler } from 'api/utils';
import { Loader } from 'components/Loader';
import { TasksService } from 'api/services';
import { useTranslation } from 'react-i18next';
import type { SerializedEditorState } from 'lexical';
import {
  TaskAuthorInfo,
  TaskDescription,
  TaskDetailsHeader,
} from './components';
import { showToast } from 'utils/toast';
import { debounce } from 'utils/debounce';

export default function TasksDetailsPage() {
  const { id } = useParams() as { id: string };
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [editorContent, setEditorContent] =
    useState<SerializedEditorState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation('tasks_details_page');

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);

      try {
        const response = await TasksService.getTaskById(id);
        setTask(response.data);
        setEditorContent(response.data.richEditorData);
      } catch (err) {
        errorHandler(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDescriptionChange = debounce((content: SerializedEditorState) => {
    setEditorContent(content);
  }, 500);

  const handleUpdateDescription = async () => {
    if (!task || !editorContent) return;

    setIsLoading(true);
    try {
      await TasksService.updateTask(`${task.id}`, {
        richEditorData: editorContent,
      });
      showToast.success(t('success_message'));
    } catch (err) {
      errorHandler(err);
    } finally {
      setIsLoading(false);
    }
  };

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

        <TaskDescription
          description={task.description}
          onChange={handleDescriptionChange}
          value={editorContent}
        />
        <Button
          variant='contained'
          onClick={handleUpdateDescription}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color='primary' />
          ) : (
            t('rich_button')
          )}
        </Button>

        <TaskAuthorInfo author={task.author} />
      </Paper>
    </Box>
  );
}
