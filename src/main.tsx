import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from 'routes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import './config/i18n';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={appRouter} />
  </ThemeProvider>,
);
