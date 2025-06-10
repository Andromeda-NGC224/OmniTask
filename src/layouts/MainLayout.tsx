import { Box, Toolbar } from '@mui/material';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: 'background.default' }}>
      <Toaster position='top-center' reverseOrder={false} />
      <Sidebar open={isDrawerOpen} />
      <Header
        onMenuToggle={toggleDrawer}
        showLogo={isDrawerOpen}
        clipped={false}
      />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
