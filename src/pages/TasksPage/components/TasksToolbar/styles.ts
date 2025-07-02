import type { SxProps, Theme } from '@mui/material';

export const toolbarStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 1,
  mb: 2,
  padding: '24px 16px',
  backgroundColor: 'background.paper',
  borderRadius: 3,
  flexWrap: 'wrap',
  boxSizing: 'content-box',
};
