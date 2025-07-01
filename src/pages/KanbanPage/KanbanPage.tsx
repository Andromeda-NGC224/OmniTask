import { Box } from '@mui/material';
import { useDnDSensors } from './hooks';
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  pointerWithin,
  closestCorners,
  type CollisionDetection,
} from '@dnd-kit/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TaskStatus, type Task } from 'types/tasks';
import { TasksService } from 'api/services';
import { errorHandler } from 'api/utils/errorHandler';
import { moveTaskInList } from './utils';
import { ErrorTaskList } from 'pages/TasksPage/components/ErrorTaskList';
import { EmptyTaskList } from 'pages/TasksPage/components';
import { Column, KanbanSkeleton, TaskItem } from './components';
import { showToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';

export default function KanbanPage() {
  const sensors = useDnDSensors();
  const { t } = useTranslation('tasks_page');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeItem, setActiveItem] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);

  const originalTaskState = useRef<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await TasksService.getTasks({
        order: 'desc',
        sortBy: 'createdAt',
        per_page: 1000,
        page: 1,
        search: '',
      });
      setTasks(response.data.data);
    } catch (err) {
      setError(true);
      errorHandler(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveItem(task || null);
    originalTaskState.current = task || null;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);
    if (!over || !originalTaskState.current) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    if (Object.values(TaskStatus).includes(over.id as TaskStatus)) {
      const newStatus = over.id as TaskStatus;
      if (activeTask.status === newStatus) return;

      const currentOriginalTask = originalTaskState.current;

      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeTask.id ? { ...task, status: newStatus } : task,
        ),
      );

      try {
        await TasksService.updateTask(`${activeTask.id}`, {
          status: newStatus,
        });
        showToast.success(t('changeStatusModal.successMessage'));
      } catch (err) {
        errorHandler(err);
        setTasks((prev) =>
          prev.map((task) =>
            task.id === currentOriginalTask?.id
              ? { ...task, status: currentOriginalTask.status }
              : task,
          ),
        );
      } finally {
        originalTaskState.current = null;
      }
      return;
    }

    const overTask = tasks.find((t) => t.id === over.id);
    if (!overTask || activeTask.status !== overTask.status) return;

    moveTaskInList(tasks, active.id, over.id, setTasks);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    if (Object.values(TaskStatus).includes(over.id as TaskStatus)) {
      return;
    }

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (activeTask && overTask && activeTask.status === overTask.status) {
      moveTaskInList(tasks, active.id, over.id, setTasks);
    }
  };

  const customCollisionDetectionStrategy: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args);

    const columnCollision = pointerCollisions.find((collision) =>
      Object.values(TaskStatus).includes(collision.id as TaskStatus),
    );

    if (columnCollision) {
      return [columnCollision];
    }

    return closestCorners(args);
  };

  if (loading && tasks.length === 0) {
    return <KanbanSkeleton />;
  }

  if (error && tasks.length === 0) {
    return <ErrorTaskList />;
  }
  if (tasks.length === 0 && !loading) {
    return <EmptyTaskList />;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(3, 1fr)',
        },
        gap: 3,
        margin: '0 auto',
        width: { lg: '70%', md: '100%', sm: '100%' },
      }}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        collisionDetection={customCollisionDetectionStrategy}
      >
        {Object.values(TaskStatus).map((status) => (
          <Column
            key={status}
            title={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}

        {createPortal(
          <DragOverlay>
            {activeItem ? <TaskItem task={activeItem} /> : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </Box>
  );
}
