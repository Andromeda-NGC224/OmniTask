import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TasksStatsProps } from './types';
import { statsConfig } from './config/statsConfig';
import { StatType } from './config/types';
import { switchNeverDefaultCase } from 'utils';
import { TaskStatus } from 'types/tasks';
import { statusStatPaperStyles, totalStatPaperStyles } from './styles';

export default function TasksStats({ tasksStats }: TasksStatsProps) {
  const { t } = useTranslation('profile_page');

  const getStatusCount = (status: TaskStatus) => {
    if (!tasksStats) return 0;
    const stat = tasksStats.tasksByStatus.find((s) => s.status === status);
    return stat ? parseInt(stat.count, 10) : 0;
  };

  const getValue = (type: StatType) => {
    if (!tasksStats) return 0;

    switch (type) {
      case StatType.TOTAL:
        return tasksStats.totalTasks;
      case StatType.COMPLETED:
        return getStatusCount(TaskStatus.COMPLETED);
      case StatType.PENDING:
        return getStatusCount(TaskStatus.PENDING);
      case StatType.IN_PROGRESS:
        return getStatusCount(TaskStatus.IN_PROGRESS);
      default:
        switchNeverDefaultCase(type);
    }
  };

  // Отделение TOTAL блока
  const totalStat = statsConfig.find((stat) => stat.type === StatType.TOTAL);
  const statusStats = statsConfig.filter(
    (stat) => stat.type !== StatType.TOTAL,
  );

  return (
    <Box sx={{ mt: 3 }}>
      {totalStat && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Paper elevation={6} sx={totalStatPaperStyles}>
            <Box sx={{ mb: 1 }}>{totalStat.icon}</Box>
            <Typography variant='subtitle1' color='text.secondary'>
              {t(totalStat.label)}
            </Typography>
            <Typography
              variant='h4'
              component='div'
              sx={{ fontWeight: 'bold', mt: 0.5 }}
            >
              {getValue(totalStat.type)}
            </Typography>
          </Paper>
        </Box>
      )}

      <Box
        display='grid'
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(3, 1fr)',
        }}
        gap={3}
        sx={{
          maxWidth: { md: '800px' },
          margin: '0 auto',
        }}
      >
        {statusStats.map((stat) => (
          <Paper key={stat.label} elevation={6} sx={statusStatPaperStyles}>
            <Box sx={{ mb: 1 }}>{stat.icon}</Box>
            <Typography variant='subtitle1' color='text.secondary'>
              {t(stat.label)}
            </Typography>
            <Typography
              variant='h4'
              component='div'
              sx={{ fontWeight: 'bold', mt: 0.5 }}
            >
              {getValue(stat.type)}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
