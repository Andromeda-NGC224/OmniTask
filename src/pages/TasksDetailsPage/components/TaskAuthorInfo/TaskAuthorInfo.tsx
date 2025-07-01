import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import { useFormatDate } from 'hooks';
import { useTranslation } from 'react-i18next';
import type { TaskAuthorInfoProps } from './types';
import { Person } from '@mui/icons-material';
import {
  avatarContainerStyles,
  avatarRingStyles,
  getAvatarStyles,
} from './styles';

export const TaskAuthorInfo = ({ author }: TaskAuthorInfoProps) => {
  const formatDate = useFormatDate();
  const { t } = useTranslation('tasks_details_page');

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant='h6' component='h2' gutterBottom sx={{ mb: 2 }}>
        {t('author')}
      </Typography>

      <Stack direction='row' alignItems='center' spacing={2}>
        <Box sx={avatarContainerStyles}>
          <Box className='avatar-ring' sx={avatarRingStyles} />

          <Avatar className='avatar-main' sx={getAvatarStyles(!!author.name)}>
            <Person />
          </Avatar>
        </Box>

        <Box>
          <Typography variant='subtitle1' fontWeight={600}>
            {author.name || t('unknownAuthor')} {author.surname || ''}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {author.email}
          </Typography>
          {author.birthday && (
            <Typography variant='caption' color='text.secondary'>
              {t('birthday')}: {formatDate(author.birthday)}
            </Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
