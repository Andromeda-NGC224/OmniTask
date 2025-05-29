import { lazy, useState } from 'react';
import { Route, Routes } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';
import { Box, Toolbar } from '@mui/material';
import Header from '../Header/Header';

import './App.css';

const TasksPage = lazy(() => import('../../pages/TasksPage/TasksPage'));

export default function App() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };
  return (
    <Box sx={{ display: 'flex', backgroundColor: 'background.default' }}>
      <Sidebar open={isDrawerOpen} />
      <Header onMenuToggle={toggleDrawer} showLogo={isDrawerOpen} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<TasksPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
