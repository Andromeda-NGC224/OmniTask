import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack, Typography, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from 'pages/LoginPage/config';
import type { LoginFormInputs } from 'pages/LoginPage/types';
import { LoginField } from '..';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation('login_page');
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
          label={t('email_placeholder')}
          control={control}
          errorMessage={errors.email?.message}
        />
        <LoginField
          name='password'
          label={t('password_placeholder')}
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
          {isSubmitting ? '...' : `${t('button')}`}
        </Button>
      </Stack>
      <Typography variant='body2' align='center' mt={2}>
        {t('helper_text')}{' '}
        <MuiLink component={Link} to='/register' color='primary'>
          {t('register_link')}
        </MuiLink>
      </Typography>
    </Box>
  );
}
