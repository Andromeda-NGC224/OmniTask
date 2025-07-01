import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { type TaskItemProps } from './types';
import { memo } from 'react';
import { mergeSortActivatorProps } from 'pages/KanbanPage/utils';
import { useTranslation } from 'react-i18next';
import { useFormatDate } from 'hooks';
import { getTaskStatusChipConfig, getTaskStatusIconConfig } from './config.tsx';
import { taskItemStyles } from './styles.ts';

export default memo(function TaskItem({
  task,
  sortActivatorProps,
}: TaskItemProps) {
  const { t } = useTranslation('tasks_page');

  const formatDate = useFormatDate();

  const getStatusChip = () => {
    const { icon, label, color } = getTaskStatusChipConfig(task.status, t);
    return <Chip size='small' icon={icon} label={label} color={color} />;
  };

  const getStatusIcon = () => {
    return getTaskStatusIconConfig(task.status);
  };

  return (
    <Card {...mergeSortActivatorProps(sortActivatorProps)} sx={taskItemStyles}>
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
