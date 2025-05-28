import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: () => ({
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
        }),
      },
    },
  },

  palette: {
    primary: {
      main: '#2563DC',
      light: '#EEF2FC',
      dark: '#14367B',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

export default theme;
