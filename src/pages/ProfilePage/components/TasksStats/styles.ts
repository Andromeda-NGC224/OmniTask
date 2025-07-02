import type { SxProps, Theme } from '@mui/material';

export const totalStatPaperStyles: SxProps<Theme> = {
  borderRadius: '12px',
  p: 3,
  textAlign: 'center',
  width: { xs: '100%', sm: '50%' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
  },
};

export const statusStatPaperStyles: SxProps<Theme> = {
  ...totalStatPaperStyles,
  width: '100%',
  height: '100%',
};
