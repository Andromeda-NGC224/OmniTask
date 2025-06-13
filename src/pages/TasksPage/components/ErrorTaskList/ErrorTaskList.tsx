import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';
import { float } from './config';

export default function ErrorTaskList() {
  const { t } = useTranslation('tasks_page');

  const handleReload = () => {
    window.location.reload();
  };

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
          color: 'error.main',
          animation: `${float} 3s ease-in-out infinite`,
          display: 'flex',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <ErrorOutlineIcon fontSize='inherit' />
      </Box>

      <Typography
        variant='h5'
        color='text.primary'
        fontWeight={600}
        gutterBottom
      >
        {t('errorTasks.title')}
      </Typography>

      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        {t('errorTasks.description')}
      </Typography>

      <Button variant='contained' color='primary' onClick={handleReload}>
        {t('errorTasks.retry')}
      </Button>
    </Box>
  );
}
