import { type Theme } from '@mui/material/styles';
import { type DrawerProps } from '@mui/material/Drawer';

export const getDrawerSx = (
  open: boolean,
  DRAWER_WIDTH: number,
  COLLAPSED_WIDTH: number,
  mode: 'light' | 'dark',
  theme: Theme,
): DrawerProps['sx'] => ({
  width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    boxSizing: 'border-box',
    borderRight:
      mode === 'dark' ? 'none' : `1px solid ${theme.palette.divider}`,
  },
});
