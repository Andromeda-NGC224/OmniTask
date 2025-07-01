import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import type { EditProfileFormValues, EditProfileModalProps } from './types';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { UserService } from 'api/services';
import { useUserStore } from 'store';
import { showToast } from 'utils/toast';
import { modalContainerStyle } from 'pages/TasksPage/components/modals/styles';
import { CustomAvatarField, CustomTextField } from 'components/Inputs';
import { errorHandler } from 'api/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditProfileSchema } from '../../hooks/useEditProfileSchema';
import type { User } from 'api/services/UserService/types';
import { useEditProfileData } from './hooks';

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
}: EditProfileModalProps) {
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('profile_page');

  const editProfileSchema = useEditProfileSchema();
  const methods = useForm<EditProfileFormValues>({
    defaultValues: {
      avatar: null,
      firstName: user.name || '',
      lastName: user.surname || '',
      email: user.email || '',
      birthday: user.birthday || '',
    },
    resolver: zodResolver(editProfileSchema),
    mode: 'onBlur',
  });
  const { control, handleSubmit, resetField, formState } = methods;

  const { dirtyFields } = formState;
  const { updateData, avatarToUpload } = useEditProfileData(
    methods.getValues(),
    dirtyFields,
  );

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      let newUserState: User = user;

      if (Object.keys(updateData).length > 0) {
        await UserService.updateUser(`${user.id}`, updateData);
        newUserState = await UserService.getMe();
      }

      if (avatarToUpload instanceof File) {
        await UserService.uploadAvatar(avatarToUpload);
        newUserState = await UserService.getMe();
      }

      setUser(newUserState);
      showToast.success(t('editProfileModal.successMessage'));
      onClose();
      resetField('avatar', { defaultValue: null });
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalContainerStyle}>
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id='edit-profile-modal-title'
          variant='h6'
          component='h2'
          sx={{ pr: 4, mb: 2 }}
        >
          {t('editProfileModal.edit_profile_title')}
        </Typography>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <CustomAvatarField name='avatar' control={control} />
              <CustomTextField
                name='firstName'
                label={t('editProfileModal.first_name_placeholder')}
                control={control}
                errorMessage={methods.formState.errors.firstName?.message}
              />
              <CustomTextField
                name='lastName'
                label={t('editProfileModal.last_name_placeholder')}
                control={control}
                errorMessage={methods.formState.errors.lastName?.message}
              />
              <CustomTextField
                name='email'
                label={t('editProfileModal.email_placeholder')}
                control={control}
                errorMessage={methods.formState.errors.email?.message}
              />
              <CustomTextField
                name='birthday'
                label={t('editProfileModal.date_of_birth_placeholder')}
                type='date'
                control={control}
                errorMessage={methods.formState.errors.birthday?.message}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 3,
              }}
            >
              <Button onClick={onClose} disabled={isLoading}>
                {t('editProfileModal.cancel_button')}
              </Button>
              <Button type='submit' variant='contained' disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  t('editProfileModal.save_button')
                )}
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </Modal>
  );
}
