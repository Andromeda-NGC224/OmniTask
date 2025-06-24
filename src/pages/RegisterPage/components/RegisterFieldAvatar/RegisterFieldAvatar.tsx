import { Controller, type FieldValues } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { RegisterFieldAvatarProps } from './types';

export default function RegisterFieldAvatar<T extends FieldValues>({
  name,
  control,
  errorMessage,
}: RegisterFieldAvatarProps<T>) {
  const { t } = useTranslation('register_page');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...field } }) => (
        <TextField
          {...field}
          value={value?.fileName}
          onChange={(event) => {
            const target = event.target as HTMLInputElement;
            onChange(target.files && target.files[0]);
          }}
          type='file'
          label={t('avatar_placeholder')}
          fullWidth
          variant='outlined'
          size='small'
          error={!!errorMessage}
          helperText={errorMessage}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      )}
    />
  );
}
