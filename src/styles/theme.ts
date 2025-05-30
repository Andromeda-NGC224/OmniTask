import { extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  cssVarPrefix: 'mui',
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#5429ff',
        },
        background: {
          default: '#f1f2f6',
          paper: '#ffffff',
        },
        text: {
          primary: '#1b1a17',
          secondary: '#7a797d',
        },
        divider: '#eaeaea',
        info: { main: '#2f80ed' },
        success: { main: '#219653' },
        warning: { main: '#f2994a' },
        error: { main: '#eb5757' },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#bfb2ff',
        },
        background: {
          default: '#333333',
          paper: '#2c2c2c',
        },
        text: {
          primary: '#ffffff',
          secondary: '#9e9e9e',
        },
        divider: '#a8a8a8',
        info: { main: '#bfb2ff' },
        success: { main: '#219653' },
        warning: { main: '#f2994a' },
        error: { main: '#eb5757' },
      },
    },
  },
  colorSchemeSelector: 'data-theme',
  // ключевой момент для переопределения стилей и темы в mui

  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { margin: 0 },
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
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
      },
    },
  },
});

export default theme;
