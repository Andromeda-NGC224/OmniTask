import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';
import { Box, Toolbar } from '@mui/material';

import './App.css';

const TasksPage = lazy(() => import('../../pages/TasksPage/TasksPage'));

export default function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<TasksPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
