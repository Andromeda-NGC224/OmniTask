import { useState, type MouseEvent } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/userStore';
import { AuthService } from 'api/services';
import { EAppRoutes } from 'routes/config';
import { useTranslation } from 'react-i18next';

const UserMenu = () => {
  const { t } = useTranslation('header');
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

  // Отображения аватара или инициалов
  const getInitials = () => {
    if (!user) return 'U';
    const name = user.name || '';
    const surname = user.surname || '';
    return `${name.charAt(0)}${surname.charAt(0)}`;
  };

  const avatarUrl = user?.avatar?.url ?? null;

  return (
    <>
      <IconButton onClick={handleMenu} color='inherit'>
        <Avatar
          alt={user?.name || user?.email || 'User'}
          src={avatarUrl || undefined}
        >
          {!avatarUrl && getInitials()}
        </Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>{t('profile')}</MenuItem>
        <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
