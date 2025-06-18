import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { TaskList, TasksToolbar } from './components';
import { ModalType, ViewMode } from './types';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { TaskService } from 'api/services';
import { errorHandler } from 'api/utils/errorHandler';
import { getQueryParams } from 'api/services/TaskService/utils';
import { useTranslation } from 'react-i18next';
import { isCancel } from 'axios';
import type { Task } from 'types/tasks';
import {
  DeleteTaskModal,
  CompleteTaskModal,
  EditTaskModal,
} from './components/modals';
import { useModals } from './hooks';
import { showToast } from 'utils/toast';

const TasksPage = () => {
  const { t } = useTranslation('tasks_page');
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Grid);
  const [searchParams] = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { isOpen, open, close } = useModals();

  const { order, sortBy, per_page, page, search } =
    getQueryParams(searchParams);

  const handleOpenModal = (type: ModalType, task: Task) => {
    setSelectedTask(task);
    open(type);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    close();
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask) return;
    try {
      await TaskService.deleteTask(String(selectedTask.id));
      showToast.success(t('deleteTaskModal.successMessage'));

      setTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
    } catch (err) {
      errorHandler(err);
    } finally {
      handleCloseModal();
    }
  };

  const handleConfirmComplete = async () => {
    if (!selectedTask) return;
    try {
      await TaskService.updateTask(String(selectedTask.id), {
        completed: !selectedTask.completed,
      });

      showToast.success(
        selectedTask.completed
          ? t('completeTaskModal.revertedMessage')
          : t('completeTaskModal.successMessage'),
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
      handleCloseModal();
    }
  };

  const handleSaveEdit = async (
    id: number,
    title: string,
    description: string,
    completed: boolean,
  ) => {
    try {
      const updatedTask = await TaskService.updateTask(String(id), {
        title,
        description,
        completed,
      });
      showToast.success(t('editTaskModal.successMessage'));
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask.data : task)),
      );
    } catch (err) {
      errorHandler(err);
    } finally {
      handleCloseModal();
    }
  };

  const handleDetailsClick = (task: Task) => {
    navigate(`/tasks/${task.id}`);
  };

  const fetchTasks = useCallback(async () => {
    const controller = new AbortController();
    setLoading(true);

    try {
      const response = await TaskService.getTasks(
        { order, sortBy, per_page, page, search },
        controller.signal,
      );

      if (response.data === null) {
        setTasks([]);
        setError(null);
      } else {
        setTasks(response.data.data);
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
  }, [order, sortBy, per_page, page, search]);

  useEffect(() => {
    fetchTasks();

    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, [fetchTasks]);

  return (
    <Box>
      <TasksToolbar
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onTaskAdded={fetchTasks}
      />
      <TaskList
        viewMode={viewMode}
        tasks={tasks}
        loading={loading}
        error={error}
        onDelete={(task) => handleOpenModal(ModalType.Delete, task)}
        onComplete={(task) => handleOpenModal(ModalType.Complete, task)}
        onDetails={handleDetailsClick}
        onEdit={(task) => handleOpenModal(ModalType.Edit, task)}
      />

      <DeleteTaskModal
        open={isOpen(ModalType.Delete)}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <CompleteTaskModal
        open={isOpen(ModalType.Complete)}
        onClose={handleCloseModal}
        onConfirm={handleConfirmComplete}
        isAlreadyCompleted={selectedTask?.completed || false}
      />

      <EditTaskModal
        open={isOpen(ModalType.Edit)}
        onClose={handleCloseModal}
        onSave={handleSaveEdit}
        task={selectedTask}
      />
    </Box>
  );
};

export default TasksPage;
