import { Box, Toolbar } from '@mui/material';
import { Header } from 'components/Header';
import { Outlet } from 'react-router-dom';

const ClippedLayout = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: 'background.default' }}>
      <Header clipped={true} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ClippedLayout;
