import type { RefCallback } from 'react';
import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

export interface SortActivatorProps {
  ref: RefCallback<HTMLElement>;
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
}
