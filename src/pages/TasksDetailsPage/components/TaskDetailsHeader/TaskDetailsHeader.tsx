import { Box, Chip, Stack, Typography } from '@mui/material';
import { useFormatDate } from 'hooks';
import { useTranslation } from 'react-i18next';
import { TaskStatus } from 'types/tasks';
import type { TaskDetailsHeaderProps } from './types';

const statusColors: Record<TaskStatus, 'warning' | 'success' | 'info'> = {
  [TaskStatus.PENDING]: 'warning',
  [TaskStatus.COMPLETED]: 'success',
  [TaskStatus.IN_PROGRESS]: 'info',
};

export const TaskDetailsHeader = ({
  title,
  status,
  createdAt,
  updatedAt,
}: TaskDetailsHeaderProps) => {
  const formatDate = useFormatDate();
  const { t } = useTranslation('tasks_details_page');

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='flex-start'
      mb={3}
    >
      <Box>
        <Typography
          variant='h3'
          component='h1'
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 2,
          }}
        >
          {title}
        </Typography>

        <Chip
          label={t(`status.${status}`)}
          color={statusColors[status as TaskStatus]}
          sx={{
            textTransform: 'capitalize',
            px: 1,
            fontWeight: 600,
          }}
        />
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Typography variant='caption' color='text.secondary'>
          {t('createdAt')}
        </Typography>
        <Typography variant='body2' color='text.primary'>
          {formatDate(createdAt)}
        </Typography>

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ mt: 1, display: 'block' }}
        >
          {t('lastUpdated')}
        </Typography>
        <Typography variant='body2' color='text.primary'>
          {formatDate(updatedAt)}
        </Typography>
      </Box>
    </Stack>
  );
};
