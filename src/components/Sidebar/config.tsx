import { GrBug } from 'react-icons/gr';
import { FaTasks } from 'react-icons/fa';
import { BsFillKanbanFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { type Theme } from '@mui/material/styles';
import { type DrawerProps } from '@mui/material/Drawer';
import { EAppRoutes } from 'routes/config';

export const menuItems = [
  { to: EAppRoutes.TASKS, label: 'Tasks', icon: <FaTasks size={24} /> },
  {
    to: EAppRoutes.KANBAN,
    label: 'Kanban',
    icon: <BsFillKanbanFill size={24} />,
  },
  { to: EAppRoutes.PROFILE, label: 'Profile', icon: <CgProfile size={24} /> },
  { to: EAppRoutes.TEST_PAGE, label: 'Test', icon: <GrBug size={24} /> },
];

export const getDrawerSx = (
  DRAWER_WIDTH: number | string,
  mode: 'light' | 'dark',
  theme: Theme,
): DrawerProps['sx'] => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    boxSizing: 'border-box',
    borderRight:
      mode === 'dark' ? 'none' : `1px solid ${theme.palette.divider}`,
    backgroundImage: 'none',
  },
});
