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
      justifyContent: 'center',
      gap: 1,
      color: 'inherit',
      textDecoration: 'none',
      p: 2,
    }}
  >
    <GiNotebook size={24} color='#2563DC' />
    <Typography variant='h6' sx={{ fontWeight: 700 }}>
      OmniTask.
    </Typography>
  </Box>
);

export default Logo;
