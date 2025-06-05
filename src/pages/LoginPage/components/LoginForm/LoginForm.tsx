import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from 'pages/LoginPage/config';
import type { LoginFormInputs } from 'pages/LoginPage/types';
import { LoginField } from '..';

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log('Дані для входу:', data);
      navigate('/');
    } catch (error) {
      console.error('Помилка входу:', error);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        <LoginField
          name='email'
          label='Електронна пошта'
          control={control}
          errorMessage={errors.email?.message}
        />
        <LoginField
          name='password'
          label='Пароль'
          type='password'
          control={control}
          errorMessage={errors.password?.message}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Завантаження...' : 'Увійти'}
        </Button>
      </Stack>
      <Typography variant='body2' align='center' mt={2}>
        Не маєте облікового запису?{' '}
        <MuiLink component={Link} to='/register' color='primary'>
          Зареєструватися
        </MuiLink>
      </Typography>
    </Box>
  );
}
