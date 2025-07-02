import { type ButtonProps } from '@mui/material';
import { TaskStatus } from 'types/tasks';

type ChangeStatusButtonConfig = {
  targetStatus: TaskStatus;
  color: ButtonProps['color'];
  labelKey: string;
};

export const getChangeStatusButtonsConfig = (
  currentStatus: TaskStatus,
): ChangeStatusButtonConfig[] => {
  switch (currentStatus) {
    case TaskStatus.PENDING:
      return [
        {
          targetStatus: TaskStatus.COMPLETED,
          color: 'success',
          labelKey: 'changeStatusModal.pending.complete',
        },
        {
          targetStatus: TaskStatus.IN_PROGRESS,
          color: 'info',
          labelKey: 'changeStatusModal.pending.startProgress',
        },
      ];
    case TaskStatus.IN_PROGRESS:
      return [
        {
          targetStatus: TaskStatus.COMPLETED,
          color: 'success',
          labelKey: 'changeStatusModal.inProgress.complete',
        },
        {
          targetStatus: TaskStatus.PENDING,
          color: 'warning',
          labelKey: 'changeStatusModal.inProgress.revertToPending',
        },
      ];
    case TaskStatus.COMPLETED:
      return [
        {
          targetStatus: TaskStatus.PENDING,
          color: 'warning',
          labelKey: 'changeStatusModal.completed.revertToPending',
        },
        {
          targetStatus: TaskStatus.IN_PROGRESS,
          color: 'info',
          labelKey: 'changeStatusModal.completed.revertToInProgress',
        },
      ];
    default:
      return [];
  }
};
