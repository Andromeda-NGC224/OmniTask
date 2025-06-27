import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TasksStatsProps } from './types';
import { statsConfig } from './config/statsConfig';
import { StatType } from './config/types';
import { switchNeverDefaultCase } from 'utils';
import { TaskStatus } from 'types/tasks';

export default function TasksStats({ tasks = [], total }: TasksStatsProps) {
  const { t } = useTranslation('profile_page');
  const completed = tasks.filter(
    (t) => t.status === TaskStatus.COMPLETED,
  ).length;
  const pending = tasks.filter((t) => t.status === TaskStatus.PENDING).length;
  const inProgress = tasks.filter(
    (t) => t.status === TaskStatus.IN_PROGRESS,
  ).length;

  const getValue = (type: StatType) => {
    switch (type) {
      case StatType.TOTAL:
        return total;
      case StatType.COMPLETED:
        return completed;
      case StatType.PENDING:
        return pending;
      case StatType.IN_PROGRESS:
        return inProgress;
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
          <Paper
            elevation={6}
            sx={{
              borderRadius: '12px',
              p: 3,
              textAlign: 'center',
              width: { xs: '100%', sm: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
              },
            }}
          >
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
          <Paper
            key={stat.label}
            elevation={6}
            sx={{
              borderRadius: '12px',
              p: 3,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
              },
            }}
          >
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
