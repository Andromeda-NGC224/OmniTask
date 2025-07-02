import type { SxProps, Theme } from '@mui/material';

export const taskItemStyles: SxProps<Theme> = {
  boxShadow: 6,
  borderRadius: 4,
  cursor: 'grab',
  backdropFilter: 'blur(6px)',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 110,
  mb: 0.5,
  transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.2s',
  '&:active': {
    cursor: 'grabbing',
  },
  '&:hover': {
    boxShadow: 12,
    transform: 'scale(1.025)',
  },
};
