import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { Task } from 'types/tasks';
import type { TaskListProps } from './types';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { taskService } from 'api/services';
import { errorHandler } from 'api/utils/errorHandler';
import { EmptyTaskList } from '../EmptyTaskList';
import { ErrorTaskList } from '../ErrorTaskList';

import { TaskCard } from '../TaskCard';
import { getQueryParams } from 'api/services/taskService/utils';
import { DeleteTaskModal, CompleteTaskModal, EditTaskModal } from '../modals';
import { toastStyles } from 'styles/toastStyles';
import { useTranslation } from 'react-i18next';
import { SkeletonWrapper } from '../TaskCard/skeleton';
import { ViewMode } from 'pages/TasksPage/types';
import { isCancel } from 'axios';

export default function TaskList({ viewMode, refreshKey }: TaskListProps) {
  const { t } = useTranslation('tasks_page');

  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { order, sortBy, per_page, page, search } =
    getQueryParams(searchParams);

  const navigate = useNavigate();

  const handleOpenDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedTask(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask) return;

    try {
      await taskService.deleteTask(String(selectedTask.id));
      toast.success(t('deleteTaskModal.successMessage'), {
        style: toastStyles,
      });
      setTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
    } catch (err) {
      errorHandler(err);
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleOpenCompleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsCompleteModalOpen(true);
  };

  const handleCloseCompleteModal = () => {
    setSelectedTask(null);
    setIsCompleteModalOpen(false);
  };

  const handleConfirmComplete = async () => {
    if (!selectedTask) return;

    try {
      await taskService.updateTask(String(selectedTask.id), {
        completed: !selectedTask.completed,
      });

      toast.success(
        selectedTask.completed
          ? t('completeTaskModal.revertedMessage')
          : t('completeTaskModal.successMessage'),
        { style: toastStyles },
      );

      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id
            ? { ...task, completed: !task.completed }
            : task,
        ),
      );
    } catch (err) {
      errorHandler(err);
    } finally {
      handleCloseCompleteModal();
    }
  };

  const handleOpenEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedTask(null);
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = async (
    id: number,
    title: string,
    description: string,
    completed: boolean,
  ) => {
    try {
      const updatedTask = await taskService.updateTask(String(id), {
        title,
        description,
        completed,
      });
      toast.success(t('editTaskModal.successMessage'), {
        style: toastStyles,
      });
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (err) {
      errorHandler(err);
    } finally {
      handleCloseEditModal();
    }
  };

  const handleDetailsClick = (task: Task) => {
    navigate(`/tasks/${task.id}`);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchTasks = async () => {
      setLoading(true);

      try {
        const response = await taskService.getTasks(
          { order, sortBy, per_page, page, search },
          controller.signal,
        );

        if (response.data === null) {
          setTasks([]);
          setError(null);
        } else {
          setTasks(response.data);
          setError(null);
        }

        console.log('Fetched tasks:', response);
      } catch (err) {
        if (isCancel(err)) return;

        setError(true);
        errorHandler(err);
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
    return <SkeletonWrapper viewMode={viewMode} />;
  }

  if (error) {
    return <ErrorTaskList />;
  }

  if (tasks.length === 0) return <EmptyTaskList />;

  return (
    <Box
      display={viewMode === ViewMode.Grid ? 'grid' : 'flex'}
      gridTemplateColumns={
        viewMode === ViewMode.Grid
          ? 'repeat(auto-fill, minmax(285px, 1fr))'
          : undefined
      }
      flexDirection={viewMode === ViewMode.List ? 'column' : undefined}
      gap={2}
    >
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={handleOpenDeleteModal}
          onComplete={handleOpenCompleteModal}
          onDetails={handleDetailsClick}
          onEdit={handleOpenEditModal}
        />
      ))}

      <DeleteTaskModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <CompleteTaskModal
        open={isCompleteModalOpen}
        onClose={handleCloseCompleteModal}
        onConfirm={handleConfirmComplete}
        isAlreadyCompleted={selectedTask?.completed || false}
      />

      <EditTaskModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        task={selectedTask}
      />
    </Box>
  );
}
