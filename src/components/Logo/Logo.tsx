import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { GiNotebook } from 'react-icons/gi';

const Logo = () => (
  <Box
    component={Link}
    to='/'
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      gap: 1,
      color: 'primary.main',
      textDecoration: 'none',
      px: 2,
    }}
  >
    <GiNotebook size={24} color='inherit' />
    <Typography variant='h6' sx={{ fontWeight: 700 }}>
      OmniTask.
    </Typography>
  </Box>
);

export default Logo;
