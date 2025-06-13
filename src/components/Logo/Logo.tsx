import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { GiNotebook } from 'react-icons/gi';

const Logo = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component={Link}
      to='/'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 0.5,
        color: 'primary.main',
        textDecoration: 'none',
        px: isSmallScreen ? 0.5 : 2,
      }}
    >
      <GiNotebook size={24} color='inherit' />
      <Typography variant='h6' sx={{ fontWeight: 700 }}>
        OmniTask.
      </Typography>
    </Box>
  );
};

export default Logo;
