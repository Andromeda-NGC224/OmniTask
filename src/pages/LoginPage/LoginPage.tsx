import { Container, Box, Paper, Typography } from '@mui/material';
import { LoginForm } from './components';

export default function LoginPage() {
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
            Вхід
          </Typography>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
}
