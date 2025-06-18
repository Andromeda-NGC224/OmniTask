import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Stack,
  Typography,
  Link as MuiLink,
  CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from 'pages/LoginPage/config';
import type { LoginFormInputs } from 'pages/LoginPage/types';
import { LoginField } from '..';
import { useTranslation } from 'react-i18next';
import { AuthService } from 'api/services/AuthService/AuthService';
import { EAppRoutes } from 'routes/config';
import { errorHandler } from 'api/utils';

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
      await AuthService.login(data);
      navigate(EAppRoutes.TASKS);
    } catch (error) {
      errorHandler(error);
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
          {isSubmitting ? (
            <CircularProgress size={24} color='primary' />
          ) : (
            t('button')
          )}
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
