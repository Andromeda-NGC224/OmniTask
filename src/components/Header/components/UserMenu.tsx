import { useState, type MouseEvent } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/userStore';
import { AuthService } from 'api/services';
import { EAppRoutes } from 'routes/config';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    handleClose();
    navigate(EAppRoutes.PROFILE);
  };
  const handleLogout = () => {
    AuthService.logout();
    navigate(EAppRoutes.LOGIN);
  };

  return (
    <>
      <IconButton onClick={handleMenu} color='inherit'>
        <Avatar alt={user?.name || user?.email || 'User'}>
          {user ? user.name?.[0] || user.email?.[0] || 'U' : ''}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>Профіль</MenuItem>
        <MenuItem onClick={handleLogout}>Вийти</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
