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

import type { LoginFormInputs } from 'pages/LoginPage/types';
import { useTranslation } from 'react-i18next';
import { AuthService } from 'api/services/AuthService/AuthService';
import { EAppRoutes } from 'routes/config';
import { errorHandler } from 'api/utils';
import { CustomTextField } from 'components/Inputs';
import { useLoginSchema } from 'pages/LoginPage/hooks';

export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation('login_page');
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(useLoginSchema()),
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
        <CustomTextField
          name='email'
          label={t('email_placeholder')}
          control={control}
          errorMessage={errors.email?.message}
        />
        <CustomTextField
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
