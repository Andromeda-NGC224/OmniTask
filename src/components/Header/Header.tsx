import { AppBar, Toolbar, IconButton, Box } from '@mui/material';

import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import UserMenu from '../UserMenu/UserMenu';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';

const Header = () => (
  <AppBar
    position='fixed'
    sx={{
      zIndex: (theme) => theme.zIndex.drawer - 1,
      backgroundColor: 'transparent',
    }}
  >
    <Toolbar>
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

export default Header;
