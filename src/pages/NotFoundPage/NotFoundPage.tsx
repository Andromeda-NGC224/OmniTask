import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { shakeAnimation } from './utils';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('not_found_page');

  return (
    <Box
      sx={{
        height: '80dvh',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 80,
          color: 'primary.main',
          mb: 2,
          ...shakeAnimation,
        }}
      />
      <Typography variant='h3' color='text.primary' gutterBottom>
        {t('title')}
      </Typography>
      <Typography variant='body1' color='text.secondary' mb={3}>
        {t('description')}
      </Typography>
      <Button variant='contained' color='primary' onClick={() => navigate('/')}>
        {t('button')}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
