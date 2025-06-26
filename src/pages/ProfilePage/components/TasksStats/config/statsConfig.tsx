import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
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
    type: StatType.Total,
    icon: (
      <ChecklistOutlinedIcon sx={{ ...iconStyle, color: 'primary.main' }} />
    ),
  },
  {
    label: 'tasks_stats.completed',
    type: StatType.Completed,
    icon: <DoneAllOutlinedIcon sx={{ ...iconStyle, color: 'success.main' }} />,
  },
  {
    label: 'tasks_stats.pending',
    type: StatType.Pending,
    icon: (
      <HourglassEmptyOutlinedIcon
        sx={{ ...iconStyle, color: 'warning.main' }}
      />
    ),
  },
];
