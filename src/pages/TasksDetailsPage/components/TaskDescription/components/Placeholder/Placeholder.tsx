import { Typography, useMediaQuery, useTheme } from '@mui/material';

export default function Placeholder({ placeholder }: { placeholder: string }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Typography
      sx={{
        position: 'absolute',
        top: isSmallScreen ? 120 : isMediumScreen ? 90 : 60,
        left: 16,
        color: '#999',
        pointerEvents: 'none',
        fontSize: 16,
      }}
    >
      {placeholder}
    </Typography>
  );
}
