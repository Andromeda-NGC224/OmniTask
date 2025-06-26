import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { TasksStatsProps } from './types';
import { statsConfig } from './config/statsConfig';
import { StatType } from './config/types';
import { switchNeverDefaultCase } from 'utils';

export default function TasksStats({ tasks = [], total }: TasksStatsProps) {
  const { t } = useTranslation('profile_page');
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const getValue = (type: StatType) => {
    switch (type) {
      case StatType.Total:
        return total;
      case StatType.Completed:
        return completed;
      case StatType.Pending:
        return pending;
      default:
        switchNeverDefaultCase(type);
    }
  };

  return (
    <Box
      display='grid'
      gridTemplateColumns={{
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
      gap={3}
      sx={{ mt: 3 }}
    >
      {statsConfig.map((stat) => (
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
  );
}
