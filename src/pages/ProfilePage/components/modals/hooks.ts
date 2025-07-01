import type { UpdateUserDto } from 'api/services/UserService/types';
import type { EditProfileFormValues } from './types';

export const useEditProfileData = (
  data: EditProfileFormValues,
  changedFields: Record<string, boolean>,
) => {
  const updateData: Partial<UpdateUserDto> = {};

  if (changedFields.firstName) updateData.name = data.firstName || undefined;
  if (changedFields.lastName) updateData.surname = data.lastName || undefined;
  if (changedFields.email) updateData.email = data.email || undefined;
  if (changedFields.birthday) updateData.birthday = data.birthday || undefined;

  const avatarToUpload = data.avatar instanceof File ? data.avatar : null;

  return {
    updateData,
    hasChanges: Object.keys(updateData).length > 0,
    avatarToUpload,
  };
};
