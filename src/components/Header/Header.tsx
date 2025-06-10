import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
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
  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        {!clipped && (
          <IconButton onClick={onMenuToggle} sx={{ mr: 2 }}>
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
