import { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };
  const handleLogout = () => {
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleMenu} color='inherit'>
        <Avatar alt='User' />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>Профіль</MenuItem>
        <MenuItem onClick={handleLogout}>Вийти</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
