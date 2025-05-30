import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { BiMenu } from 'react-icons/bi';

import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import { Logo } from 'components/Logo';
import { UserMenu } from 'components/UserMenu';

interface HeaderProps {
  onMenuToggle: () => void;
  showLogo: boolean;
}

export default function Header({ onMenuToggle, showLogo }: HeaderProps) {
  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <IconButton onClick={onMenuToggle} sx={{ mr: 2 }}>
          <BiMenu size={24} />
        </IconButton>
        {!showLogo && <Logo />}
        <Box sx={{ flexGrow: 1 }} />
        <ThemeSwitcher />
        <LanguageSwitcher />
        <IconButton sx={{ color: 'text.primary' }}>
          <NotificationsNoneOutlinedIcon color='action' />
        </IconButton>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
