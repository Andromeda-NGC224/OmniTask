import type { SxProps, Theme } from '@mui/material';

export const cardStyles = (mode: string): SxProps<Theme> => ({
  p: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 2,
  borderRadius: 3,
  border: mode === 'light' ? '1px solid' : 'none',
  borderColor: 'divider',
});

export const actionsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'flex-end',
  width: '100%',
  height: '40px',
};
