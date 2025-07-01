import type { SxProps, Theme } from '@mui/material';

export const getColumnStyles = (
  mode: string,
  isOver: boolean,
): SxProps<Theme> => ({
  minWidth: { xs: '90vw', sm: 300 },
  width: { md: '100%', sm: '100%' },
  maxWidth: { xs: '100%', sm: 340, md: 380 },
  borderRadius: 4,
  backgroundColor: isOver ? 'action.hover' : 'background.paper',
  p: { xs: 1.5, sm: 2.5 },
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 1, sm: 2 },
  height: '100%',
  flexShrink: 0,
  border: mode === 'light' ? '1px solid' : 'none',
  borderColor: 'divider',
});
