import { alpha, type Theme } from '@mui/material/styles';

export const avatarStyles = {
  width: 150,
  height: 150,
  border: '3px solid',
  borderColor: 'primary.main',
  bgcolor: (avatarUrl?: string) => (avatarUrl ? 'transparent' : 'grey.300'),
  boxShadow: (theme: Theme) =>
    `0 0 15px ${alpha(theme.palette.primary.main, 0.6)}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: (theme: Theme) =>
      `0 0 25px ${alpha(theme.palette.primary.main, 0.8)}`,
  },
  '& .MuiSvgIcon-root': {
    fontSize: '4rem',
    width: '60%',
    height: '60%',
  },
};
