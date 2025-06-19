import { Alert, Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FailedToLoadProps } from './types';

export default function FailedToLoad({ onRetry }: FailedToLoadProps) {
  const { t } = useTranslation('tasks_page');

  return (
    <Alert
      severity='error'
      variant='filled'
      sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography variant='button'>
          {t('taskList.errorLoadingTasks')}
        </Typography>
        <Button
          variant='outlined'
          color='inherit'
          size='small'
          onClick={onRetry}
          sx={{ width: 'fit-content', height: '36px' }}
        >
          {t('taskList.retry')}
        </Button>
      </Box>
    </Alert>
  );
}
