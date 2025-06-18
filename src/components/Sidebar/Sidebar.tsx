import {
  Drawer,
  Box,
  Button,
  useTheme,
  useColorScheme,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import Logo from '../../components/Logo/Logo';
import { BiLogOut } from 'react-icons/bi';
import { DRAWER_WIDTH, COLLAPSED_WIDTH } from './constants';
import { getDrawerSx } from './config';
import { SidebarNavList } from './components';
import { AuthService } from 'api/services/AuthService/AuthService';
import { useNavigate } from 'react-router-dom';
import { EAppRoutes } from 'routes/config';

export default function Sidebar({ open }: { open: boolean }) {
  const { mode } = useColorScheme();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const drawerWidth = isSmallScreen
    ? '100%'
    : open
      ? DRAWER_WIDTH
      : COLLAPSED_WIDTH;

  const handleLogout = () => {
    AuthService.logout();
    navigate(EAppRoutes.LOGIN);
  };

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

      <SidebarNavList open={open} />

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
            onClick={handleLogout}
          >
            {open && 'Log out'}
          </Button>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
