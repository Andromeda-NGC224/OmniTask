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
import { AuthService } from 'api/services/AuthService';
import { UserService } from 'api/services/UserService';
import { errorHandler } from 'api/utils';
import { EAppRoutes } from 'routes/config';
import { pickFilledFields } from './utils';

export default function RegisterForm() {
  const { t } = useTranslation('register_page');
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
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
    if (!isValid) return;

    const data = methods.getValues();
    const registrationData = {
      email: data.email,
      password: data.password,
    };

    try {
      await AuthService.register(registrationData);

      const me = await UserService.getMe().catch(() => null);
      const userId = me?.data?.id || me?.data?._id || null;

      setUserId(userId);
      setStep(2);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleStep2Finish = async (data: RegisterFormInputs) => {
    try {
      const isValid = await trigger(step2Fields);
      if (!isValid) return;

      const updatePayload = pickFilledFields(data, step2Fields);

      if (userId && Object.keys(updatePayload).length > 0) {
        await UserService.updateUser(userId, updatePayload);
      }

      navigate(EAppRoutes.TASKS);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component='form'
        onSubmit={handleSubmit(handleStep2Finish)}
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
