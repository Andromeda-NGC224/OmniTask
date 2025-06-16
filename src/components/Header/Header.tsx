import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { BiMenu } from 'react-icons/bi';
import { Logo } from 'components/Logo';

import type { HeaderProps } from './types';
import { LanguageSwitcher, ThemeSwitcher, UserMenu } from './components';

export default function Header({
  onMenuToggle,
  showLogo,
  clipped,
}: HeaderProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: 'background.paper',
          px: isSmallScreen ? 0.5 : 2,
        }}
      >
        {!clipped && (
          <IconButton onClick={onMenuToggle} sx={{ mr: isSmallScreen ? 0 : 2 }}>
            <BiMenu size={24} />
          </IconButton>
        )}

        {!showLogo && <Logo />}

        <Box sx={{ flexGrow: 1 }} />

        <ThemeSwitcher />

        <LanguageSwitcher />

        {!clipped && (
          <IconButton sx={{ color: 'text.primary' }}>
            <NotificationsNoneOutlinedIcon color='action' />
          </IconButton>
        )}

        {!clipped && <UserMenu />}
      </Toolbar>
    </AppBar>
  );
}
