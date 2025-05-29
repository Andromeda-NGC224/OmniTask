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
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { FaTasks } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsFillKanbanFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';

const drawerWidth = 280;

export default function Sidebar() {
  const theme = useTheme();
  const { mode } = useColorScheme();

  console.log('mode', mode);

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: mode === 'dark' ? 'none' : '1px solid #eaeaea',
        },
      }}
    >
      <Box sx={{ paddingBottom: 8, paddingTop: 5 }}>
        <Logo />
      </Box>
      <List sx={{ py: 0 }}>
        {[
          { to: '/', label: 'Tasks', icon: <FaTasks size={24} /> },
          {
            to: '/dashboard',
            label: 'Dashboard',
            icon: <LuLayoutDashboard size={24} />,
          },
          {
            to: '/kanban',
            label: 'Kanban',
            icon: <BsFillKanbanFill size={24} />,
          },
          { to: '/profile', label: 'Profile', icon: <CgProfile size={24} /> },
        ].map(({ to, label, icon }) => (
          <ListItem key={label}>
            <NavLink to={to} style={{ width: '100%' }}>
              <ListItemButton sx={{ backgroundColor: 'primary.light' }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: {
                      sx: { fontWeight: 'bold', color: 'primary.main' },
                    },
                  }}
                />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', mb: '40px', p: 2 }}>
        <Button
          fullWidth
          startIcon={<BiLogOut size={24} />}
          variant='outlined'
          color='error'
          sx={{ fontWeight: 'bold' }}
        >
          Log out
        </Button>
      </Box>
    </Drawer>
  );
}
