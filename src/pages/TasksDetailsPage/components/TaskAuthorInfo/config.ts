import { keyframes } from '@mui/material/styles';

export const avatarHover = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(5deg) scale(1.05); }
  50% { transform: rotate(0deg) scale(1.1); }
  75% { transform: rotate(-5deg) scale(1.05); }
  100% { transform: rotate(0deg) scale(1); }
`;
