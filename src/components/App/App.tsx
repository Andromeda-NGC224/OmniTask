import { lazy, useState } from 'react';
import { Route, Routes } from 'react-router';

import { Box, Toolbar } from '@mui/material';
import { Sidebar } from 'components/Sidebar';
import { Header } from 'components/Header';

const TasksPage = lazy(() => import('../../pages/TasksPage/TasksPage'));
const TestPage = lazy(() => import('../../pages/TestPage/TestPage'));

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
          <Route path='/test' element={<TestPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
