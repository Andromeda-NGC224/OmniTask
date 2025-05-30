import { Card, Typography, Box, Chip, useColorScheme } from '@mui/material';
import type { Task } from '../../../../types/tasks';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useTranslation } from 'react-i18next';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { mode } = useColorScheme();
  const isCompleted = task.completed;
  const { t } = useTranslation('tasks_page');

  return (
    <Card
      variant='outlined'
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        borderRadius: 3,
        border: mode === 'light' ? '1px solid' : 'none',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          {t(`tasks.${task.id}.title`)}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {t(`tasks.${task.id}.description`)}
        </Typography>
      </Box>

      <Chip
        size='small'
        icon={isCompleted ? <CheckCircleOutlineIcon /> : <CancelOutlinedIcon />}
        label={isCompleted ? t('chips.completed') : t('chips.pending')}
        color={isCompleted ? 'success' : 'warning'}
      />
    </Card>
  );
}
