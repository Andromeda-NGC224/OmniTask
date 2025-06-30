import { arrayMove } from '@dnd-kit/sortable';
import type { Task } from 'types/tasks';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Dispatch, SetStateAction } from 'react';

export const moveTaskInList = (
  tasks: Task[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  setTasks: Dispatch<SetStateAction<Task[]>>,
) => {
  const allTasks = [...tasks];
  const globalOldIndex = allTasks.findIndex((t) => t.id === activeId);
  const globalNewIndex = allTasks.findIndex((t) => t.id === overId);

  setTasks(arrayMove(allTasks, globalOldIndex, globalNewIndex));
};
