import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import type { SxProps, Theme } from '@mui/material';
import { StatType } from './types';
import { type JSX } from 'react';

export interface StatConfigItem {
  label: string;
  type: StatType;
  icon: JSX.Element;
}

const iconStyle: SxProps<Theme> = { fontSize: 40 };

export const statsConfig: StatConfigItem[] = [
  {
    label: 'tasks_stats.total',
    type: StatType.TOTAL,
    icon: (
      <ChecklistOutlinedIcon sx={{ ...iconStyle, color: 'primary.main' }} />
    ),
  },
  {
    label: 'tasks_stats.completed',
    type: StatType.COMPLETED,
    icon: <DoneAllOutlinedIcon sx={{ ...iconStyle, color: 'success.main' }} />,
  },
  {
    label: 'tasks_stats.pending',
    type: StatType.PENDING,
    icon: (
      <PendingActionsOutlinedIcon
        sx={{ ...iconStyle, color: 'warning.main' }}
      />
    ),
  },
  {
    label: 'tasks_stats.in_progress',
    type: StatType.IN_PROGRESS,
    icon: (
      <HourglassEmptyOutlinedIcon sx={{ ...iconStyle, color: 'info.main' }} />
    ),
  },
];
