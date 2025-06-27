import type { SortActivatorProps } from 'pages/KanbanPage/types';
import type { JSX } from 'react';

export type SortableProps = {
  id: number;
  activeItem: unknown;
  render: (sortActivatorProps: SortActivatorProps) => JSX.Element;
};
