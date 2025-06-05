import { TaskFilter, TaskSort } from 'pages/TasksPage/types';
import type { Task } from 'types/tasks';

export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  switch (filter) {
    case TaskFilter.Completed:
      return tasks.filter((task) => task.completed);
    case TaskFilter.Pending:
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
};

export const searchTasks = (tasks: Task[], query: string): Task[] => {
  if (!query.trim()) return tasks;
  const lowerQuery = query.toLowerCase();
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerQuery) ||
      task.description.toLowerCase().includes(lowerQuery),
  );
};

export const sortTasks = (tasks: Task[], sort: TaskSort): Task[] => {
  const sortedTasks = [...tasks];
  switch (sort) {
    case TaskSort.CompletedAsc:
      return sortedTasks.sort(
        (a, b) => Number(b.completed) - Number(a.completed),
      );
    case TaskSort.CompletedDesc:
      return sortedTasks.sort(
        (a, b) => Number(a.completed) - Number(b.completed),
      );
    case TaskSort.CreatedAtDesc:
      return sortedTasks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case TaskSort.CreatedAtAsc:
      return sortedTasks.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    case TaskSort.TitleAsc:
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sortedTasks;
  }
};
