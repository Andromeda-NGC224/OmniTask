import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { registerFormSchema } from '../../config';
import type { RegisterFormInputs } from '../../types';
import { RegisterStep1Form, RegisterStep2Form } from '..';
import { step1Fields, step2Fields } from './config';
import { useTranslation } from 'react-i18next';

export default function RegisterForm() {
  const { t } = useTranslation('register_page');
  const [step, setStep] = useState(1);
  const methods = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const handleNextStep = async () => {
    const isValid = await trigger(step1Fields);
    if (isValid) {
      setStep(2);
    }
  };

  const handleRegisterSubmit = async (data: RegisterFormInputs) => {
    try {
      const isValid = await trigger(step2Fields);
      if (!isValid) {
        return;
      }

      console.log('Final registration data:', data);

      navigate('/');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        onSubmit={handleSubmit(handleRegisterSubmit)}
        noValidate
      >
        <Stack spacing={2}>
          {step === 1 && (
            <RegisterStep1Form
              onNext={handleNextStep}
              isSubmitting={isSubmitting}
            />
          )}
          {step === 2 && (
            <RegisterStep2Form
              onBack={() => setStep(1)}
              isSubmitting={isSubmitting}
            />
          )}
        </Stack>
      </Box>
      <Typography variant='body2' align='center' mt={2}>
        {t('helper_text')}{' '}
        <MuiLink component={Link} to='/login' color='primary'>
          {t('login_link')}
        </MuiLink>
      </Typography>
    </FormProvider>
  );
}
