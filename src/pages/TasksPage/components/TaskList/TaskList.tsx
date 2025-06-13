import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import type { Task } from 'types/tasks';
import type { TaskListProps } from './types';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

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
import {
  DeleteTaskModal,
  CompleteTaskModal,
  TaskDetailsModal,
  EditTaskModal,
} from '../modals';
import { toastStyles } from 'styles/toastStyles';
import { useTranslation } from 'react-i18next';

export default function TaskList({ viewMode, refreshKey }: TaskListProps) {
  const { t } = useTranslation('tasks_page');

  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { order, sortBy, per_page, page, search } =
    getQueryParams(searchParams);

  const handleOpenDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedTask(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      try {
        await taskService.deleteTask(String(selectedTask.id));
        toast.success(t('deleteTaskModal.successMessage'), {
          style: toastStyles,
        });
        setTasks(tasks.filter((task) => task.id !== selectedTask.id));
        handleCloseDeleteModal();
      } catch (err) {
        errorHandler(err as ErrorToHandle);
      }
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
    if (selectedTask) {
      if (selectedTask.completed) {
        toast.success(t('completeTaskModal.alreadyCompletedMessage'), {
          style: toastStyles,
        });
        handleCloseCompleteModal();
        return;
      }
      try {
        await taskService.updateTask(String(selectedTask.id), {
          completed: true,
        });
        toast.success(t('completeTaskModal.successMessage'), {
          style: toastStyles,
        });
        setTasks(
          tasks.map((task) =>
            task.id === selectedTask.id ? { ...task, completed: true } : task,
          ),
        );
        handleCloseCompleteModal();
      } catch (err) {
        errorHandler(err as ErrorToHandle);
      }
    }
  };

  const handleOpenDetailsModal = (task: Task) => {
    setSelectedTask(task);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedTask(null);
    setIsDetailsModalOpen(false);
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
      handleCloseEditModal();
    } catch (err) {
      errorHandler(err as ErrorToHandle);
      toast.error(t('editTaskModal.errorMessage'), {
        style: toastStyles,
      });
    }
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
        <TaskCard
          key={task.id}
          task={task}
          onDelete={handleOpenDeleteModal}
          onComplete={handleOpenCompleteModal}
          onDetails={handleOpenDetailsModal}
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
      />

      <TaskDetailsModal
        open={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        title={selectedTask?.title || ''}
        description={selectedTask?.description || ''}
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
