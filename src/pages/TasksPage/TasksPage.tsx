import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { TaskList, TasksToolbar } from './components';
import { ModalType, ViewMode } from './types';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { errorHandler } from 'api/utils/errorHandler';
import { useTranslation } from 'react-i18next';
import { isCancel } from 'axios';
import type { Task } from 'types/tasks';
import {
  DeleteTaskModal,
  CompleteTaskModal,
  EditTaskModal,
} from './components/modals';
import { useInfiniteScroll, useModals } from './hooks';
import { showToast } from 'utils/toast';
import { getQueryParams } from 'api/services/TasksService/utils';
import { TasksService } from 'api/services';
import { localStorageService } from 'utils/localStorageService';

const TasksPage = () => {
  const { t } = useTranslation('tasks_page');
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const {
    order,
    sortBy,
    per_page,
    search,
    page: initialPage,
  } = getQueryParams(searchParams);

  const initializeViewMode = (): ViewMode => {
    return (localStorageService.getViewMode() as ViewMode) || ViewMode.Grid;
  };

  const [viewMode, setViewMode] = useState<ViewMode>(initializeViewMode);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState<number>(initialPage);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { lastElementRef } = useInfiniteScroll({
    loading,
    hasMore,
    setPage,
  });

  const { isOpen, open, close } = useModals();

  const handleOpenModal = (type: ModalType, task: Task) => {
    setSelectedTask(task);
    open(type);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    close();
  };

  const handleChangeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorageService.setViewMode(mode);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask) return;
    try {
      await TasksService.deleteTask(String(selectedTask.id));
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
      await TasksService.updateTask(String(selectedTask.id), {
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
      const updatedTask = await TasksService.updateTask(String(id), {
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

  const handleTaskAdded = () => {
    setTasks([]);
    setPage(1);
    setHasMore(true);
    fetchTasks();
  };

  const fetchTasks = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);

      try {
        const response = await TasksService.getTasks(
          { order, sortBy, per_page, page, search },
          signal,
        );

        if (response.data === null) {
          setTasks([]);
          setError(null);
        } else {
          // Для первой страницы заменяем задачи, для последующих - добавляем
          setTasks((prevTasks) =>
            page === 1
              ? response.data.data
              : [
                  ...prevTasks,
                  ...response.data.data.filter(
                    (newTask) =>
                      !prevTasks.some((task) => task.id === newTask.id),
                  ),
                ],
          );
          setHasMore(response.data.data.length >= per_page);
          setError(null);
        }
      } catch (err) {
        if (isCancel(err)) return;
        setError(true);
        errorHandler(err);
      } finally {
        setLoading(false);
      }
    },
    [order, sortBy, per_page, page, search],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchTasks(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchTasks, initialPage]);

  // Скидання при зміні фільтрації/пошуку/сортування
  useEffect(() => {
    setTasks([]);
    setPage(1);
    setHasMore(true);
  }, [order, sortBy, per_page, search]);

  return (
    <Box>
      <TasksToolbar
        viewMode={viewMode}
        onChangeViewMode={handleChangeViewMode}
        onTaskAdded={handleTaskAdded}
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
        lastElementRef={lastElementRef}
        hasMore={hasMore}
        onRetry={fetchTasks}
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
