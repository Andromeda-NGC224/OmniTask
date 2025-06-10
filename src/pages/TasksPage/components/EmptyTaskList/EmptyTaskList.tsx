import { Box, Typography } from '@mui/material';
import { Assignment } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { float } from './config';

export default function EmptyTaskList() {
  const { t } = useTranslation('tasks_page');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 200px)',
        textAlign: 'center',
        p: 3,
        maxWidth: 500,
        margin: '0 auto',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          fontSize: '64px',
          color: 'primary.main',
          animation: `${float} 3s ease-in-out infinite`,
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <Assignment fontSize='inherit' />
      </Box>

      <Typography
        variant='h5'
        color='text.primary'
        fontWeight={600}
        gutterBottom
      >
        {t('emptyTasks.title')}
      </Typography>

      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        {t('emptyTasks.description')}
      </Typography>
    </Box>
  );
}
