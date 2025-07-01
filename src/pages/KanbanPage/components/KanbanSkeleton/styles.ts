import type { SxProps, Theme } from '@mui/material';

export const columnSkeletonStyles: SxProps<Theme> = {
  width: { md: '100%', sm: '90%' },
  maxWidth: { xs: '100%', sm: 340, md: 380 },
  borderRadius: 4,
  boxShadow: 1,
  p: { xs: 1.5, sm: 2.5 },
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 1, sm: 2 },
  height: '100%',
  flexShrink: 0,
  backgroundColor: 'background.paper',
};

export const kanbanSkeletonStyles: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(3, 1fr)',
  },
  gap: 3,
  margin: '0 auto',
  width: { lg: '70%', md: '100%', sm: '100%' },
  backgroundColor: 'background.default',
};
