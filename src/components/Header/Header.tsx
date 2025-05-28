import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import UserMenu from '../UserMenu/UserMenu';

const Header = () => (
  <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Box sx={{ flexGrow: 1 }} />
      <LanguageSwitcher />
      <IconButton color='inherit'>
        <NotificationsIcon />
      </IconButton>
      <IconButton color='inherit'>
        <AddIcon />
      </IconButton>
      <UserMenu />
    </Toolbar>
  </AppBar>
);

export default Header;
