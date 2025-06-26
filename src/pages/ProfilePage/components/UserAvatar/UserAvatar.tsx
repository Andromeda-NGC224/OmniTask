import { PersonPinCircleOutlined } from '@mui/icons-material';
import { Avatar, Box, alpha } from '@mui/material';
import type { UserAvatarProps } from './types';

export default function UserAvatar({ avatar, user }: UserAvatarProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Avatar
        src={avatar?.url}
        alt='user avatar'
        sx={{
          width: 150,
          height: 150,
          border: '3px solid',
          borderColor: 'primary.main',
          bgcolor: avatar?.url ? 'transparent' : 'grey.300',
          boxShadow: (theme) =>
            `0 0 15px ${alpha(theme.palette.primary.main, 0.6)}`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: (theme) =>
              `0 0 25px ${alpha(theme.palette.primary.main, 0.8)}`,
          },
        }}
      >
        {!avatar?.url &&
          (user?.name ? (
            user.name[0].toUpperCase()
          ) : (
            <PersonPinCircleOutlined fontSize='inherit' />
          ))}
      </Avatar>
    </Box>
  );
}
