import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, Typography, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import type { RegisterFormInputs } from '../../types';
import { RegisterStep1Form, RegisterStep2Form } from '..';
import { RegisterFields, step1Fields, step2Fields } from './config';
import { useTranslation } from 'react-i18next';
import { AuthService } from 'api/services/AuthService';
import { UserService } from 'api/services/UserService';
import { errorHandler } from 'api/utils';
import { EAppRoutes } from 'routes/config';
import { useUserStore } from 'store/userStore';
import { pickFilledFields } from './utils';
import { useRegisterSchema } from 'pages/RegisterPage/hooks';

export default function RegisterForm() {
  const { t } = useTranslation('register_page');
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<RegisterFormInputs>({
    resolver: zodResolver(useRegisterSchema()),
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const { handleSubmit, trigger } = methods;

  const handleNextStep = async () => {
    const isValid = await trigger(step1Fields);
    if (!isValid) return;
    setIsLoading(true);
    const data = methods.getValues();
    const registrationData = {
      email: data.email,
      password: data.password,
    };

    try {
      await AuthService.register(registrationData);

      const userInfo = await UserService.getMe().catch(() => null);
      if (!userInfo) return;

      setUser(userInfo);
      setUserId(String(userInfo.id));
      setStep(2);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Finish = async (data: RegisterFormInputs) => {
    const { avatar, ...restData } = data;

    try {
      const isValid = await trigger(step2Fields);
      if (!isValid) return;

      setIsLoading(true);

      if (avatar instanceof File) {
        await UserService.uploadAvatar(avatar);
      }

      const updatePayload = pickFilledFields(
        restData,
        step2Fields.filter(
          (f) => f !== RegisterFields.AVATAR,
        ) as (keyof typeof restData)[],
      );

      if (userId && Object.keys(updatePayload).length > 0) {
        await UserService.updateUser(userId, updatePayload);
      }

      navigate(EAppRoutes.TASKS);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
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
            <RegisterStep1Form onNext={handleNextStep} isLoading={isLoading} />
          )}
          {step === 2 && (
            <RegisterStep2Form
              onBack={() => setStep(1)}
              isLoading={isLoading}
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
