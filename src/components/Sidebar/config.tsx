import { GrBug } from 'react-icons/gr';
import { FaTasks } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsFillKanbanFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

import { type Theme } from '@mui/material/styles';
import { type DrawerProps } from '@mui/material/Drawer';

export const menuItems = [
  { to: '/', label: 'Tasks', icon: <FaTasks size={24} /> },
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <LuLayoutDashboard size={24} />,
  },
  { to: '/kanban', label: 'Kanban', icon: <BsFillKanbanFill size={24} /> },
  { to: '/profile', label: 'Profile', icon: <CgProfile size={24} /> },
  { to: '/test', label: 'Test', icon: <GrBug size={24} /> },
];

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
