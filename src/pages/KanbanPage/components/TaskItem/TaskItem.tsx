import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { type TaskItemProps } from './types';
import { memo } from 'react';
import { mergeSortActivatorProps } from 'pages/KanbanPage/utils';
import { TaskStatus } from 'types/tasks';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useTranslation } from 'react-i18next';
import { formatDate, switchNeverDefaultCase } from 'utils';

export default memo(function TaskItem({
  task,
  sortActivatorProps,
}: TaskItemProps) {
  const { t } = useTranslation('tasks_page');

  console.log('task', task);

  const getStatusChip = () => {
    switch (task.status) {
      case TaskStatus.COMPLETED:
        return (
          <Chip
            size='small'
            icon={<CheckCircleOutlineIcon />}
            label={t('chips.completed')}
            color='success'
          />
        );
      case TaskStatus.PENDING:
        return (
          <Chip
            size='small'
            icon={<CancelOutlinedIcon />}
            label={t('chips.pending')}
            color='warning'
          />
        );
      case TaskStatus.IN_PROGRESS:
        return (
          <Chip
            size='small'
            icon={<HourglassEmptyIcon />}
            label={t('chips.inProgress')}
            color='info'
          />
        );
      default:
        switchNeverDefaultCase(task.status);
    }
  };
  const getStatusIcon = () => {
    switch (task.status) {
      case TaskStatus.COMPLETED:
        return (
          <AssignmentTurnedInIcon sx={{ marginTop: '4px' }} color='success' />
        );
      case TaskStatus.PENDING:
        return <AssignmentLateIcon sx={{ marginTop: '4px' }} color='warning' />;
      case TaskStatus.IN_PROGRESS:
        return <PendingActionsIcon sx={{ marginTop: '4px' }} color='info' />;
      default:
        return null;
    }
  };

  return (
    <Card
      {...mergeSortActivatorProps(sortActivatorProps)}
      sx={{
        boxShadow: 6,
        borderRadius: 4,
        cursor: 'grab',

        backdropFilter: 'blur(6px)',

        position: 'relative',
        overflow: 'hidden',
        '&:active': { cursor: 'grabbing' },
        '&:hover': {
          boxShadow: 12,

          transform: 'scale(1.025)',
        },
        transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.2s',
        minHeight: 110,
        mb: 0.5,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          '&:last-child': { pb: 2 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getStatusIcon()}

          <Typography
            variant='h6'
            component='div'
            sx={{ fontWeight: 700, fontSize: { xs: 16, sm: 18 } }}
          >
            {task.title}
          </Typography>
        </Box>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ fontSize: { xs: 13, sm: 15 } }}
        >
          {task.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            alignItems: 'center',
          }}
        >
          {getStatusChip()}
          <Chip
            size='small'
            label={formatDate(task.createdAt)}
            color='secondary'
            sx={{ fontWeight: 600, ml: 0.5 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
});
