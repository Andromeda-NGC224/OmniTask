import { avatarHover } from './config';

export const avatarContainerStyles = {
  position: 'relative',
  '&:hover .avatar-ring': {
    opacity: 1,
    transform: 'scale(1.1)',
  },
  '&:hover .avatar-main': {
    animation: `${avatarHover} 0.5s ease`,
    transform: 'scale(1.1)',
  },
};

export const avatarRingStyles = {
  position: 'absolute',
  top: -4,
  left: -4,
  right: -4,
  bottom: -4,
  borderRadius: '50%',
  border: '2px solid',
  borderColor: 'primary.main',
  opacity: 0,
  transition: 'all 0.3s ease',
  zIndex: 1,
};

export const getAvatarStyles = (hasName: boolean) => ({
  width: 56,
  height: 56,
  bgcolor: hasName ? 'primary.main' : 'grey.500',
  color: 'primary.contrastText',
  transition: 'all 0.3s ease',
  position: 'relative',
  zIndex: 2,
  '& .MuiSvgIcon-root': {
    fontSize: 32,
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  },
});
