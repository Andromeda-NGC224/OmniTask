import { Container, Box, Paper, Typography } from '@mui/material';
import { RegisterForm } from './components';
import { useTranslation } from 'react-i18next';

export default function RegisterPage() {
  const { t } = useTranslation('register_page');
  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <Paper elevation={5} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <Typography variant='h5' align='center' gutterBottom>
            {t('title')}
          </Typography>
          <RegisterForm />
        </Paper>
      </Box>
    </Container>
  );
}
