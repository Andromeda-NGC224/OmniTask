import { AppBar, Toolbar, IconButton, Box } from '@mui/material';

import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import UserMenu from '../UserMenu/UserMenu';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import Logo from 'components/Logo/Logo';
import { BiMenu } from 'react-icons/bi';

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
