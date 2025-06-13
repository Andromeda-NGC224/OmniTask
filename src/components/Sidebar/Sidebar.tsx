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
  useMediaQuery,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import { BiLogOut } from 'react-icons/bi';
import { DRAWER_WIDTH, COLLAPSED_WIDTH } from './constants';
import { getDrawerSx, menuItems } from './config';

export default function Sidebar({ open }: { open: boolean }) {
  const { mode } = useColorScheme();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerWidth = isSmallScreen
    ? '100%'
    : open
      ? DRAWER_WIDTH
      : COLLAPSED_WIDTH;

  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      open={isSmallScreen ? open : true}
      ModalProps={{
        keepMounted: true,
      }}
      sx={getDrawerSx(drawerWidth, mode === 'dark' ? 'dark' : 'light', theme)}
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
