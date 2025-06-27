import type { SortActivatorProps } from 'pages/KanbanPage/types/dnd';

export const mergeSortActivatorProps = (
  sortActivatorProps?: SortActivatorProps,
) => {
  if (!sortActivatorProps) return {};

  const { listeners = {}, ref, attributes } = sortActivatorProps;

  return {
    ref,
    ...listeners,
    ...attributes,
  };
};
