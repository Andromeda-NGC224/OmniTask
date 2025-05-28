import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  ListItemButton,
  Box,
  Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { FaTasks } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { BsFillKanbanFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ paddingBottom: '60px', paddingTop: '60px' }}>
        <Logo />
      </Box>
      <List>
        <ListItem>
          <NavLink to='/' style={{ width: '100%' }}>
            <ListItemButton sx={{ backgroundColor: 'primary.light' }}>
              <ListItemIcon>
                <FaTasks size={24} />
              </ListItemIcon>
              <ListItemText
                primary='Tasks'
                slotProps={{
                  primary: {
                    sx: { fontWeight: 'bold', color: 'primary.main' },
                  },
                }}
              />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to='/dashboard'
            style={{
              width: '100%',
            }}
          >
            <ListItemButton sx={{ backgroundColor: 'primary.light' }}>
              <ListItemIcon>
                <LuLayoutDashboard size={24} />
              </ListItemIcon>
              <ListItemText
                primary='Dashboard'
                slotProps={{
                  primary: {
                    sx: { fontWeight: 'bold', color: 'primary.main' },
                  },
                }}
              />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to='/kanban'
            style={{
              width: '100%',
            }}
          >
            <ListItemButton sx={{ backgroundColor: 'primary.light' }}>
              <ListItemIcon>
                <BsFillKanbanFill size={24} />
              </ListItemIcon>
              <ListItemText
                primary='Kanban'
                slotProps={{
                  primary: {
                    sx: { fontWeight: 'bold', color: 'primary.main' },
                  },
                }}
              />
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink
            to='/profile'
            style={{
              width: '100%',
            }}
          >
            <ListItemButton sx={{ backgroundColor: 'primary.light' }}>
              <ListItemIcon>
                <CgProfile size={24} />
              </ListItemIcon>
              <ListItemText
                primary='Profile'
                slotProps={{
                  primary: {
                    sx: { fontWeight: 'bold', color: 'primary.main' },
                  },
                }}
              />
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
      <Box sx={{ mt: 'auto', mb: '40px', p: 2 }}>
        <Button
          fullWidth
          startIcon={<BiLogOut size={24} />}
          variant='outlined'
          color='error'
          sx={{
            fontWeight: 'bold',
          }}
        >
          Log out
        </Button>
      </Box>
    </Drawer>
  );
}
