import { PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    sea?: PaletteColor;
  }
  interface PaletteOptions {
    sea?: PaletteColor;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    sea: true;
  }
}
