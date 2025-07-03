import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { TaskList, TasksToolbar } from './components';
import { ModalType, ViewMode } from './types';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { errorHandler } from 'api/utils/errorHandler';
import { useTranslation } from 'react-i18next';
import { isCancel } from 'axios';
import type { Task } from 'types/tasks';
import { TaskStatus } from 'types/tasks';

import { useInfiniteScroll, useModals } from './hooks';
import { showToast } from 'utils/toast';
import { getQueryParams } from 'api/services/TasksService/utils';
import { TasksService } from 'api/services';
import { localStorageService } from 'utils/localStorageService';
import {
  ChangeTaskStatusModal,
  DeleteTaskModal,
  EditTaskModal,
} from './components/modals';

const TasksPage = () => {
  const { t } = useTranslation('tasks_page');
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const {
    order,
    sortBy,
    filter,
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
      await TasksService.deleteTask(`${selectedTask.id}`);
      showToast.success(t('deleteTaskModal.successMessage'));

      setTasks((prev) => prev.filter((task) => task.id !== selectedTask.id));
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
    status: TaskStatus,
  ) => {
    try {
      const updatedTask = await TasksService.updateTask(`${id}`, {
        title,
        description,
        status,
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

  const handleChangeTaskStatus = async (newStatus: TaskStatus) => {
    if (!selectedTask) return;
    try {
      await TasksService.updateTask(`${selectedTask.id}`, {
        status: newStatus,
      });

      showToast.success(t('changeStatusModal.successMessage'));

      setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id ? { ...task, status: newStatus } : task,
        ),
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
          {
            order,
            sortBy,
            filter,
            per_page,
            page,
            search,
          },
          signal,
        );
        // For the first page we replace the tasks, for the subsequent ones we add them
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
      } catch (err) {
        if (isCancel(err)) return;
        setError(true);
        errorHandler(err);
      } finally {
        setLoading(false);
      }
    },
    [order, sortBy, per_page, page, search, filter],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchTasks(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchTasks, initialPage]);

  // Discount when changing filtering/search/sorting
  useEffect(() => {
    setTasks([]);
    setPage(1);
    setHasMore(true);
  }, [order, sortBy, per_page, search, filter]);

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
        onComplete={(task) => handleOpenModal(ModalType.ChangeStatus, task)}
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

      <ChangeTaskStatusModal
        open={isOpen(ModalType.ChangeStatus)}
        onClose={handleCloseModal}
        onConfirm={handleChangeTaskStatus}
        currentStatus={selectedTask?.status || TaskStatus.PENDING}
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
