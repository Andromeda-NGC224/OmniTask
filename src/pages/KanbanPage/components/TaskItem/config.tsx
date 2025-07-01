import type { ChipProps } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { TaskStatus } from 'types/tasks';
import type { TFunction } from 'i18next';
import type { JSX } from 'react';
import { switchNeverDefaultCase } from 'utils';

type ChipConfig = {
  icon: JSX.Element;
  label: string;
  color: ChipProps['color'];
};

export const getTaskStatusChipConfig = (
  status: TaskStatus,
  t: TFunction<'tasks_page'>,
): ChipConfig => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return {
        icon: <CheckCircleOutlineIcon />,
        label: t('chips.completed'),
        color: 'success' as ChipProps['color'],
      };
    case TaskStatus.PENDING:
      return {
        icon: <CancelOutlinedIcon />,
        label: t('chips.pending'),
        color: 'warning' as ChipProps['color'],
      };
    case TaskStatus.IN_PROGRESS:
      return {
        icon: <HourglassEmptyIcon />,
        label: t('chips.inProgress'),
        color: 'info' as ChipProps['color'],
      };
    default:
      return switchNeverDefaultCase(status);
  }
};

export const getTaskStatusIconConfig = (
  status: TaskStatus,
): JSX.Element | null => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return (
        <AssignmentTurnedInIcon sx={{ marginTop: '4px' }} color='success' />
      );
    case TaskStatus.PENDING:
      return <AssignmentLateIcon sx={{ marginTop: '4px' }} color='warning' />;
    case TaskStatus.IN_PROGRESS:
      return <PendingActionsIcon sx={{ marginTop: '4px' }} color='info' />;
    default:
      return switchNeverDefaultCase(status);
  }
};
