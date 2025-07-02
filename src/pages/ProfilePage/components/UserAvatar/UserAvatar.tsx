import { Avatar, Box } from '@mui/material';
import { Person } from '@mui/icons-material';
import type { UserAvatarProps } from './types';
import { avatarStyles } from './styles';

export default function UserAvatar({ avatar, user }: UserAvatarProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Avatar
        src={avatar?.url}
        alt='user avatar'
        sx={{
          ...avatarStyles,
          bgcolor: avatarStyles.bgcolor(avatar?.url),
        }}
      >
        {!avatar?.url &&
          (user?.name ? (
            user.name[0].toUpperCase()
          ) : (
            <Person sx={{ fontSize: 'inherit' }} />
          ))}
      </Avatar>
    </Box>
  );
}
