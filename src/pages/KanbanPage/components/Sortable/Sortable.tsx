import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SortActivatorProps } from 'pages/KanbanPage/types';
import { memo, type CSSProperties } from 'react';
import type { SortableProps } from './types';

export default memo(function Sortable({
  id,
  render,
  activeItem,
}: SortableProps) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    attributes,
    isDragging,
    transition,
    transform,
  } = useSortable({
    id,
    data: { activeItem },
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition, // Отключаем transition, если элемент активен
    opacity: isDragging ? 0.4 : 1,
  };

  const sortActivatorProps: SortActivatorProps = {
    ref: setActivatorNodeRef,
    listeners,
    attributes,
  };

  // ! render
  return (
    <div ref={setNodeRef} style={style}>
      {render(sortActivatorProps)}
    </div>
  );
});
