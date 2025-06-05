export const shakeAnimation = {
  animation: 'shake 0.8s ease-in-out',
  '@keyframes shake': {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-5px)' },
    '50%': { transform: 'translateX(5px)' },
    '75%': { transform: 'translateX(-5px)' },
  },
};
