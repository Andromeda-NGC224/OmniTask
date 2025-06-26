import { formatDate } from '../../utils/dateFormatter';
import { Box, Typography, Stack } from '@mui/material';
import type { UserInfoProps } from './types';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import { useTranslation } from 'react-i18next';

export default function UserInfo({ user }: UserInfoProps) {
  const { t } = useTranslation('profile_page');

  return (
    <Box sx={{ textAlign: 'center', mb: 3 }}>
      <Typography
        variant='h4'
        component='h2'
        sx={{ fontWeight: 'bold', mb: 1 }}
      >
        {user.name || `${t('user_info.name')}`} {user.surname || ''}
      </Typography>

      <Stack spacing={1} alignItems='center'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventNoteOutlinedIcon sx={{ color: 'text.secondary' }} />
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            {t('user_info.registered_on')} {formatDate(user.createdAt)}
          </Typography>
        </Box>

        {user.birthday && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CakeOutlinedIcon sx={{ color: 'text.secondary' }} />
            <Typography variant='body1' sx={{ color: 'text.secondary' }}>
              {t('user_info.birthday')} {formatDate(user.birthday)}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailOutlinedIcon sx={{ color: 'text.secondary' }} />
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            {t('user_info.email')} {user.email}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
