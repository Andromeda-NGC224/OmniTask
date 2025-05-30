import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItemButton,
  Box,
  Button,
  useTheme,
  useColorScheme,
  Tooltip,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { FaTasks } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsFillKanbanFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';

const drawerWidth = 265;
const collapsedWidth = 80;

export default function Sidebar({ open }: { open: boolean }) {
  const theme = useTheme();
  const { mode } = useColorScheme();

  const menuItems = [
    { to: '/', label: 'Tasks', icon: <FaTasks size={24} /> },
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LuLayoutDashboard size={24} />,
    },
    { to: '/kanban', label: 'Kanban', icon: <BsFillKanbanFill size={24} /> },
    { to: '/profile', label: 'Profile', icon: <CgProfile size={24} /> },
  ];

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          boxSizing: 'border-box',
          borderRight:
            mode === 'dark' ? 'none' : `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box
        sx={{
          paddingTop: 11,
          paddingBottom: 2,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
        }}
      >
        {open && <Logo />}
      </Box>

      <List sx={{ py: 2 }}>
        {menuItems.map(({ to, label, icon }) => (
          <ListItem sx={{ px: 2 }} key={label} disablePadding>
            <NavLink to={to} style={{ width: '100%' }}>
              <Tooltip title={!open ? label : ''} placement='right'>
                <ListItemButton
                  sx={{ justifyContent: open ? 'initial' : 'center' }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={label}
                      slotProps={{
                        primary: {
                          sx: { fontWeight: 'bold', color: 'text.secondary' },
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </NavLink>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', mb: 4, p: 2 }}>
        <Tooltip title={!open ? 'Log out' : ''} placement='right'>
          <Button
            fullWidth={open}
            startIcon={<BiLogOut size={24} />}
            variant={open ? 'outlined' : 'text'}
            color='error'
            sx={{
              fontWeight: 'bold',
              gap: 1,
              justifyContent: 'flex-start',
              minWidth: 0,
              px: open ? 2 : 1,
            }}
          >
            {open && 'Log out'}
          </Button>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
